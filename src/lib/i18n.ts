import { isSiteLocale, siteConfig, type SiteLocale } from "./site-config";

export function localizedPath(locale: SiteLocale, path = "") {
	return `/${locale}${path === "/" ? "" : path}`;
}

// Accept-Language is a preference, never a geographic inference.
export function resolveLocale(saved?: string, acceptLanguage = ""): SiteLocale {
	if (saved && isSiteLocale(saved)) return saved;

	const preferences = acceptLanguage.split(",").map((item, index) => {
		const [tag, ...parameters] = item.trim().toLowerCase().split(";");
		const quality = parameters.find((parameter) =>
			parameter.trim().startsWith("q="),
		);
		const weight = quality ? Number(quality.trim().slice(2)) : 1;
		return { tag: tag.split("-")[0], weight, index };
	});

	preferences.sort((a, b) => b.weight - a.weight || a.index - b.index);
	for (const { tag, weight } of preferences) {
		if (
			Number.isFinite(weight) &&
			weight > 0 &&
			weight <= 1 &&
			isSiteLocale(tag)
		) {
			return tag;
		}
	}
	return siteConfig.defaultLocale;
}

// Only internal public paths are accepted by the preference endpoint.
export function safePublicPath(path: string | null) {
	if (!path || path === "/") return "";
	if (
		/^\/(projects(?:\/[a-z0-9-]+)?|lab|about|experience|contact)$/.test(path)
	) {
		return path;
	}
	return "";
}

export function stripLocale(pathname: string) {
	const segments = pathname.split("/");
	if (isSiteLocale(segments[1])) return `/${segments.slice(2).join("/")}`;
	return "/";
}
