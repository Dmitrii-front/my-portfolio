import { ContentPage } from "@/components/pages/content-page";
import { getDictionary } from "@/lib/dictionaries";
import { readLocale, type LocaleParams } from "@/lib/locale-params";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: LocaleParams) {
	const locale = await readLocale(params);
	const copy = getDictionary(locale).pages.contact;
	return pageMetadata(locale, "/contact", copy.eyebrow, copy.description);
}

export default async function Page({ params }: LocaleParams) {
	return <ContentPage locale={await readLocale(params)} page="contact" />;
}
