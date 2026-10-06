import type { ShowcaseDevice } from "@/lib/home-content";
import type { projects } from "@/lib/projects";
// Replaceable presentation boundary, independent of scrolling/project selection.
export function DeviceShowcase({
	project,
	device,
	screenLabel,
}: {
	project: (typeof projects)[number];
	device: ShowcaseDevice;
	screenLabel: string;
}) {
	return (
		<figure
			className="device-showcase"
			data-device={device}
			data-project={project.slug}
			aria-label={`${project.title} / ${device}`}
		>
			<div className="device-body">
				<div className="device-camera" aria-hidden="true" />
				<div className="device-screen" key={project.slug}>
					<span className="eyebrow">{project.category}</span>
					<div className="device-monogram" aria-hidden="true">
						{project.title === "Healthy" ? "H" : "P"}
						<span>.</span>
					</div>
					<p className="device-project-name">{project.title}</p>
					<p className="device-placeholder">{screenLabel}</p>
				</div>
			</div>
			<div className="device-base" aria-hidden="true" />
		</figure>
	);
}
