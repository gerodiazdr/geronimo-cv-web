import { NextResponse, type NextRequest } from "next/server";

// "/" → "/es" for Spanish-speaking browsers, "/en" for everyone else.
export function middleware(request: NextRequest) {
  const accept = request.headers.get("accept-language") ?? "";
  const first = accept.split(",")[0]?.trim().toLowerCase() ?? "";
  const lang = first.startsWith("es") ? "es" : "en";
  return NextResponse.redirect(new URL(`/${lang}`, request.url));
}

export const config = {
  matcher: ["/"],
};
