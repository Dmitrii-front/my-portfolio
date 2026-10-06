type Point = { x: number; y: number };
export type NeonCurve = [Point, Point, Point, Point];
type JourneyAnchors = {
	width: number;
	hub: Point;
	device: Point;
	workExit: number;
	lab: Point;
	contact: Point;
};

// Independently composed waypoints, not one desktop path scaled down.
export function neonJourney({
	width,
	hub,
	device,
	workExit,
	lab,
	contact,
}: JourneyAnchors) {
	const before = device.y - hub.y;
	const work = workExit - device.y;
	const after = contact.y - lab.y;
	const profile = width < 768 ? "mobile" : width < 1200 ? "tablet" : "desktop";
	let points: Point[];
	if (profile === "mobile") {
		points = [
			hub,
			{ x: width * 0.8, y: hub.y + before * 0.25 },
			{ x: width * 0.18, y: hub.y + before * 0.58 },
			device,
			{ x: width * 0.79, y: device.y + work * 0.45 },
			{ x: width * 0.28, y: workExit },
			{ x: width * 0.76, y: workExit + (lab.y - workExit) * 0.5 },
			lab,
			{ x: width * 0.8, y: lab.y + after * 0.38 },
			{ x: width * 0.18, y: lab.y + after * 0.72 },
			contact,
		];
	} else if (profile === "tablet") {
		points = [
			hub,
			{ x: width * 0.4, y: hub.y + before * 0.32 },
			{ x: width * 0.83, y: hub.y + before * 0.66 },
			device,
			{ x: width * 0.83, y: device.y + work * 0.21 },
			{ x: width * 0.42, y: device.y + work * 0.6 },
			{ x: width * 0.78, y: workExit },
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
			{ x: width * 0.85, y: device.y + work * 0.24 },
			{ x: width * 0.48, y: device.y + work * 0.62 },
			{ x: width * 0.75, y: workExit },
			lab,
			{ x: width * 0.76, y: lab.y + after * 0.42 },
			{ x: width * 0.32, y: lab.y + after * 0.76 },
			contact,
		];
	}
	// Shared tangents keep joins smooth; bounded handles keep Y monotonic.
	const tangents = points.map((point, index) => {
		const previous = points[index - 1] ?? point;
		const next = points[index + 1] ?? point;
		const y =
			Math.min(
				index ? point.y - previous.y : next.y - point.y,
				index < points.length - 1 ? next.y - point.y : point.y - previous.y,
			) * 0.4;
		return { x: ((next.x - previous.x) / (next.y - previous.y)) * y, y };
	});
	const curves: NeonCurve[] = points.slice(1).map((point, index) => {
		const previous = points[index],
			a = tangents[index],
			b = tangents[index + 1];
		return [
			previous,
			{ x: previous.x + a.x, y: previous.y + a.y },
			{ x: point.x - b.x, y: point.y - b.y },
			point,
		];
	});
	const path = curves.reduce(
		(path, [, a, b, point]) =>
			`${path} C${a.x} ${a.y} ${b.x} ${b.y} ${point.x} ${point.y}`,
		`M${hub.x} ${hub.y}`,
	);
	return { path, profile, curves };
}
