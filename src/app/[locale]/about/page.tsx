import { ContentPage } from "@/components/pages/content-page";
import { getDictionary } from "@/lib/dictionaries";
import { readLocale, type LocaleParams } from "@/lib/locale-params";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: LocaleParams) {
	const locale = await readLocale(params);
	const copy = getDictionary(locale).pages.about;
	return pageMetadata(locale, "/about", copy.eyebrow, copy.description);
}

export default async function Page({ params }: LocaleParams) {
	return <ContentPage locale={await readLocale(params)} page="about" />;
}
