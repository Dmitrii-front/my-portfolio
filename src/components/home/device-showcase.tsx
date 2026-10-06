import type { ShowcaseDevice } from "@/lib/home-content";
import type { projects } from "@/lib/projects";
import { projectScreen } from "@/lib/project-screens";
import type { SiteLocale } from "@/lib/site-config";
// Replaceable presentation boundary, independent of scrolling/project selection.
export function DeviceShowcase({
	project,
	device,
	screenLabel,
	locale,
}: {
	project: (typeof projects)[number];
	device: ShowcaseDevice;
	screenLabel: string;
	locale: SiteLocale;
}) {
	const screen = projectScreen(project.slug, device);
	return (
		<figure
			className="device-showcase"
			data-device={device}
			data-project={project.slug}
			aria-label={`${project.title} / ${device}`}
		>
			<div className="device-body">
				<div className="device-camera" aria-hidden="true" />
				<div
					className="device-screen"
					data-real={Boolean(screen)}
					key={`${project.slug}-${device}`}
				>
					{screen ? (
						// biome-ignore lint/performance/noImgElement: preoptimized static srcset, no runtime image service
						<img
							src={`${screen.base}-1280.webp`}
							srcSet={`${screen.base}-640.webp 640w, ${screen.base}-1280.webp 1280w, ${screen.base}-1920.webp 1920w`}
							sizes="(min-width: 1200px) 624px, (min-width: 1024px) 56vw, (min-width: 768px) 44vw, 90vw"
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
							<p className="device-placeholder">{screenLabel}</p>
						</>
					)}
				</div>
				<div className="device-base" aria-hidden="true" />
			</div>
		</figure>
	);
}
