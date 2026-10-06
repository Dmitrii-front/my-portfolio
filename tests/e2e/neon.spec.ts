import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("Neon separates scroll tracks, foreground alpha and localized glow", async ({
	page,
}, info) => {
	test.skip(info.project.name !== "desktop");
	await page.goto("/en");
	for (const width of [375, 768, 1024, 1440, 1920]) {
		await page.setViewportSize({ width, height: 1000 });
		await expect(page.locator(".neon-path")).toHaveAttribute(
			"data-profile",
			width < 768 ? "mobile" : width < 1200 ? "tablet" : "desktop",
		);
		await expect(page.locator(".neon-glow-tile").first()).toBeAttached();
		const geometry = await page.evaluate(() => ({
			masks: document.querySelectorAll(".neon-path mask").length,
			filters: [
				...document.querySelectorAll<SVGFilterElement>(".neon-path filter"),
			].map((filter) => ({
				width: Number(filter.getAttribute("width")),
				height: Number(filter.getAttribute("height")),
			})),
			backgrounds: [
				".work-narratives",
				".work-step",
				".work-presentation",
				".device-showcase",
				".scene-enhancement",
				".device-selector",
				".project-controls",
				".work-active-label",
			].map(
				(selector) =>
					getComputedStyle(document.querySelector(selector) as Element)
						.backgroundColor,
			),
			overflow: document.documentElement.scrollWidth > innerWidth,
		}));
		expect(geometry.masks).toBe(0);
		expect(geometry.filters.length).toBeGreaterThan(2);
		for (const filter of geometry.filters) {
			expect(filter.width).toBeLessThanOrEqual(364);
			expect(filter.height).toBeLessThanOrEqual(364);
		}
		expect(
			geometry.backgrounds.every((color) => color === "rgba(0, 0, 0, 0)"),
		).toBe(true);
		expect(geometry.overflow).toBe(false);
		await page.locator("#home-lab").scrollIntoViewIfNeeded();
		await expect(page.locator(".neon-energy")).toHaveCSS("opacity", "1");
		await expect
			.poll(() => page.locator("#journey-energy-line").getAttribute("d"))
			.toContain("L");
		await expect(page.locator(".neon-path")).toHaveAttribute(
			"aria-hidden",
			"true",
		);
	}
	const audit = await new AxeBuilder({ page })
		.withTags(["wcag2a", "wcag2aa", "wcag21aa"])
		.analyze();
	expect(audit.violations).toEqual([]);
});

test("reduced motion keeps static layered light without a travelling pulse", async ({
	page,
}, info) => {
	test.skip(info.project.name !== "desktop");
	await page.emulateMedia({ reducedMotion: "reduce" });
	await page.goto("/en");
	await expect(page.locator(".neon-inner").first()).toBeAttached();
	await expect(page.locator(".neon-energy")).toHaveCSS("display", "none");
	await expect
		.poll(async () =>
			Number.parseFloat(
				await page
					.locator(".neon-progress")
					.evaluate((e) => getComputedStyle(e).strokeDashoffset),
			),
		)
		.toBe(0);
	const initial = await page.locator(".neon-energy").getAttribute("y");
	await page.locator("#home-contact").scrollIntoViewIfNeeded();
	await expect
		.poll(() => page.locator(".neon-energy").getAttribute("y"))
		.toBe(initial);
	await page.emulateMedia({ reducedMotion: "no-preference" });
	await page.locator("#home-lab").scrollIntoViewIfNeeded();
	await expect(page.locator(".neon-energy")).not.toHaveCSS("display", "none");
	await expect(page.locator(".neon-energy")).toHaveCSS("opacity", "1");
});
