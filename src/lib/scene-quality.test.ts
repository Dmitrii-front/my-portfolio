import { describe, expect, it } from "vitest";
import {
	sceneQuality,
	sceneDpr,
	type CapabilitySignals,
} from "./scene-quality";
const capable: CapabilitySignals = {
	webgl: true,
	reducedMotion: false,
	saveData: false,
	cores: 8,
	memory: 8,
	finePointer: true,
	width: 1440,
};
describe("conservative optional scene quality", () => {
	it("caps desktop/mobile DPR and uses standard for unknown hardware", () => {
		expect(sceneQuality(capable)).toBe("high");
		expect(sceneDpr("high")).toBe(1.5);
		expect(sceneQuality({ ...capable, width: 375, finePointer: false })).toBe(
			"standard",
		);
		expect(
			sceneQuality({ ...capable, cores: undefined, memory: undefined }),
		).toBe("standard");
		expect(sceneDpr("standard")).toBe(1);
	});
	it("keeps meaningful fallback for every constraint", () => {
		for (const signal of [
			{ webgl: false },
			{ reducedMotion: true },
			{ saveData: true },
			{ cores: 2 },
			{ memory: 2 },
		]) {
			expect(sceneQuality({ ...capable, ...signal })).toBe("fallback");
		}
	});
});
