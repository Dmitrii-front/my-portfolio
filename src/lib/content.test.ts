import { describe, expect, it } from "vitest";
import { contentLabels, formatPeriod } from "./content";
import { dictionaries } from "./dictionaries";
import { experience, experienceRecord } from "./experience";
import { labExperiments } from "./home-content";
import { profile } from "./profile";
import { caseStudies } from "./project-case-studies";
import { projectScreen } from "./project-screens";
import { getProject, projects } from "./projects";
import { siteConfig } from "./site-config";

function checkLocalized(value: unknown) {
	if (!value || typeof value !== "object") return;
	if ("en" in value || "ru" in value) {
		expect(Object.keys(value).sort()).toEqual([...siteConfig.locales].sort());
		for (const locale of siteConfig.locales) {
			expect((value as Record<string, unknown>)[locale]).toBeTypeOf("string");
			expect((value as Record<string, string>)[locale].trim()).not.toBe("");
		}
	} else for (const child of Object.values(value)) checkLocalized(child);
}

describe("canonical public content", () => {
	it("keeps unique stable IDs, complete EN/RU values and matching case records", () => {
		expect(new Set(projects.map((p) => p.slug)).size).toBe(projects.length);
		expect(new Set(experience.map((e) => e.id)).size).toBe(experience.length);
		expect(Object.keys(caseStudies).sort()).toEqual(
			projects.map((p) => p.slug).sort(),
		);
		for (const data of [
			projects,
			profile,
			experience,
			labExperiments,
			caseStudies,
		])
			checkLocalized(data);
		expect(Object.keys(contentLabels.en)).toEqual(
			Object.keys(contentLabels.ru),
		);
	});
	it("resolves project references and projects canonical roles/dates into Experience", () => {
		for (const entry of experience) {
			if (!entry.projectSlug) continue;
			const project = getProject(entry.projectSlug);
			expect(project).toBeDefined();
			const record = experienceRecord(entry);
			expect(record.role).toBe(project?.role);
			expect(record.period).toBe(project?.period);
			expect(record.responsibilities).toBe(project?.responsibilities);
		}
		for (const capability of profile.capabilities)
			for (const slug of capability.projects)
				expect(getProject(slug)).toBeDefined();
	});
	it("preserves approved chronology, ownership and minimal freelance scope", () => {
		expect(experience.map((e) => experienceRecord(e).period)).toEqual([
			{ start: "2026-09", end: null },
			{ start: "2026-03", end: null },
			{ start: "2025-04", end: "2025-12" },
			{ start: "2023", end: "2025" },
		]);
		expect(getProject("pnlwise")?.teamSize).toBe(1);
		expect(getProject("healthy")?.teamSize).toBe(4);
		expect(getProject("healthy")?.role.en).toBe(
			"Founder / Product Manager / Medical Consultant",
		);
		expect(experience.filter((e) => e.id.includes("kol"))).toHaveLength(1);
		expect(JSON.stringify(experience)).not.toMatch(/dentist|стоматолог/i);
		expect(experienceRecord(experience[3]).responsibilities).toEqual([]);
		expect(profile.education.map((e) => e.period)).toEqual([
			{ start: "2012", end: "2017" },
			{ start: "2017", end: "2019" },
		]);
	});
	it("uses only approved screenshot references and review-ready bilingual cases", () => {
		for (const project of projects) {
			const study = caseStudies[project.slug];
			expect(study.editorial).toBe("ready-for-review");
			for (const locale of siteConfig.locales)
				expect(study.localeReadiness[locale]).toBe("ready-for-review");
			expect(projectScreen(project.slug, study.media.device)).toBeDefined();
			expect(study.problem.length).toBeGreaterThan(0);
			expect(study.results.length).toBeGreaterThan(0);
			for (const link of study.links ?? []) {
				expect(new URL(link.href).protocol).toBe("https:");
				expect(link.href).not.toMatch(/localhost|example\./);
			}
		}
	});
	it("keeps concepts, attribution and public-claim boundaries explicit", () => {
		expect(labExperiments.every((e) => e.maturity === "concept")).toBe(true);
		expect(getProject("healthy")?.status.en).toContain("No public launch");
		expect(caseStudies.healthy.results[0].en).toContain("test participants");
		expect(getProject("portfolio")?.ownership.en).toContain("Codex assists");
		expect(caseStudies.portfolio.results[0].en).toContain(
			"future work, not current features",
		);
		const publicText = JSON.stringify({
			projects,
			profile,
			experience,
			caseStudies,
			labExperiments,
			dictionaries,
		});
		// A small regression guard, not a semantic truth detector; manual claim review remains required.
		expect(publicText).not.toMatch(
			/\b\d[\d,.]*\s+(?:active users|paying customers|production bookings)|senior developer|expert in|guaranteed revenue|LIVE payments enabled|sk-proj-|Bearer [A-Za-z0-9]/i,
		);
		expect(dictionaries.en.hero.users).not.toContain("REAL USERS");
	});
	it("preserves date precision without locale fallback", () => {
		expect(formatPeriod({ start: "2023", end: "2025" }, "ru")).toBe(
			"2023 — 2025",
		);
		expect(formatPeriod({ start: "2026-09", end: null }, "en")).toBe(
			"September 2026 — Present",
		);
		expect(formatPeriod({ start: "2026-09", end: null }, "ru")).toContain(
			"сентябрь 2026",
		);
	});
});
