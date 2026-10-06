"use client";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { neonJourney } from "@/lib/neon-geometry";
import { neonGlowTiles } from "@/lib/neon-glow";

const lightStops = [
	{ offset: 0, color: [167, 139, 250] },
	{ offset: 0.45, color: [122, 167, 255] },
	{ offset: 0.7, color: [103, 217, 176] },
	{ offset: 1, color: [167, 139, 250] },
];

export function NeonPath() {
	const [geometry, setGeometry] = useState({
		width: 100,
		height: 100,
		path: "",
		profile: "mobile",
		tiles: [] as ReturnType<typeof neonGlowTiles>,
		trackTop: 0,
		sceneHeight: 0,
		travel: 0,
	});
	const [sceneHost, setSceneHost] = useState<Element | null>(null);
	const pinned = useRef({ trackTop: 0, sceneHeight: 0, travel: 0 });
	const progress = useRef<SVGPathElement>(null);
	const pulse = useRef<SVGSVGElement>(null);
	const pulseLine = useRef<SVGPathElement>(null);
	const pathLength = useRef(0);
	const refresh = useRef(() => {});
	useEffect(() => {
		const home = document.getElementById("home-composition");
		const hub = document.querySelector(".product-hub");
		const work = document.getElementById("selected-work");
		const lab = document.getElementById("home-lab");
		const contact = document.getElementById("home-contact");
		const layout = document.querySelector(".work-layout");
		const scene = document.querySelector<HTMLElement>(".work-scene");
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
			!scene ||
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
			const pin = pinned.current;
			const cursor = innerHeight * 0.75 - bounds.top;
			const logicalCursor =
				pin.travel && cursor > pin.trackTop
					? cursor < pin.trackTop + pin.sceneHeight + pin.travel
						? pin.trackTop +
							((cursor - pin.trackTop) * pin.sceneHeight) /
								(pin.sceneHeight + pin.travel)
						: cursor - pin.travel
					: cursor;
			const value = reduced.matches
				? 1
				: Math.max(
						0,
						Math.min(1, logicalCursor / (bounds.height - pin.travel)),
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
			const fraction = Math.max(
				0,
				Math.min(1, center.y / (bounds.height - pin.travel)),
			);
			const stopIndex = Math.max(
				1,
				lightStops.findIndex((stop) => stop.offset >= fraction),
			);
			const start = lightStops[stopIndex - 1],
				end = lightStops[stopIndex];
			const mix = (fraction - start.offset) / (end.offset - start.offset);
			const color = start.color.map((channel, i) =>
				Math.round(channel + (end.color[i] - channel) * mix),
			);
			energy.style.setProperty("--energy-color", `rgb(${color.join(" ")})`);
			energy.setAttribute("x", String(center.x - 160));
			energy.setAttribute("y", String(center.y - 160));
			// Long support, fully feathered before its ends. Only blurred light is added;
			// the existing core stays in place, with no separate travelling head.
			const radius = innerWidth < 768 ? 104 : 140;
			energy.querySelector("radialGradient")?.setAttribute("r", String(radius));
			pulseLine.current?.setAttribute(
				"d",
				Array.from({ length: 41 }, (_, index) => {
					const p = line.getPointAtLength(
						Math.max(0, Math.min(length, position + (index - 20) * 10)),
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
				s = scene.getBoundingClientRect(),
				l = track.getBoundingClientRect(),
				c = fan.getBoundingClientRect();
			// Global arc begins behind the upper Hub composition, never at PRODUCTS
			// or as an extension of a local node connector.
			const x = h.left + h.width * 0.62 - bounds.left,
				y = Math.max(0, h.top - bounds.top - 60);
			const dx = p.left + p.width / 2 - bounds.left;
			const sticky = getComputedStyle(scene).position === "sticky";
			const trackTop = v.top - bounds.top;
			const travel = sticky ? Math.max(0, v.height - s.height) : 0;
			pinned.current = { trackTop, sceneHeight: s.height, travel };
			setSceneHost(travel ? scene : null);
			const station = sticky
				? v.top + visual.getBoundingClientRect().top - s.top
				: visual.getBoundingClientRect().top;
			const dy = station - bounds.top + visual.clientHeight * 0.5;
			const exit = w.bottom - bounds.top - travel - 30;
			const lx =
					l.left - bounds.left + l.width * (bounds.width < 768 ? 0.3 : 0.22),
				ly = l.top - bounds.top - travel + l.height * 0.42;
			const cx = c.left + c.width / 2 - bounds.left,
				cy =
					c.top -
					bounds.top +
					parseFloat(getComputedStyle(fan).getPropertyValue("--fan-origin")) -
					travel;
			const journey = neonJourney({
				width: bounds.width,
				hub: { x, y },
				device: { x: dx, y: dy },
				workExit: exit,
				lab: { x: lx, y: ly },
				contact: { x: cx, y: cy },
				expandedWork: sticky,
			});
			setGeometry({
				width: bounds.width,
				height: bounds.height - travel,
				path: journey.path,
				profile: journey.profile,
				tiles: neonGlowTiles(journey.curves),
				trackTop,
				sceneHeight: s.height,
				travel,
			});
			illuminate();
		};
		const observer = new ResizeObserver(measure);
		[
			home,
			hub,
			work,
			lab,
			contact,
			layout,
			scene,
			presentation,
			visual,
			fan,
		].forEach((element) => {
			observer.observe(element);
		});
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
		<>
			<svg
				className="neon-path"
				data-profile={geometry.profile}
				viewBox={`0 0 ${geometry.width} ${geometry.height + geometry.travel}`}
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
						{lightStops.map((stop) => (
							<stop
								key={stop.offset}
								offset={stop.offset}
								stopColor={`rgb(${stop.color.join(" ")})`}
							/>
						))}
					</linearGradient>
					<g id="journey-art">
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
											<feGaussianBlur stdDeviation="9" />
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
											<feGaussianBlur stdDeviation="2.2" />
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
							width="320"
							height="320"
							viewBox="-160 -160 320 320"
						>
							<defs>
								<radialGradient
									id="journey-energy-gain"
									gradientUnits="userSpaceOnUse"
									cx="0"
									cy="0"
									r="140"
								>
									<stop
										offset="0"
										stopColor="var(--energy-color)"
										stopOpacity=".85"
									/>
									<stop
										offset=".3"
										stopColor="var(--energy-color)"
										stopOpacity=".65"
									/>
									<stop
										offset=".65"
										stopColor="var(--energy-color)"
										stopOpacity=".24"
									/>
									<stop
										offset="1"
										stopColor="var(--energy-color)"
										stopOpacity="0"
									/>
								</radialGradient>
								<filter
									id="journey-energy-ambient"
									filterUnits="userSpaceOnUse"
									x="-160"
									y="-160"
									width="320"
									height="320"
									colorInterpolationFilters="sRGB"
								>
									<feGaussianBlur stdDeviation="12" />
								</filter>
								<filter
									id="journey-energy-inner"
									filterUnits="userSpaceOnUse"
									x="-160"
									y="-160"
									width="320"
									height="320"
									colorInterpolationFilters="sRGB"
								>
									<feGaussianBlur stdDeviation="3" />
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
						</svg>
					</g>
				</defs>
				{geometry.travel ? (
					<>
						<svg
							aria-hidden="true"
							width={geometry.width}
							height={geometry.trackTop - 88}
							viewBox={`0 0 ${geometry.width} ${geometry.trackTop - 88}`}
							data-neon-region="before"
						>
							<use href="#journey-art" />
						</svg>
						<svg
							aria-hidden="true"
							y={
								geometry.trackTop + geometry.sceneHeight + 16 + geometry.travel
							}
							width={geometry.width}
							height={
								geometry.height - geometry.trackTop - geometry.sceneHeight - 16
							}
							viewBox={`0 ${geometry.trackTop + geometry.sceneHeight + 16} ${geometry.width} ${geometry.height - geometry.trackTop - geometry.sceneHeight - 16}`}
							data-neon-region="after"
						>
							<use href="#journey-art" />
						</svg>
					</>
				) : (
					<use href="#journey-art" />
				)}
			</svg>
			{sceneHost &&
				createPortal(
					<svg
						className="neon-pinned"
						style={{
							width: geometry.width,
							left: `calc((100% - ${geometry.width}px) / 2)`,
						}}
						aria-hidden="true"
						data-neon-region="pinned"
						viewBox={`0 ${geometry.trackTop - 88} ${geometry.width} ${geometry.sceneHeight + 104}`}
						preserveAspectRatio="none"
					>
						<use href="#journey-art" />
					</svg>,
					sceneHost,
				)}
		</>
	);
}
