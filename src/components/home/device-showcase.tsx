"use client";
import { useRef } from "react";
import { Enhancement } from "@/components/three/enhancement";
import type { ShowcaseDevice } from "@/lib/home-content";
import type { projects } from "@/lib/projects";
import { projectScreen } from "@/lib/project-screens";
import type { SiteLocale } from "@/lib/site-config";
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
					key={`${project.slug}-${device}`}
				>
					{screen ? (
						// biome-ignore lint/performance/noImgElement: preoptimized static srcset, no runtime image service
						<img
							src={`${screen.base}-1280.webp`}
							srcSet={`${screen.base}-640.webp 640w, ${screen.base}-1280.webp 1280w, ${screen.base}-1920.webp 1920w`}
							sizes="(min-width: 1200px) 704px, (min-width: 1024px) 56vw, (min-width: 768px) 90vw, 90vw"
							width={screen.width}
							height={screen.height}
							alt={screen.alt[locale]}
							loading="lazy"
							decoding="async"
						/>
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
