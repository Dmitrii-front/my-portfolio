import type { NeonCurve } from "./neon-geometry";

// Exact de Casteljau subdivision: lighting tiles do not approximate/change the path.
// Small filter surfaces can rasterize/cache independently instead of blurring Home.
export function neonGlowTiles(curves: NeonCurve[]) {
	const pieces: NeonCurve[] = [];
	const split = (curve: NeonCurve) => {
		const xs = curve.map((p) => p.x),
			ys = curve.map((p) => p.y);
		if (
			Math.max(...xs) - Math.min(...xs) <= 320 &&
			Math.max(...ys) - Math.min(...ys) <= 320
		) {
			pieces.push(curve);
			return;
		}
		const mid = (a: NeonCurve[number], b: NeonCurve[number]) => ({
			x: (a.x + b.x) / 2,
			y: (a.y + b.y) / 2,
		});
		const [a, b, c, d] = curve;
		const ab = mid(a, b),
			bc = mid(b, c),
			cd = mid(c, d);
		const abc = mid(ab, bc),
			bcd = mid(bc, cd),
			center = mid(abc, bcd);
		split([a, ab, abc, center]);
		split([center, bcd, cd, d]);
	};
	curves.forEach(split);
	return pieces.map(([a, b, c, d]) => {
		const xs = [a.x, b.x, c.x, d.x],
			ys = [a.y, b.y, c.y, d.y];
		return {
			x: Math.min(...xs) - 28,
			y: Math.min(...ys) - 28,
			width: Math.max(...xs) - Math.min(...xs) + 56,
			height: Math.max(...ys) - Math.min(...ys) + 56,
			path: `M${a.x} ${a.y} C${b.x} ${b.y} ${c.x} ${c.y} ${d.x} ${d.y}`,
		};
	});
}
