import type { publicContacts } from "@/lib/site-config";

export function ContactIcon({
	name,
}: {
	name: (typeof publicContacts)[number]["name"];
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
			{name === "Telegram" && (
				<>
					<path d="m3 10 18-7-4 18-6-5-3 3v-6z" />
					<path d="m8 13 9-6-6 9" />
				</>
			)}
			{name === "LinkedIn" && (
				<>
					<path d="M4 9v11M9 20V9h4v2c3-4 7-2 7 2v7M13 20v-7" />
					<circle cx="4" cy="4" r="1.3" />
				</>
			)}
			{name === "GitHub" && (
				<path d="M9 21v-4c-4 1-4-2-6-2M15 21v-4c0-1-.5-2-1-2 4-.5 6-2 6-6 0-1-.5-3-1.5-4 .5-1 .5-3 0-3-2 0-3 1-3 1a11 11 0 0 0-7 0s-1-1-3-1c-.5 0-.5 2 0 3C4.5 6 4 8 4 9c0 4 2 5.5 6 6-.5 0-1 1-1 2" />
			)}
			{name === "Email" && (
				<>
					<rect x="3" y="5" width="18" height="14" rx="2" />
					<path d="m3 7 9 7 9-7" />
				</>
			)}
		</svg>
	);
}
