import { type NextRequest, NextResponse } from "next/server";
import { localizedPath, resolveLocale } from "@/lib/i18n";
import { siteConfig } from "@/lib/site-config";

export function GET(request: NextRequest) {
	const locale = resolveLocale(
		request.cookies.get(siteConfig.localeCookie)?.value,
		request.headers.get("accept-language") || "",
	);
	// Relative Location preserves the incoming host behind any reverse proxy.
	const response = new NextResponse(null, {
		status: 307,
		headers: { Location: localizedPath(locale) },
	});
	response.headers.set("Cache-Control", "private, no-store");
	response.headers.set("Vary", "Cookie, Accept-Language");
	return response;
}
