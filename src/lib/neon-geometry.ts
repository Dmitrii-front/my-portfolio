type Point = { x: number; y: number };
export type NeonCurve = [Point, Point, Point, Point];
type JourneyAnchors = {
	width: number;
	hub: Point;
	device: Point;
	workExit: number;
	lab: Point;
	contact: Point;
	expandedWork?: boolean;
};

// Independently composed waypoints, not one desktop path scaled down.
export function neonJourney({
	width,
	hub,
	device,
	workExit,
	lab,
	contact,
	expandedWork = width >= 1024,
}: JourneyAnchors) {
	const before = device.y - hub.y;
	const work = workExit - device.y;
	const after = contact.y - lab.y;
	const profile = width < 768 ? "mobile" : width < 1200 ? "tablet" : "desktop";
	let points: Point[];
	if (profile === "mobile") {
		points = [
			hub,
			{ x: width * 0.84, y: hub.y + before * 0.25 },
			{ x: width * 0.13, y: hub.y + before * 0.58 },
			device,
			{ x: width * 0.8, y: device.y + (lab.y - device.y) * 0.33 },
			lab,
			{ x: width * 0.74, y: lab.y + after * 0.35 },
			{ x: width * 0.22, y: lab.y + after * 0.74 },
			contact,
		];
	} else if (profile === "tablet") {
		points = [
			hub,
			{ x: width * 0.4, y: hub.y + before * 0.32 },
			{ x: width * 0.87, y: hub.y + before * 0.66 },
			device,
			// Compact Work has one narrative, not the desktop three-step scroll track.
			...(!expandedWork
				? [{ x: width * 0.85, y: device.y + (lab.y - device.y) * 0.32 }]
				: [
						{ x: width * 0.87, y: device.y + work * 0.2 },
						{ x: width * 0.4, y: device.y + work * 0.59 },
						{ x: width * 0.74, y: device.y + work * 0.92 },
					]),
			lab,
			{ x: width * 0.73, y: lab.y + after * 0.4 },
			{ x: width * 0.29, y: lab.y + after * 0.74 },
			contact,
		];
	} else {
		points = [
			hub,
			{ x: width * 0.38, y: hub.y + before * 0.38 },
			device,
			...(expandedWork
				? [
						{ x: width * 0.88, y: device.y + work * 0.22 },
						{ x: width * 0.46, y: device.y + work * 0.59 },
						{ x: width * 0.78, y: device.y + work * 0.93 },
					]
				: [{ x: width * 0.85, y: device.y + (lab.y - device.y) * 0.32 }]),
			lab,
			{ x: width * 0.7, y: lab.y + after * 0.4 },
			{ x: width * 0.36, y: lab.y + after * 0.8 },
			contact,
		];
	}
	// Paired control stations start each turn early and keep it spread over a broad
	// vertical interval. A uniform cubic B-spline has shared first AND second
	// derivatives at every join; its convex hull prevents lateral overshoot.
	const controls: Point[] = [hub, hub, hub];
	points.slice(1, -1).forEach((point, i) => {
		const index = i + 1;
		const reach =
			Math.min(point.y - points[index - 1].y, points[index + 1].y - point.y) *
			0.48;
		controls.push(
			{ x: point.x, y: point.y - reach },
			{ x: point.x, y: point.y + reach },
		);
	});
	controls.push(contact, contact, contact);
	const blend = (a: Point, b: Point, c: Point) => ({
		x: (a.x + 4 * b.x + c.x) / 6,
		y: (a.y + 4 * b.y + c.y) / 6,
	});
	const curves: NeonCurve[] = controls.slice(0, -3).map((a, i) => {
		const b = controls[i + 1],
			c = controls[i + 2],
			d = controls[i + 3];
		return [
			blend(a, b, c),
			{ x: (2 * b.x + c.x) / 3, y: (2 * b.y + c.y) / 3 },
			{ x: (b.x + 2 * c.x) / 3, y: (b.y + 2 * c.y) / 3 },
			blend(b, c, d),
		];
	});
	const path = curves.reduce(
		(path, [, a, b, point]) =>
			`${path} C${a.x} ${a.y} ${b.x} ${b.y} ${point.x} ${point.y}`,
		`M${hub.x} ${hub.y}`,
	);
	return { path, profile, curves };
}
