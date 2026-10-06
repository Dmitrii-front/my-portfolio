import { describe, expect, it } from "vitest";
import { neonGlowTiles } from "./neon-glow";
import { neonJourney, type NeonCurve } from "./neon-geometry";

describe("localized Neon light", () => {
	const curve: NeonCurve = [
		{ x: 20, y: 100 },
		{ x: 800, y: 400 },
		{ x: 0, y: 1100 },
		{ x: 400, y: 1400 },
	];
	it("bounds every filter surface and preserves connected exact curve endpoints", () => {
		const tiles = neonGlowTiles([curve]);
		expect(tiles.length).toBeGreaterThan(1);
		let previous = [20, 100];
		for (const tile of tiles) {
			expect(tile.width).toBeLessThanOrEqual(364);
			expect(tile.height).toBeLessThanOrEqual(364);
			const [x, y, ...values] =
				tile.path.match(/-?\d+(?:\.\d+)?/g)?.map(Number) ?? [];
			expect([x, y]).toEqual(previous);
			previous = values.slice(-2);
		}
		expect(previous).toEqual([400, 1400]);
	});
	it.each([375, 768, 1024, 1440, 1920])(
		"keeps %ipx journey light local, not page-sized",
		(width) => {
			const { curves } = neonJourney({
				width,
				hub: { x: width * 0.65, y: 400 },
				device: { x: width * 0.7, y: 1200 },
				workExit: 2500,
				lab: { x: width * 0.25, y: 2900 },
				contact: { x: width * 0.5, y: 3700 },
			});
			const tiles = neonGlowTiles(curves);
			expect(tiles.length).toBeLessThan(80);
			for (const tile of tiles) {
				expect(tile.width).toBeLessThanOrEqual(364);
				expect(tile.height).toBeLessThanOrEqual(364);
			}
		},
	);
});
