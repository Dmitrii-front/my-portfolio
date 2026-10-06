import { expect, it } from "vitest";
import { workProject, workStation } from "./work-progress";

it("clamps native travel and switches equally in either scroll direction", () => {
	expect(
		[-1, 0, 0.32, 0.34, 0.66, 0.67, 1, 2].map((p) => workProject(p, 3)),
	).toEqual([0, 0, 0, 1, 1, 2, 2, 2]);
	for (const index of [2, 1, 0])
		expect(workProject(workStation(index, 3), 3)).toBe(index);
});
