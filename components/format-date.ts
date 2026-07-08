import type { Locale } from "@/lib/i18n";

const intlLocale: Record<Locale, string> = {
  en: "en-GB",
  nl: "nl-BE",
};

export function formatDate(date: Date, locale: Locale = "en"): string {
  return new Intl.DateTimeFormat(intlLocale[locale], {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}
