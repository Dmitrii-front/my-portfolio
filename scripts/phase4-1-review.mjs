import { chromium, webkit, firefox } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";

const engine = process.env.REVIEW_ENGINE ?? "chromium";
const directory =
	engine === "chromium" ? "artifacts/phase4-1" : `artifacts/phase4-1/${engine}`;
await mkdir(directory, { recursive: true });
const browser = await { chromium, webkit, firefox }[engine].launch({
	headless: true,
	...(engine === "chromium" ? { channel: "chrome" } : {}),
});
const results = [];
const ready = async (page, scene) => {
	await page.waitForFunction(
		(scene) =>
			["ready", "fallback", "failed"].includes(
				document.querySelector(`[data-scene="${scene}"]`).dataset.state,
			),
		scene,
	);
};
try {
	for (const width of process.env.REVIEW_SMOKE
		? [1440]
		: [375, 768, 1024, 1440, 1920]) {
		const page = await browser.newPage({
			viewport: { width, height: 1000 },
			deviceScaleFactor: 1,
		});
		const errors = [];
		page.on("pageerror", (error) => errors.push(error.message));
		await page.goto("http://127.0.0.1:3000/en");
		await page.locator(".product-hub").scrollIntoViewIfNeeded();
		await ready(page, "hub");
		await page.locator(".device-showcase").scrollIntoViewIfNeeded();
		await ready(page, "device");
		await page.waitForTimeout(400);
		await page.screenshot({ path: `${directory}/device-path-${width}.png` });
		await page.evaluate(() => scrollTo(0, 0));
		await page.waitForTimeout(200);
		await page.screenshot({
			path: `${directory}/home-full-${width}.png`,
			fullPage: true,
		});
		await page.locator(".product-hub").scrollIntoViewIfNeeded();
		await page.screenshot({ path: `${directory}/hub-path-${width}.png` });
		await page.locator("#home-lab").scrollIntoViewIfNeeded();
		await page.screenshot({ path: `${directory}/lab-path-${width}.png` });
		await page.locator("#home-contact").scrollIntoViewIfNeeded();
		await page.screenshot({ path: `${directory}/contact-path-${width}.png` });
		const geometry = await page.evaluate(() => ({
			filters: [...document.querySelectorAll(".neon-path filter")].map((f) => ({
				width: Number(f.getAttribute("width")),
				height: Number(f.getAttribute("height")),
			})),
			scenes: [...document.querySelectorAll(".scene-enhancement")].map((e) => ({
				...e.dataset,
			})),
			overflow: document.documentElement.scrollWidth > innerWidth,
			initialJs: performance
				.getEntriesByType("resource")
				.filter(
					(e) =>
						e.name.includes(".js") &&
						e.startTime <
							(performance
								.getEntriesByType("mark")
								.find((e) => e.name.endsWith("3d-request"))?.startTime ??
								Infinity),
				)
				.reduce((n, e) => n + e.encodedBodySize, 0),
			css: performance
				.getEntriesByType("resource")
				.filter((e) => e.name.includes(".css"))
				.reduce((n, e) => n + e.encodedBodySize, 0),
		}));
		results.push({ width, geometry, errors });
		await page.close();
	}
	const reduced = await browser.newPage({
		viewport: { width: 1440, height: 1000 },
		reducedMotion: "reduce",
	});
	await reduced.goto("http://127.0.0.1:3000/en");
	await reduced.locator(".neon-glow-tile").first().waitFor();
	await reduced.screenshot({
		path: `${directory}/home-reduced-1440.png`,
		fullPage: true,
	});
	await reduced.close();

	// Isolate SVG paint cost: identical DOM/CSS fallback and scroll work, with/without halos.
	// Do not conflate concurrent GPU model rendering or pretend this is physical-mobile QA.
	for (const width of engine === "chromium" && !process.env.REVIEW_SMOKE
		? [375, 1024, 1440, 1920]
		: []) {
		const page = await browser.newPage({ viewport: { width, height: 1000 } });
		await page.addInitScript(() =>
			Object.defineProperty(navigator, "hardwareConcurrency", { value: 2 }),
		);
		await page.goto("http://127.0.0.1:3000/en");
		await page.locator(".neon-glow-tile").first().waitFor();
		await page.waitForTimeout(500);
		const session = await page.context().newCDPSession(page);
		await session.send("Performance.enable");
		const samples = [];
		for (const halos of [true, false, false, true, true, false]) {
			const disabled = halos
				? null
				: await page.addStyleTag({
						content: ".neon-halos, .neon-energy { display: none !important; }",
					});
			await page.evaluate(() => scrollTo(0, 0));
			await page.waitForTimeout(150);
			const events = [];
			const receive = ({ value }) => events.push(...value);
			session.on("Tracing.dataCollected", receive);
			await session.send("Tracing.start", {
				categories:
					"devtools.timeline,cc,disabled-by-default-devtools.timeline",
				transferMode: "ReportEvents",
			});
			const before = await session.send("Performance.getMetrics");
			const frames = await page.evaluate(async () => {
				const gaps = [];
				let previous = performance.now();
				const total = document.documentElement.scrollHeight - innerHeight;
				for (let i = 0; i < 90; i++) {
					await new Promise((resolve) => requestAnimationFrame(resolve));
					const now = performance.now();
					gaps.push(now - previous);
					previous = now;
					scrollTo(0, (total * i) / 89);
				}
				return gaps;
			});
			const after = await session.send("Performance.getMetrics");
			const complete = new Promise((resolve) =>
				session.once("Tracing.tracingComplete", resolve),
			);
			await session.send("Tracing.end");
			await complete;
			session.off("Tracing.dataCollected", receive);
			const duration = (name) =>
				events
					.filter((e) => e.name === name && e.ph === "X")
					.reduce((n, e) => n + (e.dur ?? 0) / 1000, 0);
			const delta = (name) =>
				(after.metrics.find((e) => e.name === name)?.value ?? 0) -
				(before.metrics.find((e) => e.name === name)?.value ?? 0);
			const sorted = frames.slice(1).sort((a, b) => a - b);
			samples.push({
				halos,
				paintMs: duration("Paint"),
				rasterMs: duration("RasterTask"),
				taskMs: delta("TaskDuration") * 1000,
				scriptMs: delta("ScriptDuration") * 1000,
				medianFrameMs: sorted[Math.floor(sorted.length / 2)],
				p95FrameMs: sorted[Math.floor(sorted.length * 0.95)],
				framesOver50: sorted.filter((n) => n > 50).length,
			});
			if (disabled) await disabled.evaluate((e) => e.remove());
		}
		results.find((result) => result.width === width).paintComparison = samples;
		await page.close();
	}
	await writeFile(
		`${directory}/measurements.json`,
		JSON.stringify(results, null, 2),
	);
	console.log(
		JSON.stringify(
			results.map(({ width, geometry, errors, paintComparison }) => ({
				width,
				tiles: (geometry.filters.length - 2) / 2,
				initialJs: geometry.initialJs,
				css: geometry.css,
				scenes: geometry.scenes,
				overflow: geometry.overflow,
				errors,
				paintComparison,
			})),
			null,
			2,
		),
	);
} finally {
	await browser.close();
}
