"use client";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { interactionCopy } from "@/lib/home-content";
import { publicContacts, type SiteLocale } from "@/lib/site-config";
import { ContactIcon } from "@/components/ui/contact-icon";
// A 180° upward fan. Mobile scales the radius, not the interaction model.
const positions = [
	[-1, 0],
	[-0.5, -0.866],
	[0.5, -0.866],
	[1, 0],
];
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
				className="contact-trigger"
				aria-label={open ? copy.close : label}
				aria-expanded={open}
				aria-controls="contact-channels"
				onClick={() => setOpen(!open)}
			>
				<span aria-hidden="true">{open ? "×" : "↗"}</span>
				<span>{open ? copy.close : label}</span>
			</button>
			<div
				className="contact-channels"
				id="contact-channels"
				inert={!open}
				aria-hidden={!open}
			>
				{publicContacts.map((channel, index) => (
					<div
						className="contact-channel"
						key={channel.name}
						style={
							{
								"--channel-index": index,
								"--channel-x": positions[index][0],
								"--channel-y": positions[index][1],
							} as CSSProperties
						}
					>
						<a
							href={channel.href}
							target={channel.name === "Email" ? undefined : "_blank"}
							rel={channel.name === "Email" ? undefined : "noreferrer"}
							aria-label={channel.name}
						>
							<ContactIcon name={channel.name} />
							<span className="contact-channel-label">{channel.name}</span>
						</a>
					</div>
				))}
			</div>
			<noscript>
				<p className="contact-noscript">
					{publicContacts.map((channel) => (
						<a key={channel.name} className="text-link" href={channel.href}>
							{channel.name} ↗
						</a>
					))}
				</p>
			</noscript>
		</fieldset>
	);
}
