import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("initial Home stays lightweight and has no hydration layout shift", async ({
	page,
}, info) => {
	test.skip(info.project.name !== "desktop");
	const errors: string[] = [];
	page.on("pageerror", (error) => errors.push(error.message));
	page.on("console", (message) => {
		if (message.type() === "error") errors.push(message.text());
	});
	await page.addInitScript(() => {
		const shifts: number[] = [];
		Object.assign(window, { homeShifts: shifts });
		new PerformanceObserver((list) => {
			for (const entry of list.getEntries()) {
				const shift = entry as PerformanceEntry & {
					value: number;
					hadRecentInput: boolean;
				};
				if (!shift.hadRecentInput) shifts.push(shift.value);
			}
		}).observe({ type: "layout-shift", buffered: true });
	});
	for (const width of [375, 768, 1440]) {
		await page.setViewportSize({ width, height: 900 });
		await page.goto("/en");
		await expect(page.locator(".work-layout")).not.toHaveAttribute(
			"data-mode",
			"static",
		);
		await page.waitForLoadState("networkidle");
		const measurement = await page.evaluate(() => {
			const entries = performance.getEntriesByType(
				"resource",
			) as PerformanceResourceTiming[];
			return {
				jsBytes: entries
					.filter((entry) => entry.name.includes(".js"))
					.reduce((sum, entry) => sum + entry.encodedBodySize, 0),
				cssBytes: entries
					.filter((entry) => entry.name.includes(".css"))
					.reduce((sum, entry) => sum + entry.encodedBodySize, 0),
				layoutShift: (
					window as unknown as { homeShifts: number[] }
				).homeShifts.reduce((sum, value) => sum + value, 0),
				externalResources: entries
					.filter((entry) => new URL(entry.name).origin !== location.origin)
					.map((entry) => entry.name),
			};
		});
		await info.attach(`initial-home-${width}`, {
			body: JSON.stringify(measurement),
			contentType: "application/json",
		});
		console.log(`Initial Home ${width}px: ${JSON.stringify(measurement)}`);
		expect(measurement.jsBytes).toBeLessThan(400_000);
		expect(measurement.cssBytes).toBeLessThan(60_000);
		expect(measurement.layoutShift).toBeLessThan(0.1);
		expect(measurement.externalResources).toEqual([]);
	}
	expect(errors).toEqual([]);
});

