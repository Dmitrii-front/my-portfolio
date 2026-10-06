import { notFound } from "next/navigation";
import { isSiteLocale } from "./site-config";

export type LocaleParams = { params: Promise<{ locale: string }> };

export async function readLocale(params: LocaleParams["params"]) {
	const { locale } = await params;
	if (!isSiteLocale(locale)) notFound();
	return locale;
}
