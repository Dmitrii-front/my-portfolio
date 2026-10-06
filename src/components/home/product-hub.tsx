"use client";
import { useRef, useState } from "react";
import type { Dictionary } from "@/lib/dictionaries";
import { interactionCopy, projectSelectionEvent } from "@/lib/home-content";
import { projects } from "@/lib/projects";
import type { SiteLocale } from "@/lib/site-config";
const nodes = ["idea", "development", "ai", "users"] as const;
const paths = [
	"M220 200 Q160 125 105 80",
	"M220 200 Q300 140 350 112",
	"M220 200 Q130 240 92 298",
	"M220 200 Q270 280 337 321",
];
export function ProductHub({
	labels,
	locale,
}: {
	labels: Dictionary["hero"];
	locale: SiteLocale;
}) {
	const [active, setActive] = useState<(typeof nodes)[number] | null>(null);
	const [expanded, setExpanded] = useState(false);
	const trigger = useRef<HTMLButtonElement>(null);
	const copy = interactionCopy[locale];
	return (
		<fieldset
			className="hub-composition"
			id="product-hub"
			aria-label={labels.hub}
			onKeyDown={(event) => {
				if (event.key === "Escape") {
					setExpanded(false);
					setActive(null);
					trigger.current?.focus();
				}
			}}
		>
			<div
				className="product-hub"
				data-active={active ?? ""}
				data-expanded={expanded}
			>
				<svg
					className="hub-connections"
					viewBox="0 0 440 400"
					fill="none"
					aria-hidden="true"
				>
					{nodes.map((node, index) => (
						<path
							key={node}
							d={paths[index]}
							data-lit={active === node}
							style={{
								animationDelay: `calc(var(--duration-fast) + ${index} * var(--stagger))`,
							}}
						/>
					))}
				</svg>
				<button
					type="button"
					ref={trigger}
					className="hub-node hub-products"
					aria-expanded={expanded}
					aria-controls="hub-featured"
					onClick={() => {
						setExpanded(!expanded);
						setActive(null);
					}}
				>
					{labels.products}
					<span className="hub-core" aria-hidden="true" />
				</button>
				{nodes.map((node, index) => (
					<button
						type="button"
						key={node}
						className={`hub-node hub-${node}`}
						aria-pressed={active === node}
						aria-describedby="hub-context"
						style={{
							animationDelay: `calc(var(--duration-normal) + ${index} * var(--stagger))`,
						}}
						onPointerEnter={(event) => {
							if (event.pointerType === "mouse") setActive(node);
						}}
						onFocus={() => setActive(node)}
						onClick={() => {
							setActive(node);
							setExpanded(false);
						}}
					>
						{labels[node]}
					</button>
				))}
			</div>
			<div className="hub-context" id="hub-context" aria-live="polite">
				{active ? copy.hub[active] : copy.hubPrompt}
			</div>
			<div className="hub-featured" id="hub-featured" hidden={!expanded}>
				<p className="eyebrow">{copy.featured}</p>
				<div>
					{projects.map((project) => (
						<a
							key={project.slug}
							href={`#work-${project.slug}`}
							onClick={() => {
								setExpanded(false);
								window.dispatchEvent(
									new CustomEvent(projectSelectionEvent, {
										detail: project.slug,
									}),
								);
							}}
						>
							{project.title}
							<span aria-hidden="true">↗</span>
						</a>
					))}
				</div>
			</div>
		</fieldset>
	);
}