test("Hub supports focus/tap, product reveal and equivalent Selected Work target", async ({
	page,
}) => {
	await page.goto("/en");
	const idea = page.getByRole("button", { name: "IDEA", exact: true });
	await idea.focus();
	await expect(idea).toHaveAttribute("aria-pressed", "true");
	await expect(page.locator("#hub-context")).toContainText(
		"Start with the problem",
	);
	await expect(
		page.locator('.hub-connections path[data-lit="true"]'),
	).toHaveCount(1);
	await page.getByRole("button", { name: "PRODUCTS", exact: true }).click();
	await expect(page.locator("#hub-featured")).toBeVisible();
	await page
		.locator("#hub-featured")
		.getByRole("link", { name: "Healthy" })
		.focus();
	await page.keyboard.press("Escape");
	await expect(page.locator("#hub-featured")).toBeHidden();
	await expect(page.locator(".hub-products")).toBeFocused();
	await page.locator(".hub-products").click();
	await page
		.locator("#hub-featured")
		.getByRole("link", { name: "Healthy" })
		.click();
	await expect(page.locator(".work-layout")).toHaveAttribute(
		"data-active-project",
		"healthy",
	);
	await expect(page.locator("#work-healthy")).toBeFocused();
	await expect(page).toHaveURL(/\/en#work-healthy$/);
	await page
		.locator(".project-controls")
		.getByRole("button", { name: "Pnlwise", exact: true })
		.click();
	await expect(page.locator(".device-showcase")).toHaveAttribute(
		"data-project",
		"pnlwise",
	);
	await page.locator(".hub-products").click();
	await page
		.locator("#hub-featured")
		.getByRole("link", { name: "Healthy" })
		.click();
	await expect(page.locator(".device-showcase")).toHaveAttribute(
		"data-project",
		"healthy",
	);
});

test("project and device controls share one persistent presentation", async ({
	page,
}, info) => {
	await page.goto("/en");
	const surface = page.locator(".device-showcase");
	await expect(page.locator(".work-layout")).not.toHaveAttribute(
		"data-mode",
		"static",
	);
	await expect(surface).toHaveCount(1);
	await expect(surface).toHaveAttribute(
		"data-device",
		info.project.name === "mobile"
			? "iPhone"
			: info.project.name === "tablet"
				? "iPad"
				: "MacBook",
	);
	await page
		.locator(".project-controls")
		.getByRole("button", { name: "Healthy", exact: true })
		.click();
	await expect(surface).toHaveAttribute("data-project", "healthy");
	await page.getByRole("button", { name: "iPad", exact: true }).click();
	await expect(surface).toHaveAttribute("data-device", "iPad");
	await expect(surface).toHaveAttribute("data-project", "healthy");
	await page
		.locator(".project-controls")
		.getByRole("button", { name: "Next project" })
		.click();
	await expect(surface).toHaveAttribute("data-project", "portfolio");
	await expect(surface).toHaveCount(1);
});

test("mobile swipe changes projects without desktop sticky layout", async ({
	page,
}, info) => {
	test.skip(info.project.name !== "mobile");
	await page.goto("/en");
	await expect(page.locator(".work-layout")).toHaveAttribute(
		"data-mode",
		"compact",
	);
	const target = page.locator(".work-presentation");
	await target.scrollIntoViewIfNeeded();
	await target.dispatchEvent("pointerdown", {
		pointerType: "touch",
		clientX: 260,
		clientY: 300,
	});
	await target.dispatchEvent("pointerup", {
		pointerType: "touch",
		clientX: 120,
		clientY: 305,
	});
	await expect(page.locator(".device-showcase")).toHaveAttribute(
		"data-project",
		"healthy",
	);
	await expect(page.locator(".work-step:visible")).toHaveCount(1);
	await page.getByRole("button", { name: "Previous project" }).click();
	const box = await page.locator(".device-body").boundingBox();
	expect(box).not.toBeNull();
	const session = await page.context().newCDPSession(page);
	const x = (box?.x ?? 0) + (box?.width ?? 0) * 0.8,
		y = (box?.y ?? 0) + 100;
	await session.send("Input.dispatchTouchEvent", {
		type: "touchStart",
		touchPoints: [{ x, y }],
	});
	for (let distance = 20; distance <= 100; distance += 20)
		await session.send("Input.dispatchTouchEvent", {
			type: "touchMove",
			touchPoints: [{ x: x - distance, y }],
		});
	await session.send("Input.dispatchTouchEvent", {
		type: "touchEnd",
		touchPoints: [],
	});
	await expect(page.locator(".device-showcase")).toHaveAttribute(
		"data-project",
		"healthy",
	);
	await session.detach();
});

test("desktop native scroll changes project and releases sticky presentation", async ({
	page,
}, info) => {
	test.skip(info.project.name !== "desktop");
	await page.goto("/en");
	await expect(page.locator(".work-layout")).toHaveAttribute(
		"data-mode",
		"sticky",
	);
	for (const slug of ["pnlwise", "healthy", "portfolio"]) {
		await page
			.locator(`#work-${slug}`)
			.evaluate((element) => element.scrollIntoView({ block: "center" }));
		await expect(page.locator(".device-showcase")).toHaveAttribute(
			"data-project",
			slug,
		);
	}
	const pinned = await page.locator(".work-presentation").boundingBox();
	await page
		.locator("#home-lab")
		.evaluate((element) => element.scrollIntoView({ block: "start" }));
	const released = await page.locator(".work-presentation").boundingBox();
	expect(released?.y).toBeLessThan((pinned?.y ?? 0) - 100);
});

test("Contact fan supports sequential disclosure, keyboard, Escape and outside tap", async ({
	page,
}) => {
	await page.goto("/en");
	const trigger = page.locator(".contact-trigger");
	await trigger.focus();
	await page.keyboard.press("Enter");
	await expect(trigger).toHaveAttribute("aria-expanded", "true");
	await page.keyboard.press("Tab");
	await expect(
		page.locator(".contact-channel").first().getByRole("button"),
	).toBeFocused();
	await expect(
		page.locator(".contact-channels").getByRole("link", { name: "GitHub" }),
	).toHaveAttribute("href", "https://github.com/Dmitrii-front");
	await expect(page.locator(".contact-channel").last()).toHaveCSS(
		"opacity",
		"1",
	);
	const audit = await new AxeBuilder({ page })
		.withTags(["wcag2a", "wcag2aa", "wcag21aa"])
		.analyze();
	expect(audit.violations).toEqual([]);
	for (const item of await page.locator(".contact-channel").all()) {
		const box = await item.boundingBox();
		const width = page.viewportSize()?.width ?? 0;
		expect(box?.x).toBeGreaterThanOrEqual(0);
		expect((box?.x ?? 0) + (box?.width ?? 0)).toBeLessThanOrEqual(width);
	}
	await page.keyboard.press("Escape");
	await expect(trigger).toHaveAttribute("aria-expanded", "false");
	await expect(trigger).toBeFocused();
	await trigger.click();
	await page.locator("#contact-title").click();
	await expect(trigger).toHaveAttribute("aria-expanded", "false");
});

test("Lab has native horizontal browsing and accessible arrows", async ({
	page,
}) => {
	await page.goto("/en");
	const track = page.locator(".lab-track");
	await expect(track.locator("article")).toHaveCount(4);
	await page.getByRole("button", { name: "Next experiments" }).click();
	await expect
		.poll(() => track.evaluate((element) => element.scrollLeft))
		.toBeGreaterThan(0);
	await track.focus();
	await page.keyboard.press("ArrowLeft");
	await expect(track).toBeFocused();
});

test("short/tall viewports degrade cleanly and motion preference disables reveals", async ({
	page,
}, info) => {
	test.skip(info.project.name !== "desktop");
	await page.emulateMedia({ reducedMotion: "reduce" });
	for (const width of [320, 375, 430, 768, 1024, 1200, 1440, 1920]) {
		for (const height of [500, 900]) {
			await page.setViewportSize({ width, height });
			await page.goto("/ru");
			await expect(page.locator(".work-layout")).toHaveAttribute(
				"data-mode",
				width >= 1024 && height >= 700 ? "sticky" : "compact",
			);
			expect(
				await page.evaluate(
					() => document.documentElement.scrollWidth <= innerWidth,
				),
				`${width}x${height}`,
			).toBe(true);
			await page.locator(".contact-trigger").click();
			const animations = await page
				.locator(".hub-node")
				.first()
				.evaluate((element) => getComputedStyle(element).animationName);
			expect(animations).toBe("none");
			expect(
				await page
					.locator(".contact-channel")
					.first()
					.evaluate((element) => getComputedStyle(element).transitionDuration),
			).toBe("0s");
			expect(
				await page
					.locator(".neon-progress")
					.evaluate((element) => element.style.strokeDashoffset),
			).toBe("0");
		}
	}
});

test("fresh Phase 2 review artifacts", async ({ page }, info) => {
	test.skip(info.project.name !== "desktop");
	await page.emulateMedia({ reducedMotion: "reduce" });
	for (const locale of ["en", "ru"]) {
		await page.setViewportSize({ width: 375, height: 812 });
		await page.goto(`/${locale}`);
		await expect(page.locator(".work-layout")).toHaveAttribute(
			"data-mode",
			"compact",
		);
		await page.screenshot({
			path: `artifacts/phase2/home-${locale}-375.png`,
			fullPage: true,
		});
	}
	for (const width of [768, 1024, 1440]) {
		await page.setViewportSize({ width, height: 1000 });
		await page.goto("/en");
		await expect(page.locator(".work-layout")).not.toHaveAttribute(
			"data-mode",
			"static",
		);
		await page.screenshot({
			path: `artifacts/phase2/home-en-${width}.png`,
			fullPage: true,
		});
	}
	for (const slug of ["pnlwise", "healthy"]) {
		await page
			.locator(`#work-${slug}`)
			.evaluate((element) => element.scrollIntoView({ block: "center" }));
		await expect(page.locator(".device-showcase")).toHaveAttribute(
			"data-project",
			slug,
		);
		await page.screenshot({ path: `artifacts/phase2/work-${slug}-1440.png` });
	}
	await page.locator(".contact-trigger").click();
	await page.screenshot({ path: "artifacts/phase2/contact-open-1440.png" });
	await page.setViewportSize({ width: 375, height: 812 });
	await page.goto("/ru");
	await page.locator(".contact-trigger").click();
	await page.screenshot({ path: "artifacts/phase2/contact-open-375-ru.png" });
});
