import { describe, expect, it } from "vitest";
import {
	defaultDevice,
	interactionCopy,
	labExperiments,
	wrapProject,
} from "./home-content";
describe("Home interaction records", () => {
	it("uses viewport-appropriate default devices", () => {
		expect([320, 767, 768, 1199, 1200, 1920].map(defaultDevice)).toEqual([
			"iPhone",
			"iPhone",
			"iPad",
			"iPad",
			"MacBook",
			"MacBook",
		]);
	});
	it("wraps native project controls", () => {
		expect(wrapProject(-1, 3)).toBe(2);
		expect(wrapProject(3, 3)).toBe(0);
	});
	it("keeps temporary concepts ordered, unique and localized", () => {
		expect(new Set(labExperiments.map((item) => item.id)).size).toBe(4);
		for (const item of labExperiments) {
			expect(item.description.en).toBeTruthy();
			expect(item.description.ru).toBeTruthy();
		}
		expect(Object.keys(interactionCopy.en)).toEqual(
			Object.keys(interactionCopy.ru),
		);
	});
});
