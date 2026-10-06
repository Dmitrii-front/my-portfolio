import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.use({ locale: "ru-RU" });

test("root resolves browser language and respects persisted explicit preference", async ({
	page,
	context,
}) => {
	await page.goto("/");
	await expect(page).toHaveURL(/\/ru$/);
	await page.goto("/ru/projects/healthy");
	await page.getByRole("link", { name: "Choose English" }).click();
	await expect(page).toHaveURL(/\/en\/projects\/healthy$/);
	expect(
		(await context.cookies()).find(
			(cookie) => cookie.name === "portfolio-locale",
		)?.value,
	).toBe("en");
	await page.goto("/");
	await expect(page).toHaveURL(/\/en$/);
	await page.reload();
	await expect(page.locator("html")).toHaveAttribute("lang", "en");
	await page.goto("/ru");
	await expect(page.locator("html")).toHaveAttribute("lang", "ru");
});

test("all public skeletons have correct language, landmarks and locale metadata", async ({
	page,
}) => {
	for (const locale of ["en", "ru"]) {
		for (const path of [
			"",
			"/projects",
			"/projects/pnlwise",
			"/projects/healthy",
			"/projects/portfolio",
			"/lab",
			"/about",
			"/experience",
			"/contact",
		]) {
			const response = await page.goto(`/${locale}${path}`);
			expect(response?.status()).toBe(200);
			await expect(page.locator("html")).toHaveAttribute("lang", locale);
			await expect(page.locator("main h1")).toHaveCount(1);
			await expect(page.getByRole("main")).toHaveCount(1);
			await expect(page.getByRole("contentinfo")).toBeVisible();
			await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
				"href",
				new RegExp(`/${locale}${path}$`),
			);
			await expect(page.locator('link[hreflang="en"]')).toHaveAttribute(
				"href",
				new RegExp(`/en${path}$`),
			);
			await expect(page.locator('link[hreflang="ru"]')).toHaveAttribute(
				"href",
				new RegExp(`/ru${path}$`),
			);
			await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
				"content",
				"noindex, nofollow",
			);
		}
	}
	expect((await page.goto("/de"))?.status()).toBe(404);
	expect((await page.goto("/en/projects/missing"))?.status()).toBe(404);
	expect((await page.goto("/en/missing"))?.status()).toBe(404);
});

test("Home has no horizontal overflow and passes automated accessibility", async ({
	page,
}, info) => {
	for (const locale of ["en", "ru"]) {
		await page.goto(`/${locale}`);
		expect(
			await page.evaluate(
				() => document.documentElement.scrollWidth <= window.innerWidth,
			),
		).toBe(true);
		const audit = await new AxeBuilder({ page })
			.withTags(["wcag2a", "wcag2aa", "wcag21aa"])
			.analyze();
		expect(audit.violations).toEqual([]);
		await page.screenshot({
			path: `artifacts/phase3-1/home-${locale}-${info.project.name}.png`,
			fullPage: true,
		});
		await page.screenshot({
			path: `artifacts/phase3-1/home-${locale}-${info.project.name}-viewport.png`,
		});
	}
});

test("base breakpoint boundaries stay within the viewport", async ({
	page,
}, info) => {
	test.skip(info.project.name !== "desktop");
	for (const width of [320, 375, 430, 767, 768, 1024, 1199, 1200, 1440, 1920]) {
		await page.setViewportSize({ width, height: 900 });
		await page.goto("/ru");
		expect(
			await page.evaluate(
				() => document.documentElement.scrollWidth <= window.innerWidth,
			),
			`overflow at ${width}px`,
		).toBe(true);
		for (const link of await page
			.locator(".header-controls a:visible, summary:visible")
			.all()) {
			const box = await link.boundingBox();
			expect(box?.height).toBeGreaterThanOrEqual(44);
		}
	}
});

test("mobile navigation opens by keyboard and closes with Escape and navigation", async ({
	page,
}, info) => {
	test.skip(info.project.name === "desktop");
	await page.goto("/en");
	const trigger = page.locator("summary");
	await trigger.focus();
	await page.keyboard.press("Enter");
	await expect(page.locator("details")).toHaveAttribute("open", "");
	await page.keyboard.press("Tab");
	await expect(page.locator(".mobile-panel a").first()).toBeFocused();
	await page.keyboard.press("Escape");
	await expect(page.locator("details")).not.toHaveAttribute("open", "");
	await expect(trigger).toBeFocused();
	await trigger.click();
	await page
		.locator(".mobile-panel")
		.getByRole("link", { name: "Work" })
		.click();
	await expect(page).toHaveURL(/\/en\/projects$/);
	await expect(page.locator("details")).not.toHaveAttribute("open", "");
	await trigger.click();
	await page
		.locator(".mobile-panel")
		.getByRole("link", { name: "Work" })
		.click();
	await expect(page.locator("details")).not.toHaveAttribute("open", "");
	await expect(trigger).toBeFocused();
});

test("skip navigation and reduced-motion preference work", async ({ page }) => {
	await page.emulateMedia({ reducedMotion: "reduce" });
	await page.goto("/en");
	await page.keyboard.press("Tab");
	await expect(page.locator(".skip-link")).toBeFocused();
	await page.keyboard.press("Enter");
	await expect(page.locator("main")).toBeFocused();
	const durations = await page
		.locator(".button")
		.first()
		.evaluate((element) => getComputedStyle(element).transitionDuration);
	expect(durations.split(", ").every((duration) => duration === "0s")).toBe(
		true,
	);
});

test("content, native menu and language choice work without JavaScript", async ({
	browser,
	baseURL,
}) => {
	const context = await browser.newContext({
		javaScriptEnabled: false,
		viewport: { width: 390, height: 844 },
	});
	const page = await context.newPage();
	await page.goto(`${baseURL}/en`);
	await expect(page.getByRole("heading", { level: 1 })).toContainText(
		"digital products",
	);
	for (const name of ["Pnlwise", "Healthy", "Portfolio"])
		await expect(
			page.getByRole("heading", { name, exact: true }),
		).toBeVisible();
	await expect(page.locator(".device-showcase")).toBeVisible();
	await expect(page.locator(".lab-card")).toHaveCount(4);
	await expect(
		page.locator(".contact-noscript").getByRole("link", { name: "GitHub" }),
	).toBeVisible();
	await page.locator("summary").click();
	await expect(page.locator(".contact-noscript a")).toHaveCount(4);
	await page
		.locator(".mobile-panel")
		.getByRole("link", { name: "Work" })
		.click();
	await expect(page).toHaveURL(/\/en\/projects$/);
	await page.getByRole("link", { name: "Выбрать русский" }).click();
	await expect(page).toHaveURL(/\/ru\/projects$/);
	await page.goto(`${baseURL}/`);
	await expect(page).toHaveURL(/\/ru$/);
	await context.close();
});
