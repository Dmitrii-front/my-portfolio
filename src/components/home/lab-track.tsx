"use client";
import { useEffect, useRef } from "react";
import { interactionCopy, labExperiments } from "@/lib/home-content";
import type { SiteLocale } from "@/lib/site-config";
export function LabTrack({ locale }: { locale: SiteLocale }) {
	const track = useRef<HTMLElement>(null);
	const copy = interactionCopy[locale];
	function move(direction: number) {
		const element = track.current;
		if (element)
			element.scrollBy({
				left: direction * element.clientWidth * 0.75,
				behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
					? "auto"
					: "smooth",
			});
	}
	useEffect(() => {
		const element = track.current;
		if (!element) return;
		const wheel = (event: WheelEvent) => {
			if (
				Math.abs(event.deltaX) >= Math.abs(event.deltaY) ||
				!matchMedia("(pointer: fine)").matches
			)
				return;
			if (
				(event.deltaY > 0 &&
					element.scrollLeft + element.clientWidth < element.scrollWidth - 2) ||
				(event.deltaY < 0 && element.scrollLeft > 2)
			) {
				element.scrollLeft += event.deltaY;
				event.preventDefault();
			}
		};
		element.addEventListener("wheel", wheel, { passive: false });
		return () => element.removeEventListener("wheel", wheel);
	}, []);
	return (
		<div className="lab-browser">
			{/* A focusable scroll region allows native keyboard scrolling without JS. */}
			<section
				className="lab-track"
				ref={track}
				// biome-ignore lint/a11y/noNoninteractiveTabindex: keyboard access to an overflow region
				tabIndex={0}
				aria-label="Lab"
				onKeyDown={(event) => {
					if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
						event.preventDefault();
						move(event.key === "ArrowRight" ? 1 : -1);
					}
				}}
			>
				{labExperiments.map((experiment) => (
					<article className="lab-card" key={experiment.id}>
						<span className="lab-mark" aria-hidden="true">
							{experiment.mark}
						</span>
						<p className="eyebrow">{copy.labConcept}</p>
						<h3>{experiment.title}</h3>
						<p>{experiment.description[locale]}</p>
					</article>
				))}
			</section>
			<div className="lab-controls">
				<button
					type="button"
					className="icon-button"
					aria-label={copy.labPrevious}
					onClick={() => move(-1)}
				>
					←
				</button>
				<button
					type="button"
					className="icon-button"
					aria-label={copy.labNext}
					onClick={() => move(1)}
				>
					→
				</button>
			</div>
		</div>
	);
}
