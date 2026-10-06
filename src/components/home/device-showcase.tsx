"use client";
import { useEffect, useRef, useState } from "react";
import { Enhancement } from "@/components/three/enhancement";
import type { ShowcaseDevice } from "@/lib/home-content";
import type { projects } from "@/lib/projects";
import { projectScreen } from "@/lib/project-screens";
import type { SiteLocale } from "@/lib/site-config";

function VerifiedScreen({
	screen,
	locale,
}: {
	screen: NonNullable<ReturnType<typeof projectScreen>>;
	locale: SiteLocale;
}) {
	const [previous, setPrevious] = useState(screen);
	const [loaded, setLoaded] = useState(screen.base);
	useEffect(() => {
		if (loaded !== screen.base) return;
		const timer = setTimeout(() => setPrevious(screen), 240);
		return () => clearTimeout(timer);
	}, [screen, loaded]);
	const imageProps = (source: typeof screen) => ({
		src: `${source.base}-1280.webp`,
		srcSet: `${source.base}-640.webp 640w, ${source.base}-1280.webp 1280w, ${source.base}-1920.webp 1920w`,
		sizes:
			"(min-width: 1200px) 704px, (min-width: 1024px) 56vw, (min-width: 768px) 90vw, 90vw",
		width: source.width,
		height: source.height,
	});
	return (
		<>
			{/* Retain the old approved screen until the selected image decodes; hardware never fades. */}
			{/* biome-ignore lint/performance/noImgElement: approved optimized static derivatives */}
			<img
				{...imageProps(previous)}
				className="screen-previous"
				alt=""
				aria-hidden="true"
				loading="lazy"
				decoding="async"
			/>
			{/* biome-ignore lint/performance/noImgElement: approved optimized static derivatives */}
			<img
				{...imageProps(screen)}
				data-loaded={loaded === screen.base}
				alt={screen.alt[locale]}
				loading="lazy"
				decoding="async"
				onLoad={async (event) => {
					const image = event.currentTarget;
					await image.decode().catch(() => {});
					if (image.getAttribute("src") === `${screen.base}-1280.webp`)
						setLoaded(screen.base);
				}}
			/>
		</>
	);
}
// Replaceable presentation boundary, independent of scrolling/project selection.
export function DeviceShowcase({
	project,
	device,
	fallbackLabel,
	locale,
}: {
	project: (typeof projects)[number];
	device: ShowcaseDevice | null;
	fallbackLabel: string;
	locale: SiteLocale;
}) {
	const screen = device ? projectScreen(project.slug, device) : undefined;
	const host = useRef<HTMLElement>(null);
	return (
		<figure
			ref={host}
			className="device-showcase"
			data-device={screen ? device : "fallback"}
			data-project={project.slug}
			aria-label={screen ? `${project.title} / ${device}` : project.title}
		>
			<Enhancement
				hostRef={host}
				scene="device"
				device={device}
				screen={
					screen && device === "MacBook"
						? { base: screen.base, aspect: screen.width / screen.height }
						: undefined
				}
			/>
			<div className={screen ? "device-body" : "project-fallback"}>
				{screen && <div className="device-camera" aria-hidden="true" />}
				<div
					className={screen ? "device-screen" : "project-fallback-content"}
					data-real={Boolean(screen)}
				>
					{screen ? (
						<VerifiedScreen screen={screen} locale={locale} />
					) : (
						<>
							<span className="eyebrow">{project.category}</span>
							<div className="device-monogram" aria-hidden="true">
								{project.title === "Healthy" ? "H" : "P"}
								<span>.</span>
							</div>
							<p className="device-project-name">{project.title}</p>
							<p className="project-fallback-caption">{fallbackLabel}</p>
						</>
					)}
				</div>
				{screen && <div className="device-base" aria-hidden="true" />}
			</div>
		</figure>
	);
}
