"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function resolvedLight(): boolean {
  try {
    const stored = localStorage.getItem("theme");
    if (stored) return stored === "light";
  } catch {
    // private mode etc.
  }
  return matchMedia("(prefers-color-scheme: light)").matches;
}

function apply(light: boolean) {
  const root = document.documentElement;
  if (light) {
    root.setAttribute("data-theme", "light");
  } else {
    root.removeAttribute("data-theme");
  }
}

export function ThemeToggle() {
  const pathname = usePathname();

  // Re-apply after every navigation, in case anything reset the attribute.
  useEffect(() => {
    apply(resolvedLight());
  }, [pathname]);

  function toggle() {
    const light = document.documentElement.getAttribute("data-theme") !== "light";
    apply(light);
    try {
      localStorage.setItem("theme", light ? "light" : "dark");
    } catch {
      // theme still applies for this page view
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle light mode"
      className="text-muted transition-colors hover:text-foreground"
    >
      {/* sun (shown in dark mode) */}
      <svg
        className="h-4 w-4 light:hidden"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4m11.4-11.4 1.4-1.4" />
      </svg>
      {/* moon (shown in light mode) */}
      <svg
        className="hidden h-4 w-4 light:block"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
      </svg>
    </button>
  );
}
