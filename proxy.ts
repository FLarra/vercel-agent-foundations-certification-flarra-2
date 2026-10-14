import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ADMIN_COOKIE_NAME, ADMIN_PASSWORD } from "@/lib/admin-auth";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin/login")) {
    return NextResponse.next();
  }

  const cookie = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  if (cookie === ADMIN_PASSWORD) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = "/admin/login";
  url.search = "";
  return NextResponse.redirect(url);
}

export const config = {
  // TODO: /api/admin/chat isn't matched, so anyone with the URL can query back-office data and run
  // bash in the sandbox without logging in. Gate it too (return 401 for API paths instead of
  // redirecting to /admin/login), or check the admin cookie inside the route handler.
  matcher: ["/admin/:path*"],
};
