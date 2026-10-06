"use client";
import { useEffect, useRef, useState } from "react";
import { neonJourney } from "@/lib/neon-geometry";
import { neonGlowTiles } from "@/lib/neon-glow";

export function NeonPath() {
	const [geometry, setGeometry] = useState({
		width: 100,
		height: 100,
		path: "",
		profile: "mobile",
		tiles: [] as ReturnType<typeof neonGlowTiles>,
	});
	const progress = useRef<SVGPathElement>(null);
	const pulse = useRef<SVGSVGElement>(null);
	const pulseLine = useRef<SVGPathElement>(null);
	const pathLength = useRef(0);
	const refresh = useRef(() => {});
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
			const line = progress.current,
				energy = pulse.current,
				length = pathLength.current;
			if (!line || !energy || !length) return;
			energy.style.opacity =
				reduced.matches || value <= 0 || value >= 1 ? "0" : "1";
			if (reduced.matches) return;
			const position = value * length;
			const center = line.getPointAtLength(position);
			energy.setAttribute("x", String(center.x - 48));
			energy.setAttribute("y", String(center.y - 48));
			pulseLine.current?.setAttribute(
				"d",
				Array.from({ length: 9 }, (_, index) => {
					const p = line.getPointAtLength(
						Math.max(0, Math.min(length, position + (index - 4) * 6)),
					);
					return `${index ? "L" : "M"}${p.x - center.x} ${p.y - center.y}`;
				}).join(" "),
			);
		};
		refresh.current = illuminate;
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
			const dy = station - bounds.top + visual.clientHeight * 0.5;
			const exit = w.bottom - bounds.top - 30;
			const lx =
					l.left - bounds.left + l.width * (bounds.width < 768 ? 0.3 : 0.22),
				ly = l.top - bounds.top + l.height * 0.42;
			const cx = c.left + c.width / 2 - bounds.left,
				cy =
					c.top -
					bounds.top +
					parseFloat(getComputedStyle(fan).getPropertyValue("--fan-origin"));
			const journey = neonJourney({
				width: bounds.width,
				hub: { x, y },
				device: { x: dx, y: dy },
				workExit: exit,
				lab: { x: lx, y: ly },
				contact: { x: cx, y: cy },
			});
			setGeometry({
				width: bounds.width,
				height: bounds.height,
				path: journey.path,
				profile: journey.profile,
				tiles: neonGlowTiles(journey.curves),
			});
			illuminate();
		};
		const observer = new ResizeObserver(measure);
		[home, hub, work, lab, contact, layout, presentation, visual, fan].forEach(
			(element) => {
				observer.observe(element);
			},
		);
		const scroll = () => {
			if (!frame) frame = requestAnimationFrame(illuminate);
		};
		window.addEventListener("scroll", scroll, { passive: true });
		reduced.addEventListener("change", illuminate);
		measure();
		return () => {
			refresh.current = () => {};
			observer.disconnect();
			cancelAnimationFrame(frame);
			window.removeEventListener("scroll", scroll);
			reduced.removeEventListener("change", illuminate);
		};
	}, []);
	useEffect(() => {
		// React has committed the resized path before reading its new length.
		// Refresh locally; never dispatch a synthetic scroll into project-selection logic.
		pathLength.current = geometry.path
			? (progress.current?.getTotalLength() ?? 0)
			: 0;
		refresh.current();
	}, [geometry.path]);
	return (
		<svg
			className="neon-path"
			data-profile={geometry.profile}
			viewBox={`0 0 ${geometry.width} ${geometry.height}`}
			preserveAspectRatio="none"
			aria-hidden="true"
		>
			<defs>
				<linearGradient
					id="journey-light"
					gradientUnits="userSpaceOnUse"
					x1="0"
					y1="0"
					x2="0"
					y2={geometry.height}
				>
					<stop offset="0" stopColor="#a78bfa" />
					<stop offset=".45" stopColor="#7aa7ff" />
					<stop offset=".7" stopColor="#67d9b0" />
					<stop offset="1" stopColor="#a78bfa" />
				</linearGradient>
			</defs>
			{/* Only actual opaque foreground pixels occlude. Layout/scroll/canvas boxes do not. */}
			<g className="neon-halos">
				{geometry.tiles.map((tile, index) => (
					<svg
						aria-hidden="true"
						key={tile.path}
						className="neon-glow-tile"
						x={tile.x}
						y={tile.y}
						width={tile.width}
						height={tile.height}
						viewBox={`${tile.x} ${tile.y} ${tile.width} ${tile.height}`}
					>
						<defs>
							<filter
								id={`journey-ambient-${index}`}
								filterUnits="userSpaceOnUse"
								x={tile.x}
								y={tile.y}
								width={tile.width}
								height={tile.height}
								colorInterpolationFilters="sRGB"
							>
								<feGaussianBlur stdDeviation="6" />
							</filter>
							<filter
								id={`journey-inner-${index}`}
								filterUnits="userSpaceOnUse"
								x={tile.x}
								y={tile.y}
								width={tile.width}
								height={tile.height}
								colorInterpolationFilters="sRGB"
							>
								<feGaussianBlur stdDeviation="1.6" />
							</filter>
						</defs>
						<path
							d={tile.path}
							className="neon-ambient"
							filter={`url(#journey-ambient-${index})`}
						/>
						<path
							d={tile.path}
							className="neon-inner"
							filter={`url(#journey-inner-${index})`}
						/>
					</svg>
				))}
			</g>
			<g>
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
			<svg
				ref={pulse}
				aria-hidden="true"
				className="neon-energy"
				width="96"
				height="96"
				viewBox="-48 -48 96 96"
			>
				<defs>
					<filter
						id="journey-energy-ambient"
						filterUnits="userSpaceOnUse"
						x="-48"
						y="-48"
						width="96"
						height="96"
						colorInterpolationFilters="sRGB"
					>
						<feGaussianBlur stdDeviation="7" />
					</filter>
					<filter
						id="journey-energy-inner"
						filterUnits="userSpaceOnUse"
						x="-48"
						y="-48"
						width="96"
						height="96"
						colorInterpolationFilters="sRGB"
					>
						<feGaussianBlur stdDeviation="2" />
					</filter>
				</defs>
				<path ref={pulseLine} id="journey-energy-line" />
				<use
					href="#journey-energy-line"
					className="neon-energy-ambient"
					filter="url(#journey-energy-ambient)"
				/>
				<use
					href="#journey-energy-line"
					className="neon-energy-inner"
					filter="url(#journey-energy-inner)"
				/>
				<use href="#journey-energy-line" className="neon-energy-core" />
				<circle r="1" fill="#ddd5fa" fillOpacity=".8" />
			</svg>
		</svg>
	);
}
