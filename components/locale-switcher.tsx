"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n";

export function LocaleSwitcher({ current }: { current: Locale }) {
  const pathname = usePathname();
  const rest = pathname.replace(/^\/(en|nl)(?=\/|$)/, "");

  return (
    <span className="flex items-center gap-1.5 font-mono text-xs" aria-label="Language">
      {locales.map((locale, index) => (
        <span key={locale} className="flex items-center gap-1.5">
          {index > 0 && <span className="text-line">/</span>}
          <Link
            href={`/${locale}${rest}`}
            aria-current={locale === current ? "true" : undefined}
            className={
              locale === current
                ? "text-foreground"
                : "text-faint transition-colors hover:text-foreground"
            }
          >
            {locale}
          </Link>
        </span>
      ))}
    </span>
  );
}
