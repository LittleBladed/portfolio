import type { Metadata } from "next";
import { Bricolage_Grotesque, Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, isLocale, locales, type Locale } from "@/lib/i18n";
import { profile } from "@/lib/profile";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { ThemeToggle } from "@/components/theme-toggle";
import "../../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

// Stored choice wins; otherwise follow the system preference (dark if none).
const themeScript = `(function(){try{var t=localStorage.getItem("theme");var light=t?t==="light":matchMedia("(prefers-color-scheme: light)").matches;if(light)document.documentElement.setAttribute("data-theme","light")}catch(e){}})()`;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata(
  props: LayoutProps<"/[locale]">
): Promise<Metadata> {
  const { locale } = await props.params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);

  return {
    title: {
      default: `${profile.name} · ${profile.role}`,
      template: `%s · ${profile.name}`,
    },
    description: dict.intro.description,
    alternates: {
      languages: { en: "/en", nl: "/nl" },
    },
  };
}

export default async function SiteLayout(props: LayoutProps<"/[locale]">) {
  const { locale } = await props.params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale as Locale);

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${bricolage.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full flex flex-col">
        <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col px-6">
          <header className="flex items-baseline justify-between pt-12 pb-4">
            <Link
              href={`/${locale}`}
              className="font-display text-base font-semibold tracking-tight"
            >
              {profile.name}
            </Link>
            <div className="flex items-center gap-4 text-sm text-muted">
              <a
                href={`mailto:${profile.email}`}
                className="transition-colors hover:text-foreground"
              >
                {dict.nav.contact}
              </a>
              <LocaleSwitcher current={locale as Locale} />
              <ThemeToggle />
            </div>
          </header>

          <main className="flex-1 pt-16 pb-24">{props.children}</main>

          <footer className="flex flex-wrap items-center justify-between gap-2 border-t border-line py-6 font-mono text-xs text-faint">
            <span>
              © {new Date().getFullYear()} {profile.name},{" "}
              {dict.footer.location}
            </span>
            <a
              href={`mailto:${profile.email}`}
              className="transition-colors hover:text-muted"
            >
              {profile.email}
            </a>
          </footer>
        </div>
      </body>
    </html>
  );
}
