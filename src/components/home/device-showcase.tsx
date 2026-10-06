import type { Dictionary } from "@/lib/dictionaries";

export function DeviceShowcase({ labels }: { labels: Dictionary["home"] }) {
	return (
		<figure className="device-showcase" aria-label={labels.preview}>
			<div className="preview-toolbar" aria-hidden="true">
				<span />
				<span />
				<span />
			</div>
			<div className="preview-canvas">
				<span className="preview-mark" aria-hidden="true">
					P<span>.</span>
				</span>
				<p>{labels.previewPending}</p>
			</div>
		</figure>
	);
}
