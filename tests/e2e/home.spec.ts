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
			const first3d =
				performance
					.getEntriesByType("mark")
					.filter((entry) => entry.name.endsWith("3d-request"))[0]?.startTime ??
				Infinity;
			return {
				jsBytes: entries
					.filter(
						(entry) => entry.name.includes(".js") && entry.startTime < first3d,
					)
					.reduce((sum, entry) => sum + entry.encodedBodySize, 0),
				deferredJsBytes: entries
					.filter(
						(entry) => entry.name.includes(".js") && entry.startTime >= first3d,
					)
					.reduce((sum, entry) => sum + entry.encodedBodySize, 0),
				cssBytes: entries
					.filter((entry) => entry.name.includes(".css"))
					.reduce((sum, entry) => sum + entry.encodedBodySize, 0),
				imageBytes: entries
					.filter((entry) => entry.name.includes(".webp"))
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
		expect(measurement.imageBytes).toBeLessThan(150_000);
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

test("verified device choices share one persistent presentation", async ({
	page,
}) => {
	await page.goto("/en");
	const surface = page.locator(".device-showcase");
	await expect(page.locator(".work-layout")).not.toHaveAttribute(
		"data-mode",
		"static",
	);
	await expect(surface).toHaveCount(1);
	await expect(surface).toHaveAttribute("data-device", "MacBook");
	await expect(page.locator(".device-selector button")).toHaveText(["MacBook"]);
	await expect(
		page.getByRole("button", { name: "iPad", exact: true }),
	).toHaveCount(0);
	await expect(
		page.getByRole("button", { name: "iPhone", exact: true }),
	).toHaveCount(0);
	await surface.evaluate((element) =>
		element.setAttribute("data-persistent-test", "yes"),
	);
	await page
		.locator(".project-controls")
		.getByRole("button", { name: "Healthy", exact: true })
		.click();
	await expect(surface).toHaveAttribute("data-project", "healthy");
	await page.getByRole("button", { name: "MacBook", exact: true }).click();
	await expect(surface).toHaveAttribute("data-device", "MacBook");
	await expect(surface).toHaveAttribute("data-project", "healthy");
	await page
		.locator(".project-controls")
		.getByRole("button", { name: "Next project" })
		.click();
	await expect(surface).toHaveAttribute("data-project", "portfolio");
	await expect(surface).toHaveAttribute("data-device", "fallback");
	await expect(page.locator(".device-selector")).toHaveCount(0);
	await expect(
		surface.locator(".device-body, .device-camera, img"),
	).toHaveCount(0);
	await expect(surface.locator(".project-fallback")).toBeVisible();
	await page.getByRole("button", { name: "Previous project" }).click();
	await expect(surface).toHaveAttribute("data-device", "MacBook");
	await expect(surface).toHaveAttribute("data-project", "healthy");
	await expect(surface).toHaveAttribute("data-persistent-test", "yes");
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
	browserName,
}) => {
	await page.goto("/en");
	const trigger = page.locator(".contact-trigger");
	await trigger.focus();
	await page.keyboard.press("Enter");
	await expect(trigger).toHaveAttribute("aria-expanded", "true");
	await page.keyboard.press(
		browserName === "webkit" && process.platform === "darwin"
			? "Alt+Tab"
			: "Tab",
	);
	await expect(
		page.locator(".contact-channel").first().getByRole("link"),
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
	await expect(track.locator(".lab-mark svg")).toHaveCount(4);
	for (const glyph of await track.locator(".lab-mark svg").all()) {
		await expect(glyph).toHaveAttribute("viewBox", "0 0 24 24");
		await expect(glyph).toHaveAttribute("stroke-width", "1.5");
		await expect(glyph).toHaveAttribute("aria-hidden", "true");
	}
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
			await expect(page.locator(".device-selector button")).toHaveText([
				"MacBook",
			]);
			await expect(page.locator(".device-showcase")).toHaveAttribute(
				"data-device",
				"MacBook",
			);
			expect(
				await page.evaluate(
					() => document.documentElement.scrollWidth <= innerWidth,
				),
				`${width}x${height}`,
			).toBe(true);
			await page.locator(".contact-trigger").click();
			for (const channel of await page.locator(".contact-channel a").all()) {
				const box = await channel.boundingBox();
				expect(box?.x, `${width}x${height} fan left`).toBeGreaterThanOrEqual(0);
				expect(
					(box?.x ?? 0) + (box?.width ?? 0),
					`${width}x${height} fan right`,
				).toBeLessThanOrEqual(width);
				expect(box?.y, `${width}x${height} fan top`).toBeGreaterThanOrEqual(0);
				expect(
					(box?.y ?? 0) + (box?.height ?? 0),
					`${width}x${height} fan bottom`,
				).toBeLessThanOrEqual(height);
				expect(box?.width).toBeGreaterThanOrEqual(44);
				await expect(channel).toHaveCSS("border-radius", "50%");
			}
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
				Number.parseFloat(
					await page
						.locator(".neon-progress")
						.evaluate((element) => element.style.strokeDashoffset),
				),
			).toBe(0);
		}
	}
});

