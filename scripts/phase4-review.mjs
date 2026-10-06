import { chromium, webkit, firefox } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";

const directory = "artifacts/phase4";
await mkdir(directory, { recursive: true });
const engine = process.env.REVIEW_ENGINE ?? "chromium";
const browser = await { chromium, webkit, firefox }[engine].launch({
	headless: true,
	...(engine === "chromium" ? { channel: "chrome" } : {}),
});
const results = [];
try {
	for (const width of process.env.REVIEW_SMOKE ? [1440] : [375, 1024, 1440]) {
		const page = await browser.newPage({
			viewport: { width, height: 1000 },
			deviceScaleFactor: 2,
			isMobile: engine === "chromium" && width < 768,
			hasTouch: width < 768,
		});
		const errors = [];
		page.on("pageerror", (error) => errors.push(error.message));
		await page.addInitScript(() => {
			const entries = [];
			window.phase4Entries = entries;
			for (const type of ["layout-shift", "longtask"]) {
				if (PerformanceObserver.supportedEntryTypes.includes(type))
					new PerformanceObserver((list) =>
						entries.push(
							...list.getEntries().map((entry) => ({
								type: entry.entryType,
								duration: entry.duration,
								start: entry.startTime,
								value: entry.value ?? 0,
								input: entry.hadRecentInput ?? false,
							})),
						),
					).observe({ type, buffered: true });
			}
		});
		await page.goto("http://127.0.0.1:3000/en");
		await page.waitForFunction(
			() => document.querySelector(".work-layout").dataset.mode !== "static",
		);
		const hub = page.locator('[data-scene="hub"]');
		await page.locator(".product-hub").scrollIntoViewIfNeeded();
		await hub.waitFor({ state: "attached" });
		await page.waitForFunction(
			() =>
				["ready", "fallback", "failed"].includes(
					document.querySelector('[data-scene="hub"]').dataset.state,
				),
			{ timeout: 15000 },
		);
		await page.waitForTimeout(500);
		await page.evaluate(() => scrollTo(0, 0));
		await page.screenshot({
			path: `${directory}/${engine}-home-${width}.png`,
			fullPage: width !== 1440,
		});
		if (width === 1440) {
			await page.locator(".hub-ai").focus();
			await page.screenshot({
				path: `${directory}/${engine}-hub-active-${width}.png`,
			});
			await page.locator(".hub-products").click();
			await page.screenshot({
				path: `${directory}/${engine}-hub-expanded-${width}.png`,
			});
			await page.keyboard.press("Escape");
		}
		await page.locator(".device-showcase").scrollIntoViewIfNeeded();
		await page.waitForFunction(
			() =>
				["ready", "fallback", "failed"].includes(
					document.querySelector('[data-scene="device"]').dataset.state,
				),
			{ timeout: 15000 },
		);
		await page.waitForTimeout(800);
		await page.screenshot({
			path: `${directory}/${engine}-work-pnlwise-${width}.png`,
		});
		await page
			.locator(".project-controls")
			.getByRole("button", { name: "Healthy", exact: true })
			.click();
		await page.waitForTimeout(500);
		await page.screenshot({
			path: `${directory}/${engine}-work-healthy-${width}.png`,
		});
		const visibleScenes = await page
			.locator(".scene-enhancement")
			.evaluateAll((elements) =>
				elements.map((element) => ({
					...element.dataset,
					canvas: [...element.querySelectorAll("canvas")].map((canvas) => ({
						...canvas.dataset,
						width: canvas.width,
						cssWidth: canvas.clientWidth,
						height: canvas.height,
					})),
				})),
			);
		await page
			.locator(".project-controls")
			.getByRole("button", { name: "Portfolio", exact: true })
			.click();
		await page.screenshot({
			path: `${directory}/${engine}-work-portfolio-${width}.png`,
		});
		const measurement = await page.evaluate(() => {
			const entries = performance.getEntriesByType("resource");
			const requested =
				performance
					.getEntriesByType("mark")
					.find((entry) => entry.name.endsWith("3d-request"))?.startTime ??
				Infinity;
			const js = entries.filter((entry) => entry.name.includes(".js"));
			return {
				initialJs: js
					.filter((entry) => entry.startTime < requested)
					.reduce((sum, entry) => sum + entry.encodedBodySize, 0),
				deferredJs: js
					.filter((entry) => entry.startTime >= requested)
					.map((entry) => ({
						file: new URL(entry.name).pathname,
						bytes: entry.encodedBodySize,
					})),
				css: entries
					.filter((entry) => entry.name.includes(".css"))
					.reduce((sum, entry) => sum + entry.encodedBodySize, 0),
				textures: entries
					.filter((entry) => entry.name.includes(".webp"))
					.map((entry) => ({
						file: new URL(entry.name).pathname,
						bytes: entry.encodedBodySize,
					})),
				marks: performance
					.getEntriesByType("mark")
					.filter((entry) => entry.name.includes("3d"))
					.map((entry) => ({ name: entry.name, time: entry.startTime })),
				cls: window.phase4Entries
					.filter((entry) => entry.type === "layout-shift" && !entry.input)
					.reduce((sum, entry) => sum + entry.value, 0),
				longTasks: window.phase4Entries.filter(
					(entry) => entry.type === "longtask",
				),
				scenes: [...document.querySelectorAll(".scene-enhancement")].map(
					(element) => ({
						...element.dataset,
						canvas: [...element.querySelectorAll("canvas")].map((canvas) => ({
							width: canvas.width,
							cssWidth: canvas.clientWidth,
							height: canvas.height,
						})),
					}),
				),
				overflow: document.documentElement.scrollWidth > innerWidth,
			};
		});
		results.push({ width, measurement, visibleScenes, errors });
		console.log(JSON.stringify(results.at(-1)));
		await page.close();
	}
	const fallback = await browser.newPage({
		viewport: { width: 1440, height: 1000 },
		reducedMotion: "reduce",
	});
	await fallback.goto("http://127.0.0.1:3000/en");
	await fallback.screenshot({
		path: `${directory}/${engine}-fallback-home-1440.png`,
	});
	await fallback.locator(".device-showcase").scrollIntoViewIfNeeded();
	await fallback.screenshot({
		path: `${directory}/${engine}-fallback-work-1440.png`,
	});
	await fallback.close();
	await writeFile(
		`${directory}/${engine}-measurements.json`,
		JSON.stringify(results, null, 2),
	);
} finally {
	await browser.close();
}
