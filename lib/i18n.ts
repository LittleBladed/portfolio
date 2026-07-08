export const locales = ["en", "nl"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

const en = {
  nav: {
    contact: "contact",
  },
  intro: {
    lead: "Freelance full-stack engineer.",
    sub: "Platforms, apps, bots, games and the infrastructure behind them. The entries below cover what I built and what it taught me.",
    availability: "Currently available for new projects",
    description:
      "Freelance full-stack engineer in Belgium, building and scaling web platforms, mobile apps, and infrastructure.",
  },
  home: {
    writingTitle: "Writing",
    empty: "No entries yet. Check back soon.",
  },
  post: {
    back: "All writing",
    onlyInEnglish: "This entry hasn't been translated to Dutch yet.",
  },
  notFound: {
    message: "This page doesn't exist.",
    back: "Back home",
  },
  footer: {
    location: "Belgium",
    colophon: "no template",
  },
};

const nl: typeof en = {
  nav: {
    contact: "contact",
  },
  intro: {
    lead: "Freelance full-stack engineer.",
    sub: "Platformen, apps, bots, games en de infrastructuur erachter. De artikels hieronder gaan over wat ik bouwde en wat het me leerde.",
    availability: "Momenteel beschikbaar voor nieuwe projecten",
    description:
      "Freelance full-stack engineer in België. Bouwt en schaalt webplatformen, mobiele apps en infrastructuur.",
  },
  home: {
    writingTitle: "Artikels",
    empty: "Nog geen artikels. Kom binnenkort terug.",
  },
  post: {
    back: "Alle artikels",
    onlyInEnglish: "Dit artikel is voorlopig enkel in het Engels beschikbaar.",
  },
  notFound: {
    message: "Deze pagina bestaat niet.",
    back: "Terug naar de startpagina",
  },
  footer: {
    location: "België",
    colophon: "geen template",
  },
};

const dictionaries = { en, nl } as const;

export type Dictionary = typeof en;

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
