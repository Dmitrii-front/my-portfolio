import { describe, expect, it } from "vitest";
import {
	localizedPath,
	resolveLocale,
	safePublicPath,
	stripLocale,
} from "./i18n";

describe("locale resolution", () => {
	it("prioritizes a saved explicit choice over browser preferences", () => {
		expect(resolveLocale("en", "ru-RU, en;q=0.8")).toBe("en");
		expect(resolveLocale("ru", "en-US")).toBe("ru");
	});
	it("uses weighted supported browser languages then the primary locale", () => {
		expect(resolveLocale(undefined, "de-DE, ru-RU;q=0.9, en;q=0.8")).toBe("ru");
		expect(resolveLocale("invalid", "ru;q=0.5, en;q=0.9")).toBe("en");
		expect(resolveLocale(undefined, "ru;q=0, en;q=0.3")).toBe("en");
		expect(resolveLocale(undefined, "kg-KG, de;q=0.8")).toBe("en");
		expect(resolveLocale(undefined, "ru;q=invalid")).toBe("en");
		expect(resolveLocale()).toBe("en");
	});
});

describe("public path handling", () => {
	it("preserves project detail paths across locales", () => {
		expect(localizedPath("ru", stripLocale("/en/projects/healthy"))).toBe(
			"/ru/projects/healthy",
		);
		expect(localizedPath("en", stripLocale("/ru"))).toBe("/en");
	});
	it("rejects open redirects, traversal and nonpublic endpoints", () => {
		for (const path of [
			"//evil.example",
			"https://evil.example",
			"/../admin",
			"/admin",
			"/projects/%2e%2e",
			"/projects/x?next=evil",
			"/projects/\\evil",
			null,
		]) {
			expect(safePublicPath(path)).toBe("");
		}
		expect(safePublicPath("/projects/healthy")).toBe("/projects/healthy");
		expect(safePublicPath("/contact")).toBe("/contact");
	});
});
