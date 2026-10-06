import { existsSync, statSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { devices } from "./home-content";
import { projectScreen } from "./project-screens";
import { projects } from "./projects";
import { publicContacts } from "./site-config";

describe("audited public assets and contacts", () => {
	it("contains only the two verified desktop screens and small web derivatives", () => {
		let count = 0;
		for (const project of projects)
			for (const device of devices) {
				const screen = projectScreen(project.slug, device);
				if (!screen) continue;
				count++;
				expect(device).toBe("MacBook");
				expect(screen.width / screen.height).toBeCloseTo(1.736, 2);
				expect(screen.alt.en).toBeTruthy();
				expect(screen.alt.ru).toBeTruthy();
				for (const width of [640, 1280, 1920]) {
					const path = `public${screen.base}-${width}.webp`;
					expect(existsSync(path)).toBe(true);
					expect(statSync(path).size).toBeLessThan(150_000);
				}
			}
		expect(count).toBe(2);
	});
	it("keeps confirmed destinations in fan order, without telephone or WhatsApp", () => {
		expect(publicContacts.map((channel) => channel.href)).toEqual([
			"https://t.me/to4ka_gr",
			"https://www.linkedin.com/in/dmitrii-nadtochii",
			"https://github.com/Dmitrii-front",
			"mailto:d.nadtochii.dev@gmail.com",
		]);
	});
});
