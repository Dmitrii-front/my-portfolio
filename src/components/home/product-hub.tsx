import type { Dictionary } from "@/lib/dictionaries";

// CSS-only composition. Phase 2 supplies interaction; Phase 4 supplies optional 3D.
export function ProductHub({ labels }: { labels: Dictionary["hero"] }) {
	return (
		<div className="product-hub" role="img" aria-label={labels.hub}>
			<svg
				className="hub-connections"
				viewBox="0 0 440 400"
				fill="none"
				aria-hidden="true"
			>
				<path d="M220 200 105 80M220 200 350 112M220 200 92 298M220 200 337 321" />
				<circle cx="220" cy="200" r="144" />
			</svg>
			<span className="hub-node hub-idea">{labels.idea}</span>
			<span className="hub-node hub-development">{labels.development}</span>
			<span className="hub-node hub-products">
				{labels.products}
				<span className="hub-core" aria-hidden="true" />
			</span>
			<span className="hub-node hub-ai">{labels.ai}</span>
			<span className="hub-node hub-users">{labels.users}</span>
		</div>
	);
}
