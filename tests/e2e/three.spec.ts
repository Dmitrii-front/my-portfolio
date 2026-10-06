import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

// Exercise the capable path even on low-core CI runners; constrained signals have separate tests.
test.beforeEach(async ({ page }) => {
	await page.addInitScript(() =>
		Object.defineProperty(navigator, "hardwareConcurrency", {
			configurable: true,
			get: () => 8,
		}),
	);
	await page.addInitScript(() =>
		Object.defineProperty(navigator, "deviceMemory", {
			configurable: true,
			get: () => 8,
		}),
	);
});

test("optional scenes preserve semantics, one canvas and verified texture switching", async ({
	page,
}, info) => {
	test.skip(info.project.name !== "desktop");
	await page.goto("/en");
	const hub = page.locator('[data-scene="hub"]');
	await expect(hub).toHaveAttribute("data-state", "ready", { timeout: 15000 });
	await expect(hub).toHaveAttribute("aria-hidden", "true");
	await page.locator(".hub-idea").focus();
	await expect(page.locator(".hub-idea")).toHaveAttribute(
		"aria-pressed",
		"true",
	);
	await page.locator(".hub-products").click();
	await expect(page.locator("#hub-featured")).toBeVisible();
	await page.locator("#hub-featured a").first().focus();
	await page.keyboard.press("Escape");
	await expect(page.locator(".hub-products")).toBeFocused();
	const device = page.locator('[data-scene="device"]');
	await page.locator(".device-showcase").scrollIntoViewIfNeeded();
	await expect(device).toHaveAttribute("data-state", "ready", {
		timeout: 15000,
	});
	const canvas = device.locator("canvas");
	await canvas.evaluate((element) => (element.dataset.persistent = "yes"));
	await expect(canvas).toHaveAttribute(
		"data-texture",
		/pnlwise-desktop-(640|1280)\.webp/,
	);
	await page
		.locator(".project-controls")
		.getByRole("button", { name: "Healthy", exact: true })
		.click();
	await expect(canvas).toHaveAttribute(
		"data-texture",
		/healthy-desktop-(640|1280)\.webp/,
	);
	await expect(canvas).toHaveAttribute("data-persistent", "yes");
	await page
		.locator(".project-controls")
		.getByRole("button", { name: "Portfolio", exact: true })
		.click();
	await expect(page.locator(".project-fallback")).toBeVisible();
	await expect(page.locator(".device-selector")).toHaveCount(0);
	await expect(device).toBeHidden();
	await page
		.locator(".project-controls")
		.getByRole("button", { name: "Pnlwise", exact: true })
		.click();
	await expect(canvas).toHaveAttribute("data-persistent", "yes");
	await expect(canvas).toHaveAttribute(
		"data-texture",
		/pnlwise-desktop-(640|1280)\.webp/,
	);
	const deferredBytes = await page.evaluate(() => {
		const first = performance.getEntriesByName("hub-3d-request")[0].startTime;
		return (
			performance.getEntriesByType("resource") as PerformanceResourceTiming[]
		)
			.filter((entry) => entry.name.includes(".js") && entry.startTime >= first)
			.reduce((sum, entry) => sum + entry.encodedBodySize, 0);
	});
	expect(deferredBytes).toBeLessThan(300_000);
	await page.emulateMedia({ reducedMotion: "reduce" });
	await expect(hub).toHaveAttribute("data-state", "fallback");
	await expect(page.locator("canvas")).toHaveCount(0);
	await expect(page.locator(".device-body")).toHaveCSS("opacity", "1");
	await page.evaluate(() => {
		Object.assign(window, { readyDraws: [] as number[] });
		const stage = document.querySelector(
			'[data-scene="device"]',
		) as HTMLElement;
		new MutationObserver(() => {
			if (stage.dataset.state === "ready")
				(window as unknown as { readyDraws: number[] }).readyDraws.push(
					Number(stage.querySelector("canvas")?.dataset.triangles ?? 0),
				);
		}).observe(stage, { attributes: true, attributeFilter: ["data-state"] });
	});
	await page.emulateMedia({ reducedMotion: "no-preference" });
	await expect(device).toHaveAttribute("data-state", "ready", {
		timeout: 15000,
	});
	expect(
		await page.evaluate(() =>
			(window as unknown as { readyDraws: number[] }).readyDraws.every(
				(triangles) => triangles > 0,
			),
		),
	).toBe(true);
	expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});

