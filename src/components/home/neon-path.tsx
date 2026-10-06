"use client";
import { useEffect, useRef, useState } from "react";

export function NeonPath() {
	const [geometry, setGeometry] = useState({
		width: 100,
		height: 100,
		path: "",
		occlusions: [] as { x: number; y: number; width: number; height: number }[],
	});
	const progress = useRef<SVGPathElement>(null);
	useEffect(() => {
		const home = document.getElementById("home-composition");
		const hub = document.querySelector(".hub-products");
		const work = document.getElementById("selected-work");
		const lab = document.getElementById("home-lab");
		const contact = document.getElementById("home-contact");
		const layout = document.querySelector(".work-layout");
		const presentation = document.querySelector(".work-presentation");
		const visual = document.querySelector<HTMLElement>(".device-showcase");
		const track = document.querySelector(".lab-track");
		const fan = document.querySelector<HTMLElement>(".contact-fan");
		if (
			!home ||
			!hub ||
			!work ||
			!lab ||
			!contact ||
			!layout ||
			!presentation ||
			!visual ||
			!track ||
			!fan
		)
			return;
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
				p = presentation.getBoundingClientRect(),
				v = layout.getBoundingClientRect(),
				l = track.getBoundingClientRect(),
				c = fan.getBoundingClientRect();
			const x = h.left + h.width / 2 - bounds.left,
				y = h.bottom - bounds.top;
			const dx = p.left + p.width / 2 - bounds.left;
			// Anchor the journey to the scene's document station, not its moving sticky box.
			const sticky = getComputedStyle(presentation).position === "sticky";
			const station = sticky
				? v.top + visual.offsetTop
				: visual.getBoundingClientRect().top;
			const dy = station - bounds.top + visual.clientHeight * 0.62;
			const exit = w.bottom - bounds.top - 30;
			const lx = l.left - bounds.left + l.width * 0.28,
				ly = l.top - bounds.top + l.height * 0.42;
			const cx = c.left + c.width / 2 - bounds.left,
				cy =
					c.top -
					bounds.top +
					parseFloat(getComputedStyle(fan).getPropertyValue("--fan-origin"));
			const occlusions = Array.from(
				home.querySelectorAll(
					".hero-copy, .hub-context, .section-heading, .work-narratives, #contact-title",
				),
			).map((element) => {
				const r = element.getBoundingClientRect();
				return {
					x: r.left - bounds.left - 6,
					y: r.top - bounds.top - 6,
					width: r.width + 12,
					height: r.height + 12,
				};
			});
			setGeometry({
				width: bounds.width,
				height: bounds.height,
				path: `M${x} ${y} C${x} ${y + 90} ${dx + p.width * 0.22} ${dy - 160} ${dx} ${dy} C${dx - p.width * 0.18} ${dy + 140} ${dx + p.width * 0.12} ${exit - 100} ${dx} ${exit} C${dx} ${exit + 80} ${lx} ${ly - 120} ${lx} ${ly} C${lx} ${ly + 160} ${cx} ${cy - 160} ${cx} ${cy}`,
				occlusions,
			});
			illuminate();
		};
		const observer = new ResizeObserver(measure);
		[home, hub, work, lab, contact, layout, visual, fan].forEach((element) => {
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
				<mask
					id="journey-occlusion"
					maskUnits="userSpaceOnUse"
					x="0"
					y="0"
					width={geometry.width}
					height={geometry.height}
				>
					<rect width={geometry.width} height={geometry.height} fill="white" />
					{geometry.occlusions.map((rect) => (
						<rect key={`${rect.x}-${rect.y}`} {...rect} fill="black" />
					))}
				</mask>
				<linearGradient id="journey-light" x1="0" y1="0" x2="0" y2="1">
					<stop offset="0" stopColor="#a78bfa" />
					<stop offset=".45" stopColor="#7aa7ff" />
					<stop offset=".7" stopColor="#67d9b0" />
					<stop offset="1" stopColor="#a78bfa" />
				</linearGradient>
			</defs>
			<g mask="url(#journey-occlusion)">
				<path d={geometry.path} className="neon-track" />
				<path
					d={geometry.path}
					ref={progress}
					className="neon-progress"
					pathLength="1"
					strokeDasharray="1"
					strokeDashoffset="1"
				/>
			</g>
		</svg>
	);
}
