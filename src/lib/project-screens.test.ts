import { existsSync, statSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { devices } from "./home-content";
import {
	availableProjectDevices,
	projectScreen,
	resolveProjectDevice,
} from "./project-screens";
import { projects } from "./projects";
import { publicContacts } from "./site-config";

describe("audited public assets and contacts", () => {
	it("offers only verified variants and resolves preferences without inventing a device", () => {
		for (const slug of ["pnlwise", "healthy"] as const) {
			expect(availableProjectDevices(slug)).toEqual(["MacBook"]);
			for (const preferred of devices)
				expect(resolveProjectDevice(slug, preferred)).toBe("MacBook");
		}
		expect(availableProjectDevices("portfolio")).toEqual([]);
		for (const preferred of devices)
			expect(resolveProjectDevice("portfolio", preferred)).toBeNull();
	});
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