test("real screens preserve aspect ratio and missing devices are not offered", async ({
	page,
}) => {
	await page.emulateMedia({ reducedMotion: "reduce" });
	await page.goto("/en");
	const scene = page.locator(".device-showcase");
	for (const slug of ["pnlwise", "healthy", "portfolio"]) {
		await page
			.locator(".project-controls")
			.getByRole("button", {
				name:
					slug === "pnlwise"
						? "Pnlwise"
						: slug === "healthy"
							? "Healthy"
							: "Portfolio",
				exact: true,
			})
			.click();
		await expect(
			page.getByRole("button", { name: "iPad", exact: true }),
		).toHaveCount(0);
		await expect(
			page.getByRole("button", { name: "iPhone", exact: true }),
		).toHaveCount(0);
		await expect(scene).toHaveAttribute("data-project", slug);
		if (slug !== "portfolio") {
			await expect(page.locator(".device-selector button")).toHaveText([
				"MacBook",
			]);
			await expect(scene).toHaveAttribute("data-device", "MacBook");
			const image = scene.getByRole("img");
			await expect(image).toBeVisible();
			await expect
				.poll(() =>
					image.evaluate(
						(element: HTMLImageElement) =>
							element.complete && element.naturalWidth > 0,
					),
				)
				.toBe(true);
			await expect(image).toHaveCSS("object-fit", "contain");
			const ratio = await image.evaluate(
				(element: HTMLImageElement) =>
					element.naturalWidth / element.naturalHeight,
			);
			expect(ratio).toBeCloseTo(3454 / 1990, 2);
		} else {
			await expect(scene.getByRole("img")).toHaveCount(0);
			await expect(page.locator(".device-selector")).toHaveCount(0);
			await expect(scene.locator(".project-fallback-caption")).toContainText(
				"Visual overview coming soon",
			);
			await expect(scene.locator(".device-body")).toHaveCount(0);
			const audit = await new AxeBuilder({ page })
				.include("#selected-work")
				.withTags(["wcag2a", "wcag2aa", "wcag21aa"])
				.analyze();
			expect(audit.violations).toEqual([]);
		}
		await expect(scene).toHaveCount(1);
	}
});

test("Neon Path crosses interior composition, updates on resize and stays behind objects", async ({
	page,
}, info) => {
	test.skip(info.project.name !== "desktop");
	await page.emulateMedia({ reducedMotion: "reduce" });
	await page.goto("/en");
	for (const width of [375, 1024, 1440]) {
		await page.setViewportSize({ width, height: 900 });
		await expect(page.locator(".neon-path")).toHaveAttribute(
			"data-profile",
			width < 768 ? "mobile" : width < 1200 ? "tablet" : "desktop",
		);
		await expect
			.poll(() => page.locator(".neon-track").getAttribute("d"))
			.toContain(" C");
		const samples = await page
			.locator(".neon-track")
			.evaluate((element: SVGPathElement) => {
				const length = element.getTotalLength();
				return Array.from(
					{ length: 30 },
					(_, i) => element.getPointAtLength((length * i) / 29).x / innerWidth,
				);
			});
		expect(Math.max(...samples)).toBeLessThan(0.9);
		expect(Math.min(...samples)).toBeLessThan(0.4);
		expect(Math.max(...samples) - Math.min(...samples)).toBeGreaterThan(0.5);
		await expect(page.locator(".neon-path g")).toHaveAttribute(
			"mask",
			"url(#journey-occlusion)",
		);
		await expect(page.locator("#journey-occlusion rect")).not.toHaveCount(1);
	}
});

