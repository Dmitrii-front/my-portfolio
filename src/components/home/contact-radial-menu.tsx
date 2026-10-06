"use client";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { interactionCopy } from "@/lib/home-content";
import { siteConfig, type SiteLocale } from "@/lib/site-config";
const channels = [
	{ name: "Telegram", href: null },
	{ name: "LinkedIn", href: null },
	{ name: "GitHub", href: siteConfig.github },
	{ name: "Email", href: null },
] as const;
export function ContactRadialMenu({
	locale,
	label,
}: {
	locale: SiteLocale;
	label: string;
}) {
	const [open, setOpen] = useState(false);
	const root = useRef<HTMLFieldSetElement>(null),
		trigger = useRef<HTMLButtonElement>(null);
	const copy = interactionCopy[locale];
	function close(restore: boolean) {
		setOpen(false);
		if (restore) trigger.current?.focus();
	}
	useEffect(() => {
		if (!open) return;
		const outside = (event: PointerEvent) => {
			if (
				event.target instanceof Node &&
				!root.current?.contains(event.target)
			) {
				setOpen(false);
				if (root.current?.contains(document.activeElement))
					trigger.current?.focus();
			}
		};
		document.addEventListener("pointerdown", outside);
		return () => document.removeEventListener("pointerdown", outside);
	}, [open]);
	return (
		<fieldset
			className="contact-fan"
			aria-label={copy.contactChannels}
			ref={root}
			data-open={open}
			onKeyDown={(event) => {
				if (event.key === "Escape" && open) {
					event.preventDefault();
					close(true);
				}
			}}
			onBlur={(event) => {
				if (!event.currentTarget.contains(event.relatedTarget)) close(false);
			}}
		>
			<button
				type="button"
				ref={trigger}
				className="button button-primary contact-trigger"
				aria-expanded={open}
				aria-controls="contact-channels"
				onClick={() => setOpen(!open)}
			>
				{open ? copy.close : label}
				<span aria-hidden="true">{open ? "×" : "↗"}</span>
			</button>
			<div
				className="contact-channels"
				id="contact-channels"
				inert={!open}
				aria-hidden={!open}
			>
				{channels.map((channel, index) => (
					<div
						className="contact-channel"
						key={channel.name}
						style={{ "--channel-index": index } as CSSProperties}
					>
						{channel.href ? (
							<a href={channel.href} target="_blank" rel="noreferrer">
								{channel.name}
								<span aria-hidden="true">↗</span>
							</a>
						) : (
							<button
								type="button"
								aria-disabled="true"
								aria-describedby="contact-notice"
							>
								{channel.name}
								<span className="channel-unavailable">{copy.unavailable}</span>
							</button>
						)}
					</div>
				))}
			</div>
			<p id="contact-notice" className="contact-notice" aria-live="polite">
				{open ? copy.contactNotice : ""}
			</p>
			<noscript>
				<p className="contact-noscript">
					<a className="text-link" href={siteConfig.github}>
						GitHub ↗
					</a>
				</p>
			</noscript>
		</fieldset>
	);
}
