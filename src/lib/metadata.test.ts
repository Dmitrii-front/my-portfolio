import { afterEach, describe, expect, it, vi } from "vitest";
import { pageMetadata, siteOrigin } from "./metadata";

afterEach(() => vi.unstubAllEnvs());

describe("localized metadata", () => {
	it("uses the configured origin for canonical and reciprocal alternates", () => {
		vi.stubEnv("SITE_URL", "https://portfolio.example");
		const metadata = pageMetadata(
			"ru",
			"/projects/healthy",
			"Healthy",
			"Summary",
		);
		expect(String(metadata.alternates?.canonical)).toBe(
			"https://portfolio.example/ru/projects/healthy",
		);
		expect(metadata.alternates?.languages).toEqual({
			en: "https://portfolio.example/en/projects/healthy",
			ru: "https://portfolio.example/ru/projects/healthy",
			"x-default": "https://portfolio.example/en/projects/healthy",
		});
		expect(metadata.robots).toEqual({ index: false, follow: false });
	});
	it("rejects a site origin that contains a path or unsafe protocol", () => {
		vi.stubEnv("SITE_URL", "https://portfolio.example/something");
		expect(siteOrigin).toThrow();
		vi.stubEnv("SITE_URL", "file:///etc");
		expect(siteOrigin).toThrow();
	});
});
