import type { LocalizedText, Period } from "./content";
import { getProject, type ProjectSlug } from "./projects";

// Project roles/dates/responsibilities are projections, not competing job records.
export const experience = [
	{ id: "pnlwise-founder", projectSlug: "pnlwise" },
	{ id: "healthy-founder", projectSlug: "healthy" },
	{
		id: "kganimation-kol",
		organization: { en: "KGanimation", ru: "KGanimation" },
		context: { en: "KOL project", ru: "Проект KOL" },
		role: { en: "Team Lead Frontend", ru: "Тимлид фронтенд-разработки" },
		period: { start: "2025-04", end: "2025-12" },
	},
	{
		id: "freelance",
		organization: { en: "Freelance Development", ru: "Фриланс-разработка" },
		role: { en: "Freelance Development", ru: "Фриланс-разработка" },
		period: { start: "2023", end: "2025" },
	},
] satisfies (
	| { id: string; projectSlug: ProjectSlug }
	| {
			id: string;
			organization: LocalizedText;
			context?: LocalizedText;
			role: LocalizedText;
			period: Period;
	  }
)[];

export function experienceRecord(entry: (typeof experience)[number]) {
	if (entry.projectSlug) {
		const project = getProject(entry.projectSlug);
		if (!project?.period)
			throw new Error(`Experience requires project period: ${entry.id}`);
		return {
			...entry,
			organization: { en: project.title, ru: project.title },
			context: project.category,
			role: project.role,
			period: project.period,
			responsibilities: project.responsibilities,
		};
	}
	return { ...entry, responsibilities: [] as LocalizedText[] };
}
