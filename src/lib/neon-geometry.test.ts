import { describe, expect, it } from "vitest";
import { neonJourney } from "./neon-geometry";

describe("responsive Neon composition", () => {
	it.each([
		[375, "mobile"],
		[1024, "tablet"],
		[1440, "desktop"],
	] as const)("authors broad smooth curves for %ipx / %s", (width, profile) => {
		const { path, profile: actual } = neonJourney({
			width,
			hub: { x: width * 0.65, y: 400 },
			device: { x: width * 0.7, y: 1200 },
			workExit: 2500,
			lab: { x: width * 0.25, y: 2900 },
			contact: { x: width * 0.5, y: 3700 },
		});
		expect(actual).toBe(profile);
		expect(path).not.toMatch(/NaN|Infinity/);
		const segments = path
			.split(" C")
			.slice(1)
			.map((segment) => segment.split(" ").map(Number));
		let previous = [width * 0.65, 400];
		for (const [index, segment] of segments.entries()) {
			const [x1, y1, x2, y2, x, y] = segment;
			expect(y1).toBeGreaterThan(previous[1]);
			expect(y2).toBeGreaterThan(y1);
			expect(y).toBeGreaterThan(y2);
			for (const value of [x1, x2, x])
				expect(value / width).toBeGreaterThan(0.1);
			for (const value of [x1, x2, x]) expect(value / width).toBeLessThan(0.9);
			if (index) {
				const before = segments[index - 1];
				// Identical incoming/outgoing tangent vectors: no sharp joins.
				expect(x1 - previous[0]).toBeCloseTo(previous[0] - before[2]);
				expect(y1 - previous[1]).toBeCloseTo(previous[1] - before[3]);
			}
			previous = [x, y];
		}
		const xs = segments.map((segment) => segment[4] / width);
		expect(Math.max(...xs) - Math.min(...xs)).toBeGreaterThan(0.55);
	});
});