test("desktop spacing remains generous with bounded device growth", async ({
	page,
}, info) => {
	test.skip(info.project.name !== "desktop");
	await page.emulateMedia({ reducedMotion: "reduce" });
	await page.goto("/en");
	for (const width of [1200, 1440, 1920]) {
		await page.setViewportSize({ width, height: 1000 });
		await expect(page.locator(".work-layout")).toHaveAttribute(
			"data-mode",
			"sticky",
		);
		await expect(page.locator(".work-step").first()).toHaveCSS(
			"min-height",
			"630px",
		);
		await expect(page.locator(".work-layout")).toHaveCSS("gap", "20px");
		const box = await page.locator(".device-body").boundingBox();
		expect(box?.width).toBeLessThanOrEqual(720);
		if (width >= 1440) expect(box?.width).toBeGreaterThanOrEqual(704);
	}
});

test("Hub active and expanded states retain accessible contrast", async ({
	page,
}, info) => {
	test.skip(info.project.name !== "desktop");
	await page.emulateMedia({ reducedMotion: "reduce" });
	await page.goto("/en");
	await page.getByRole("button", { name: "IDEA", exact: true }).focus();
	for (const expanded of [false, true]) {
		if (expanded) await page.locator(".hub-products").click();
		const audit = await new AxeBuilder({ page })
			.include("#product-hub")
			.withTags(["wcag2a", "wcag2aa", "wcag21aa"])
			.analyze();
		expect(audit.violations).toEqual([]);
	}
});

test("fresh Phase 4 review artifacts", async ({ page }, info) => {
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
			path: `artifacts/phase4/home-${locale}-375.png`,
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
			path: `artifacts/phase4/home-en-${width}.png`,
			fullPage: true,
		});
	}
	for (const slug of ["pnlwise", "healthy", "portfolio"]) {
		await page
			.locator(`#work-${slug}`)
			.evaluate((element) => element.scrollIntoView({ block: "center" }));
		await expect(page.locator(".device-showcase")).toHaveAttribute(
			"data-project",
			slug,
		);
		if (slug !== "portfolio")
			await expect
				.poll(() =>
					page
						.locator(".device-screen img")
						.evaluate(
							(element: HTMLImageElement) =>
								element.complete && element.naturalWidth > 0,
						),
				)
				.toBe(true);
		await page.screenshot({ path: `artifacts/phase4/work-${slug}-1440.png` });
	}
	await page
		.locator("#home-lab")
		.evaluate((element) => element.scrollIntoView({ block: "start" }));
	await page.screenshot({ path: "artifacts/phase4/lab-1440.png" });
	await page
		.locator("#home-contact")
		.evaluate((element) => element.scrollIntoView({ block: "start" }));
	await expect(page.locator(".contact-trigger")).toBeInViewport();
	await page.screenshot({ path: "artifacts/phase4/contact-closed-1440.png" });
	await page.locator(".contact-trigger").click();
	await page.screenshot({ path: "artifacts/phase4/contact-open-1440.png" });
	await page.setViewportSize({ width: 375, height: 812 });
	await page.goto("/ru");
	await page.locator(".contact-trigger").click();
	await page.screenshot({ path: "artifacts/phase4/contact-open-375-ru.png" });
	await page.setViewportSize({ width: 1440, height: 1000 });
	await page.goto("/en");
	await page.screenshot({ path: "artifacts/phase4/hub-default-1440.png" });
	await page.getByRole("button", { name: "IDEA", exact: true }).focus();
	await page.screenshot({ path: "artifacts/phase4/hub-active-1440.png" });
	await page.locator(".hub-products").click();
	await page.screenshot({ path: "artifacts/phase4/hub-expanded-1440.png" });
});
