import { mkdir, writeFile } from "node:fs/promises";
import { chromium } from "@playwright/test";

const root = "artifacts/phase5-content";
const origin = process.env.PLAYWRIGHT_BASE_URL ?? "http://127.0.0.1:3001";
await mkdir(root, { recursive: true });
const browser = await chromium.launch({ channel: "chrome", headless: true });
const captures = [];
try {
	for (const locale of ["en", "ru"]) {
		for (const [name, path] of [
			["home", ""],
			["projects", "/projects"],
			["pnlwise", "/projects/pnlwise"],
			["healthy", "/projects/healthy"],
			["portfolio", "/projects/portfolio"],
			["about", "/about"],
			["experience", "/experience"],
		]) {
			const page = await browser.newPage({
				viewport: { width: 1440, height: 1000 },
				reducedMotion: "reduce",
				deviceScaleFactor: 1,
			});
			const errors = [];
			page.on("pageerror", (error) => errors.push(error.message));
			await page.goto(`${origin}/${locale}${path}`);
			await page.locator("main h1").waitFor();
			if (!path)
				await page
					.locator(".neon-glow-tile")
					.first()
					.waitFor({ state: "attached" });
			for (const image of await page.locator(".case-media img").all()) {
				await image.scrollIntoViewIfNeeded();
				await image.evaluate((img) => img.decode());
			}
			await page.evaluate(() => scrollTo(0, 0));
			const file = `${name}-${locale}-1440.png`;
			await page.screenshot({ path: `${root}/${file}`, fullPage: true });
			if (!path)
				await page.screenshot({ path: `${root}/hero-${locale}-1440.png` });
			captures.push({
				file,
				route: `/${locale}${path}`,
				errors,
				overflow: await page.evaluate(
					() => document.documentElement.scrollWidth > innerWidth,
				),
			});
			await page.close();
		}
		for (const width of [375, 768, 1024]) {
			const page = await browser.newPage({
				viewport: { width, height: 1000 },
				reducedMotion: "reduce",
			});
			await page.goto(`${origin}/${locale}`);
			await page
				.locator(".neon-glow-tile")
				.first()
				.waitFor({ state: "attached" });
			await page.screenshot({
				path: `${root}/home-${locale}-${width}.png`,
				fullPage: true,
			});
			await page.close();
		}
	}
	await writeFile(`${root}/review.json`, JSON.stringify(captures, null, 2));
	await writeFile(
		`${root}/README.md`,
		`# Phase 5 content review\n\nLocal production build, Chrome, DPR 1. Reduced motion gives stable reading captures; existing E2E separately tests enhanced Home. Images are review artifacts, not newly approved project assets. Full Home captures include native pin track travel.\n\n${captures.map((capture) => `- [${capture.route}](${capture.file})`).join("\n")}\n\nAdditional Home EN/RU: 375, 768, 1024px; focused Hero 1440px.\n`,
	);
	if (captures.some((capture) => capture.errors.length || capture.overflow))
		throw new Error("Capture errors; inspect review.json");
} finally {
	await browser.close();
}
