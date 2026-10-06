"use client";
import { useEffect, useRef, useState } from "react";

export function NeonPath() {
	const [geometry, setGeometry] = useState({
		width: 100,
		height: 100,
		path: "",
	});
	const progress = useRef<SVGPathElement>(null);
	useEffect(() => {
		const home = document.getElementById("home-composition");
		const hub = document.querySelector(".hub-products");
		const work = document.getElementById("selected-work");
		const lab = document.getElementById("home-lab");
		const contact = document.getElementById("home-contact");
		if (!home || !hub || !work || !lab || !contact) return;
		const reduced = matchMedia("(prefers-reduced-motion: reduce)");
		let frame = 0;
		const illuminate = () => {
			frame = 0;
			const bounds = home.getBoundingClientRect();
			const value = reduced.matches
				? 1
				: Math.max(
						0,
						Math.min(1, (innerHeight * 0.75 - bounds.top) / bounds.height),
					);
			progress.current?.style.setProperty(
				"stroke-dashoffset",
				String(1 - value),
			);
		};
		const measure = () => {
			const bounds = home.getBoundingClientRect(),
				h = hub.getBoundingClientRect(),
				w = work.getBoundingClientRect(),
				l = lab.getBoundingClientRect(),
				c = contact.getBoundingClientRect();
			const lane = bounds.width - Math.min(28, bounds.width * 0.035),
				x = h.left + h.width / 2 - bounds.left,
				y = h.bottom - bounds.top;
			const wy = w.top - bounds.top,
				ly = l.top - bounds.top,
				cy = c.top - bounds.top + c.height * 0.6;
			setGeometry({
				width: bounds.width,
				height: bounds.height,
				path: `M${x} ${y} C${x} ${y + 90} ${lane} ${wy - 90} ${lane} ${wy + 80} S${lane - 28} ${ly - 70} ${lane} ${ly + 50} S${lane} ${cy - 70} ${lane - 45} ${cy}`,
			});
			illuminate();
		};
		const observer = new ResizeObserver(measure);
		[home, hub, work, lab, contact].forEach((element) => {
			observer.observe(element);
		});
		const scroll = () => {
			if (!frame) frame = requestAnimationFrame(illuminate);
		};
		window.addEventListener("scroll", scroll, { passive: true });
		reduced.addEventListener("change", illuminate);
		measure();
		return () => {
			observer.disconnect();
			cancelAnimationFrame(frame);
			window.removeEventListener("scroll", scroll);
			reduced.removeEventListener("change", illuminate);
		};
	}, []);
	return (
		<svg
			className="neon-path"
			viewBox={`0 0 ${geometry.width} ${geometry.height}`}
			preserveAspectRatio="none"
			aria-hidden="true"
		>
			<defs>
				<linearGradient id="journey-light" x1="0" y1="0" x2="0" y2="1">
					<stop offset="0" stopColor="#a78bfa" />
					<stop offset=".45" stopColor="#7aa7ff" />
					<stop offset=".7" stopColor="#67d9b0" />
					<stop offset="1" stopColor="#a78bfa" />
				</linearGradient>
			</defs>
			<path d={geometry.path} className="neon-track" />
			<path
				d={geometry.path}
				ref={progress}
				className="neon-progress"
				pathLength="1"
				strokeDasharray="1"
				strokeDashoffset="1"
			/>
		</svg>
	);
}
