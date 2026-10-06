// Native CSS-sticky travel, divided into equal project dwell intervals.
export function workProject(progress: number, count: number) {
	return Math.max(0, Math.min(count - 1, Math.floor(progress * count)));
}

export function workStation(index: number, count: number) {
	return (index + 0.5) / count;
}
