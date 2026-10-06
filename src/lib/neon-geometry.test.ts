import { describe, expect, it } from "vitest";
import { neonJourney, type NeonCurve } from "./neon-geometry";

function sample([a, b, c, d]: NeonCurve, t: number) {
	const s = 1 - t;
	const position = { x: 0, y: 0 },
		velocity = { x: 0, y: 0 },
		acceleration = { x: 0, y: 0 };
	for (const axis of ["x", "y"] as const) {
		position[axis] =
			s ** 3 * a[axis] +
			3 * s ** 2 * t * b[axis] +
			3 * s * t ** 2 * c[axis] +
			t ** 3 * d[axis];
		velocity[axis] =
			3 * s ** 2 * (b[axis] - a[axis]) +
			6 * s * t * (c[axis] - b[axis]) +
			3 * t ** 2 * (d[axis] - c[axis]);
		acceleration[axis] =
			6 * s * (c[axis] - 2 * b[axis] + a[axis]) +
			6 * t * (d[axis] - 2 * c[axis] + b[axis]);
	}
	const radius =
		Math.hypot(velocity.x, velocity.y) ** 3 /
		Math.abs(velocity.x * acceleration.y - velocity.y * acceleration.x);
	return { position, velocity, acceleration, radius };
}

describe("responsive Neon composition", () => {
	it.each([
		{
			width: 375,
			hub: { x: 187.5, y: 711 },
			device: { x: 187.5, y: 1797 },
			workExit: 2109,
			lab: { x: 120.5, y: 2586 },
			contact: { x: 187.5, y: 3258 },
		},
		{
			width: 768,
			hub: { x: 580, y: 297 },
			device: { x: 564, y: 1177 },
			workExit: 1565,
			lab: { x: 191, y: 2009 },
			contact: { x: 384, y: 2831 },
		},
	])(
		"does not compress desktop waves into compact Work at $width px",
		(anchors) => {
			const { curves } = neonJourney({ ...anchors, expandedWork: false });
			for (const curve of curves)
				for (let i = 1; i < 100; i++) {
					const point = sample(curve, i / 100);
					if (
						point.position.y >= anchors.device.y &&
						point.position.y <= anchors.lab.y
					)
						expect(point.radius).toBeGreaterThan(70);
				}
		},
	);
	it.each([
		[375, "mobile"],
		[1024, "tablet"],
		[1440, "desktop"],
	] as const)(
		"authors broad curvature-continuous curves for %ipx / %s",
		(width, profile) => {
			const {
				path,
				profile: actual,
				curves,
			} = neonJourney({
				width,
				hub: { x: width * 0.65, y: 400 },
				device: { x: width * 0.7, y: 1200 },
				workExit: 2500,
				lab: { x: width * 0.25, y: 2900 },
				contact: { x: width * 0.5, y: 3700 },
			});
			expect(actual).toBe(profile);
			expect(path).not.toMatch(/NaN|Infinity/);
			for (const [index, curve] of curves.entries()) {
				if (index) {
					const incoming = sample(curves[index - 1], 1),
						outgoing = sample(curve, 0);
					for (const axis of ["x", "y"] as const) {
						expect(incoming.position[axis]).toBeCloseTo(
							outgoing.position[axis],
							8,
						);
						expect(incoming.velocity[axis]).toBeCloseTo(
							outgoing.velocity[axis],
							8,
						);
						expect(incoming.acceleration[axis]).toBeCloseTo(
							outgoing.acceleration[axis],
							8,
						);
					}
				}
				for (let i = 0; i <= 100; i++) {
					const point = sample(curve, i / 100);
					expect(point.position.x / width).toBeGreaterThan(0.1);
					expect(point.position.x / width).toBeLessThan(0.9);
					if (point.velocity.y > 0) {
						expect(point.radius).toBeGreaterThan(width * 0.04);
					} else expect(point.velocity.y).toBe(0);
				}
			}
			const xs = curves.flatMap((curve) =>
				Array.from(
					{ length: 101 },
					(_, i) => sample(curve, i / 100).position.x / width,
				),
			);
			expect(Math.max(...xs) - Math.min(...xs)).toBeGreaterThan(0.55);
		},
	);
});
