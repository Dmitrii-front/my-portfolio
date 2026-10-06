"use client";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/lib/dictionaries";
import {
	defaultDevice,
	projectSelectionEvent,
	interactionCopy,
	wrapProject,
	type ShowcaseDevice,
} from "@/lib/home-content";
import { localizedPath } from "@/lib/i18n";
import { projects } from "@/lib/projects";
import {
	availableProjectDevices,
	resolveProjectDevice,
} from "@/lib/project-screens";
import type { SiteLocale } from "@/lib/site-config";
import { workProject, workStation } from "@/lib/work-progress";
import { Container } from "@/components/ui/container";
import { Arrow } from "@/components/ui/arrow";
import { DeviceShowcase } from "./device-showcase";
export function SelectedWork({
	locale,
	dictionary,
}: {
	locale: SiteLocale;
	dictionary: Dictionary;
}) {
	const [active, setActive] = useState(0);
	const [preferredDevice, setPreferredDevice] =
		useState<ShowcaseDevice>("MacBook");
	const availableDevices = availableProjectDevices(projects[active].slug);
	const device = resolveProjectDevice(projects[active].slug, preferredDevice);
	const [mode, setMode] = useState<"static" | "compact" | "sticky">("static");
	const steps = useRef<(HTMLElement | null)[]>([]);
	const root = useRef<HTMLDivElement>(null);
	const scene = useRef<HTMLDivElement>(null);
	const start = useRef<{ x: number; y: number } | null>(null);
	const copy = dictionary.home,
		interaction = interactionCopy[locale];
	const scrollToProject = useCallback((index: number) => {
		if (!root.current || !scene.current) return;
		const bounds = root.current.getBoundingClientRect();
		const top = parseFloat(getComputedStyle(scene.current).top);
		const travel = bounds.height - scene.current.offsetHeight;
		// Direct controls land in the middle of their native-scroll dwell interval.
		window.scrollTo({
			top:
				scrollY +
				bounds.top -
				top +
				travel * workStation(index, projects.length),
			behavior: "instant",
		});
	}, []);
	useEffect(() => {
		const media = matchMedia("(min-width: 1024px) and (min-height: 900px)");
		const updateMode = () => setMode(media.matches ? "sticky" : "compact");
		setPreferredDevice(defaultDevice(window.innerWidth));
		updateMode();
		media.addEventListener("change", updateMode);
		const selectTarget = (slug: string) => {
			const index = projects.findIndex((project) => project.slug === slug);
			if (index >= 0) {
				setActive(index);
				requestAnimationFrame(() => {
					if (media.matches) scrollToProject(index);
					else root.current?.scrollIntoView({ block: "center" });
					steps.current[index]?.focus({ preventScroll: true });
				});
			}
		};
		const fromHash = () => selectTarget(location.hash.replace("#work-", ""));
		const fromHub = (event: Event) => {
			if (event instanceof CustomEvent && typeof event.detail === "string")
				selectTarget(event.detail);
		};
		fromHash();
		window.addEventListener("hashchange", fromHash);
		window.addEventListener(projectSelectionEvent, fromHub);
		return () => {
			media.removeEventListener("change", updateMode);
			window.removeEventListener("hashchange", fromHash);
			window.removeEventListener(projectSelectionEvent, fromHub);
		};
	}, [scrollToProject]);
	useEffect(() => {
		if (mode !== "sticky") return;
		let frame = 0;
		const update = () => {
			frame = 0;
			const bounds = root.current?.getBoundingClientRect();
			if (
				!bounds ||
				bounds.top > innerHeight * 0.7 ||
				bounds.bottom < innerHeight * 0.3
			)
				return;
			const top = parseFloat(getComputedStyle(scene.current as Element).top);
			const travel = bounds.height - (scene.current?.offsetHeight ?? 0);
			if (travel > 0)
				setActive(workProject((top - bounds.top) / travel, projects.length));
		};
		const onScroll = () => {
			if (!frame) frame = requestAnimationFrame(update);
		};
		window.addEventListener("scroll", onScroll, { passive: true });
		window.addEventListener("resize", onScroll);
		onScroll();
		return () => {
			cancelAnimationFrame(frame);
			window.removeEventListener("scroll", onScroll);
			window.removeEventListener("resize", onScroll);
		};
	}, [mode]);
	function select(index: number) {
		const next = wrapProject(index, projects.length);
		setActive(next);
		if (mode === "sticky") scrollToProject(next);
	}
	return (
		<section
			className="section selected-work"
			id="selected-work"
			aria-labelledby="work-title"
		>
			<Container>
				<div
					className="work-layout"
					ref={root}
					data-mode={mode}
					data-active-project={projects[active].slug}
				>
					<div className="work-scene" ref={scene}>
						<div className="section-heading">
							<div>
								<p className="eyebrow">{copy.workLabel}</p>
								<h2 id="work-title">{copy.workTitle}</h2>
								<p className="lede">{copy.workDescription}</p>
							</div>
							<Link
								href={localizedPath(locale, "/projects")}
								className="text-link"
							>
								{copy.allWork}
								<Arrow />
							</Link>
						</div>
						<div className="work-columns">
							<div className="work-narratives">
								{projects.map((project, index) => (
									<article
										className="work-step"
										id={`work-${project.slug}`}
										key={project.slug}
										tabIndex={-1}
										hidden={mode !== "static" && index !== active}
										data-active={index === active}
										ref={(element) => {
											steps.current[index] = element;
										}}
										aria-labelledby={`title-${project.slug}`}
									>
										<p className="eyebrow">
											<span className="work-index">0{index + 1}</span> /{" "}
											{project.category}
										</p>
										<h3 id={`title-${project.slug}`}>{project.title}</h3>
										<p className="work-description">
											{dictionary.projects[project.slug]}
										</p>
										<Link
											href={localizedPath(locale, `/projects/${project.slug}`)}
											className="text-link"
										>
											{copy.caseStudy}
											<Arrow diagonal />
										</Link>
									</article>
								))}
							</div>
							<div
								className="work-presentation"
								onPointerDown={(event) => {
									if (event.pointerType === "touch" && mode === "compact")
										start.current = { x: event.clientX, y: event.clientY };
								}}
								onPointerUp={(event) => {
									if (!start.current) return;
									const dx = event.clientX - start.current.x,
										dy = event.clientY - start.current.y;
									start.current = null;
									if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.25)
										select(active + (dx < 0 ? 1 : -1));
								}}
								onPointerCancel={() => {
									start.current = null;
								}}
							>
								<div className="device-selector-slot">
									{availableDevices.length > 0 && (
										<fieldset
											className="device-selector"
											aria-label={interaction.device}
										>
											{availableDevices.map((item) => (
												<button
													type="button"
													key={item}
													aria-pressed={device === item}
													onClick={() => setPreferredDevice(item)}
												>
													{item}
												</button>
											))}
										</fieldset>
									)}
								</div>
								<DeviceShowcase
									locale={locale}
									project={projects[active]}
									device={device}
									fallbackLabel={interaction.projectFallback}
								/>
								<fieldset
									className="project-controls"
									aria-label={interaction.project}
								>
									<button
										className="icon-button"
										type="button"
										aria-label={interaction.previous}
										onClick={() => select(active - 1)}
									>
										←
									</button>
									{projects.map((project, index) => (
										<button
											type="button"
											key={project.slug}
											aria-label={project.title}
											aria-pressed={index === active}
											onClick={() => select(index)}
										>
											0{index + 1}
										</button>
									))}
									<button
										className="icon-button"
										type="button"
										aria-label={interaction.next}
										onClick={() => select(active + 1)}
									>
										→
									</button>
								</fieldset>
								<p className="work-active-label" aria-live="polite">
									0{active + 1} / {projects[active].title}
								</p>
							</div>
						</div>
					</div>
				</div>
			</Container>
		</section>
	);
}
