import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import isAuthorized from "@/utils/is-auth";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const isAuth = await isAuthorized(token);
  const url = req.nextUrl;
  const loginUrl = new URL("/login", url.origin);
  const homeUrl = new URL("/home", url.origin);

  if (url.pathname.startsWith("/home") && !token) {
    return NextResponse.redirect(loginUrl);
  }

  if (url.pathname.startsWith("/login") && token) {
    return NextResponse.redirect(homeUrl);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/home/:path*"],
};
