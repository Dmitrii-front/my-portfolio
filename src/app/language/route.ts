import { type NextRequest, NextResponse } from "next/server";
import { localizedPath, safePublicPath } from "@/lib/i18n";
import { isSiteLocale, siteConfig } from "@/lib/site-config";

export function GET(request: NextRequest) {
	const locale = request.nextUrl.searchParams.get("locale");
	if (!locale || !isSiteLocale(locale)) {
		return new NextResponse("Unsupported locale", { status: 400 });
	}
	const path = safePublicPath(request.nextUrl.searchParams.get("path"));
	const response = new NextResponse(null, {
		status: 303,
		headers: { Location: localizedPath(locale, path) },
	});
	response.cookies.set(siteConfig.localeCookie, locale, {
		httpOnly: true,
		sameSite: "lax",
		secure: request.nextUrl.protocol === "https:",
		path: "/",
		maxAge: 60 * 60 * 24 * 365,
	});
	response.headers.set("Cache-Control", "private, no-store");
	response.headers.set("X-Robots-Tag", "noindex, nofollow");
	return response;
}
