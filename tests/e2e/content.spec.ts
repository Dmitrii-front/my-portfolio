import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const paths = [
	"",
	"/projects",
	"/projects/pnlwise",
	"/projects/healthy",
	"/projects/portfolio",
	"/about",
	"/experience",
	"/lab",
	"/contact",
];

test.setTimeout(120_000);

test("canonical content, locale links and accessible reading routes", async ({
	page,
	request,
}, info) => {
	test.skip(info.project.name !== "desktop");
	await page.emulateMedia({ reducedMotion: "reduce" });
	const internalLinks = new Set<string>();
	for (const locale of ["en", "ru"]) {
		for (const path of paths) {
			const response = await page.goto(`/${locale}${path}`);
			expect(response?.status()).toBe(200);
			expect(await page.locator("main").innerText()).not.toMatch(
				/Full case study in preparation|Подробная профессиональная история готовится|supporting evidence will be added/,
			);
			for (const link of await page
				.locator("main a[href]")
				.evaluateAll((links) => links.map((a) => a.getAttribute("href") ?? "")))
				if (link.startsWith("/")) internalLinks.add(link);
			const results = await new AxeBuilder({ page }).analyze();
			expect(results.violations, `${locale}${path}`).toEqual([]);
			if (path === "/experience") {
				await expect(page.locator("[data-experience]")).toHaveCount(4);
				await expect(
					page.locator('[data-experience="kganimation-kol"]'),
				).toContainText("KGanimation");
				await expect(page.locator("main")).not.toContainText(
					locale === "en" ? "Dentist" : "Стоматолог",
				);
			}
			if (path.startsWith("/projects/"))
				await expect(page.locator(".case-media img")).toHaveCount(1);
		}
	}
	for (const link of internalLinks)
		expect((await request.get(link)).status(), link).toBe(200);
});

test("content fits 375, 768, 1024 and 1440px without clipping", async ({
	page,
}, info) => {
	test.skip(info.project.name !== "desktop");
	await page.emulateMedia({ reducedMotion: "reduce" });
	for (const locale of ["en", "ru"])
		for (const width of [375, 768, 1024, 1440]) {
			await page.setViewportSize({ width, height: 1000 });
			for (const path of paths) {
				await page.goto(`/${locale}${path}`);
				expect(
					await page.evaluate(
						() => document.documentElement.scrollWidth <= innerWidth,
					),
					`${locale}${path} at ${width}px`,
				).toBe(true);
				const media = page.locator(".case-media img");
				if (await media.count()) {
					const box = await media.boundingBox();
					expect(box?.width).toBeLessThanOrEqual(width);
				}
			}
		}
});
