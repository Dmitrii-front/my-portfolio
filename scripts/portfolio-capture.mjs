import { chromium } from "@playwright/test";
import { mkdir, access } from "node:fs/promises";
import { resolve } from "node:path";

// Explicit source capture, not part of build or QA. Preserve an accepted source
// by writing to a fresh destination; asset preparation verifies its exact hash.
const destination = process.argv[2];
if (!destination) throw new Error("Provide a new source PNG destination");
const exists = await access(destination).then(
	() => true,
	() => false,
);
if (exists)
	throw new Error(
		"Source destination exists; use a new path, never overwrite an accepted original",
	);
await mkdir(resolve(destination, ".."), { recursive: true });
const browser = await chromium.launch({ channel: "chrome", headless: true });
try {
	const page = await browser.newPage({
		viewport: { width: 1920, height: 1106 },
		deviceScaleFactor: 1,
		reducedMotion: "reduce",
	});
	await page.goto("http://127.0.0.1:3000/en");
	await page.waitForLoadState("networkidle");
	await page.screenshot({ path: destination });
} finally {
	await browser.close();
}
