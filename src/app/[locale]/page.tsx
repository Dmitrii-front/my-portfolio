import { Hero } from "@/components/home/hero";
import { SelectedWork } from "@/components/home/selected-work";
import { Lab } from "@/components/home/lab";
import { Contact } from "@/components/home/contact";
import { getDictionary } from "@/lib/dictionaries";
import { readLocale, type LocaleParams } from "@/lib/locale-params";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: LocaleParams) {
	const locale = await readLocale(params);
	const copy = getDictionary(locale).hero;
	return pageMetadata(locale, "", "Portfolio", copy.title);
}

export default async function HomePage({ params }: LocaleParams) {
	const locale = await readLocale(params);
	const dictionary = getDictionary(locale);
	return (
		<>
			<Hero locale={locale} dictionary={dictionary} />
			<SelectedWork locale={locale} dictionary={dictionary} />
			<Lab locale={locale} dictionary={dictionary} />
			<Contact locale={locale} dictionary={dictionary} />
		</>
	);
}
