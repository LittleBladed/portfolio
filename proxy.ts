import { NextRequest, NextResponse } from "next/server";
import { defaultLocale, isLocale } from "@/lib/i18n";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const firstSegment = pathname.split("/")[1] ?? "";
  if (isLocale(firstSegment)) return NextResponse.next();

  const preferred = request.headers
    .get("accept-language")
    ?.toLowerCase()
    .startsWith("nl")
    ? "nl"
    : defaultLocale;

  const url = request.nextUrl.clone();
  url.pathname = `/${preferred}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Everything except the admin area, Next internals, and static files.
  matcher: ["/((?!admin|_next|api|favicon.ico|.*\\..*).*)"],
};