test("unsupported WebGL never loads a scene and DOM Hub remains operable", async ({
	page,
}) => {
	await page.addInitScript(() => {
		const getContext = HTMLCanvasElement.prototype.getContext;
		HTMLCanvasElement.prototype.getContext = function (
			this: HTMLCanvasElement,
			type: string,
			...args: unknown[]
		) {
			return type.includes("webgl")
				? null
				: Reflect.apply(getContext, this, [type, ...args]);
		} as typeof getContext;
	});
	await page.goto("/en");
	await expect(page.locator('[data-scene="hub"]')).toHaveAttribute(
		"data-quality",
		"fallback",
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
	await expect(page.locator("canvas")).toHaveCount(0);
	await expect(page.locator(".device-body")).toBeVisible();
});

test("reduced motion and reported low-power use the accepted 2D fallback", async ({
	page,
}) => {
	await page.emulateMedia({ reducedMotion: "reduce" });
	await page.goto("/en");
	await expect(page.locator('[data-scene="hub"]')).toHaveAttribute(
		"data-quality",
		"fallback",
	);
	await expect(page.locator("canvas")).toHaveCount(0);
	await page.emulateMedia({ reducedMotion: "no-preference" });
	await page.addInitScript(() =>
		Object.defineProperty(navigator, "hardwareConcurrency", { get: () => 2 }),
	);
	await page.reload();
	await expect(page.locator('[data-scene="hub"]')).toHaveAttribute(
		"data-quality",
		"fallback",
	);
	await expect(page.locator(".hub-products")).toBeVisible();
});

test("context loss restores CSS without breaking project controls", async ({
	page,
}, info) => {
	test.skip(info.project.name !== "desktop");
	await page.goto("/en");
	const stage = page.locator('[data-scene="hub"]');
	await expect(stage).toHaveAttribute("data-state", "ready", {
		timeout: 15000,
	});
	await stage
		.locator("canvas")
		.evaluate((canvas: HTMLCanvasElement) =>
			canvas
				.getContext("webgl2")
				?.getExtension("WEBGL_lose_context")
				?.loseContext(),
		);
	await expect(stage).toHaveAttribute("data-state", "failed");
	await expect(stage.locator("canvas")).toHaveCount(0);
	await page.locator(".hub-products").click();
	await expect(page.locator("#hub-featured")).toBeVisible();
	await page.locator("#hub-featured a").first().focus();
	await page.keyboard.press("Escape");
	await expect(page.locator(".hub-products")).toBeFocused();
});

test("rejected lazy chunks restore CSS and do not crash Home", async ({
	page,
}, info) => {
	test.skip(info.project.name !== "desktop");
	await page.goto("/en");
	await page.route(/\.js$/, (route) => route.abort());
	await expect(page.locator('[data-scene="hub"]')).toHaveAttribute(
		"data-state",
		"failed",
		{ timeout: 15000 },
	);
	await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
	await page.locator(".hub-products").click();
	await expect(page.locator("#hub-featured")).toBeVisible();
});

test("renderer initialization error is contained by the enhancement boundary", async ({
	page,
}, info) => {
	test.skip(info.project.name !== "desktop");
	await page.addInitScript(() => {
		const getContext = HTMLCanvasElement.prototype.getContext;
		let probed = false;
		HTMLCanvasElement.prototype.getContext = function (
			this: HTMLCanvasElement,
			type: string,
			...args: unknown[]
		) {
			if (type.includes("webgl")) {
				if (probed)
					throw new Error("Simulated renderer initialization failure");
				probed = true;
			}
			return Reflect.apply(getContext, this, [type, ...args]);
		} as typeof getContext;
	});
	await page.goto("/en");
	await expect(page.locator('[data-scene="hub"]')).toHaveAttribute(
		"data-state",
		"failed",
		{ timeout: 15000 },
	);
	await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
	await page.locator(".hub-products").click();
	await expect(page.locator("#hub-featured")).toBeVisible();
});

test("visible Hub idle stops rendering after leaving the viewport", async ({
	page,
}, info) => {
	test.skip(info.project.name !== "desktop");
	await page.addInitScript(() => {
		const draw = WebGL2RenderingContext.prototype.drawArrays;
		WebGL2RenderingContext.prototype.drawArrays = function (...args) {
			if (this.canvas instanceof HTMLCanvasElement)
				this.canvas.dataset.qaDraws = String(
					Number(this.canvas.dataset.qaDraws ?? 0) + 1,
				);
			return draw.apply(this, args);
		};
	});
	await page.goto("/en");
	const hub = page.locator('[data-scene="hub"]');
	await expect(hub).toHaveAttribute("data-state", "ready", { timeout: 15000 });
	const canvas = hub.locator("canvas");
	const before = await canvas.getAttribute("data-qa-draws");
	await page.waitForTimeout(250);
	expect(await canvas.getAttribute("data-qa-draws")).not.toBe(before);
	await page.locator("#home-contact").scrollIntoViewIfNeeded();
	await page.waitForTimeout(500);
	const paused = await canvas.getAttribute("data-qa-draws");
	await page.waitForTimeout(250);
	expect(await canvas.getAttribute("data-qa-draws")).toBe(paused);
});

test("a WebGL draw exception restores fallback without an uncaught route error", async ({
	page,
}, info) => {
	test.skip(info.project.name !== "desktop");
	const errors: string[] = [];
	page.on("pageerror", (error) => errors.push(error.message));
	await page.addInitScript(() => {
		WebGL2RenderingContext.prototype.drawArrays = () => {
			throw new Error("Simulated GPU draw failure");
		};
	});
	await page.goto("/en");
	await expect(page.locator('[data-scene="hub"]')).toHaveAttribute(
		"data-state",
		"failed",
		{ timeout: 15000 },
	);
	await page.locator(".hub-products").click();
	await expect(page.locator("#hub-featured")).toBeVisible();
	expect(errors).toEqual([]);
});

test("conservative DPR, resize/orientation and short viewports preserve layout", async ({
	page,
}, info) => {
	test.skip(info.project.name !== "desktop");
	test.setTimeout(90000);
	for (const width of [320, 375, 430, 768, 1024, 1200, 1440, 1920]) {
		await page.setViewportSize({ width, height: 500 });
		await page.goto("/en");
		await page.locator(".product-hub").scrollIntoViewIfNeeded();
		await expect(page.locator('[data-scene="hub"]')).toHaveAttribute(
			"data-state",
			"ready",
			{ timeout: 15000 },
		);
		await page.locator(".device-showcase").scrollIntoViewIfNeeded();
		await expect(page.locator('[data-scene="device"]')).toHaveAttribute(
			"data-state",
			"ready",
			{ timeout: 15000 },
		);
		await expect(page.locator(".work-layout")).toHaveAttribute(
			"data-mode",
			"compact",
		);
		expect(
			await page.evaluate(
				() => document.documentElement.scrollWidth <= innerWidth,
			),
		).toBe(true);
		for (const canvas of await page.locator("canvas").all()) {
			const ratio = await canvas.evaluate(
				(element: HTMLCanvasElement) => element.width / element.clientWidth,
			);
			expect(ratio).toBeLessThanOrEqual(1.51);
		}
	}
	await page.setViewportSize({ width: 375, height: 900 });
	await page.locator(".device-showcase").scrollIntoViewIfNeeded();
	await expect(page.locator(".work-layout")).toHaveAttribute(
		"data-mode",
		"compact",
	);
	expect(
		await page.evaluate(
			() => document.documentElement.scrollWidth <= innerWidth,
		),
	).toBe(true);
});
