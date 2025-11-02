// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("token"); // token dummy

  // Protection Login
  if (
    ["/dashboard", "/profile"].some((path) =>
      req.nextUrl.pathname.startsWith(path)
    )
  ) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // If Not Found
  const editMatch = pathname.match(/\/edit\/([^/]+)/);

  console.log("Edit match: ", editMatch);

  if (editMatch) {
    const id = editMatch[1];

    console.log("ID: ", id);
    
    if (!id || !/^[a-zA-Z0-9_-]+$/.test(id)) {
      console.log("ID: ", req.url);

      return NextResponse.rewrite(new URL("/error/not-found", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/items/:path*",
    "/services/:path*",
    "/payments/:path*",
    "/invoices/:path*",
    "/error/:path*",
  ],
};
