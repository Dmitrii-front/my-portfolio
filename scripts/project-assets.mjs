import { createHash } from "node:crypto";
import { mkdir, readFile } from "node:fs/promises";
import { homedir } from "node:os";
import { join, resolve } from "node:path";
import { createRequire } from "node:module";

// Offline asset preparation only. Reuse Next's installed Sharp, no runtime SDK.
const require = createRequire(import.meta.url);
const sharp = require(
	require.resolve("sharp", { paths: [require.resolve("next/package.json")] }),
);
const archive = resolve(
	(process.argv[2] === "--portfolio" ? undefined : process.argv[2]) ??
		join(homedir(), "Desktop/screenshots"),
);
const output = resolve("public/projects");
const sources = [
	{
		slug: "pnlwise",
		source: "pnlwise/jpeg/Main.jpeg",
		sha256: "fd55b25415b0eaaeb4c54e27532e50d0a92feecc1cda377037504039552c053b",
	},
	{
		slug: "healthy",
		source: "healthy/Снимок экрана — 2026-09-23 в 15.03.07.jpeg",
		sha256: "88633c9a9f0bd986aace22b8c838ab8f17c86196c7cd11d186751f6311d76e53",
	},
];
sources.push({
	slug: "portfolio",
	source: resolve("assets/sources/portfolio-desktop.png"),
	sha256: "5ae2a4764b0f1750f7ebe7412fc2a98fe9118ed151153f38441aaa6e0086e764",
});
await mkdir(output, { recursive: true });
for (const source of sources.filter(
	(s) => process.argv[2] !== "--portfolio" || s.slug === "portfolio",
)) {
	const input = await readFile(
		source.slug === "portfolio" ? source.source : join(archive, source.source),
	);
	if (createHash("sha256").update(input).digest("hex") !== source.sha256)
		throw new Error(
			`Source changed: ${source.slug}; re-audit before replacing public assets`,
		);
	for (const width of [640, 1280, 1920]) {
		const result = await sharp(input)
			.resize({ width, withoutEnlargement: true })
			.webp({ quality: 88, effort: 6 })
			.toFile(join(output, `${source.slug}-desktop-${width}.webp`));
		console.log(
			`${source.slug}: ${result.width}×${result.height}, ${result.size} bytes`,
		);
	}
}
