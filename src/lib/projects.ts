// Baseline names only. These are skeletons, not published case studies.
export const projects = [
	{ slug: "pnlwise", title: "Pnlwise", category: "FinTech" },
	{ slug: "healthy", title: "Healthy", category: "Healthcare" },
	{ slug: "portfolio", title: "Portfolio", category: "Product platform" },
] as const;

export function getProject(slug: string) {
	return projects.find((project) => project.slug === slug);
}
