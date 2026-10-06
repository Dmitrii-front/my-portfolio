import type { labExperiments } from "@/lib/home-content";

// One 24px technical line family: exchange, scoped agent, extraction, messaging.
export function LabGlyph({
	concept,
}: {
	concept: (typeof labExperiments)[number]["id"];
}) {
	return (
		<svg
			viewBox="0 0 24 24"
			width="24"
			height="24"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.5"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
		>
			{concept === "payments" && (
				<>
					<rect x="3" y="5" width="18" height="14" rx="2" />
					<path d="M3 9h18M7 13h9l-2-2M17 16H8l2 2" />
				</>
			)}
			{concept === "agent" && (
				<>
					<rect x="6" y="6" width="12" height="12" rx="2" />
					<path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4M9 13l2 2 4-5" />
				</>
			)}
			{concept === "parser" && (
				<path d="M13 3H5v18h14V9l-6-6v6h6M8 12h3M8 15h6M8 18h6M19 12h3v6h-3" />
			)}
			{concept === "bot" && (
				<>
					<path d="M4 4h16v13H10l-6 4V4Z" />
					<path d="m7 10 10-3-3 7-3-3-2 2v-2Z" />
				</>
			)}
		</svg>
	);
}
