// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const VALIDATE_ENABLED = process.env.MIDDLEWARE_VALIDATE_ENABLED === "true";
const VALIDATE_ENDPOINT = process.env.MIDDLEWARE_VALIDATE_ENDPOINT || "";
const BOT_SUBSTRINGS = (
  process.env.MIDDLEWARE_BOT_USER_AGENTS || "Googlebot,AdsBot,bingbot"
).split(",");

// Is BOT
function isBot(userAgent?: string | null) {
  if (!userAgent) return false;
  const ua = userAgent.toLowerCase();
  return BOT_SUBSTRINGS.some((s) => ua.includes(s.toLowerCase()));
}

// VALIDATE
async function validatePathWithApi(pathname: string) {
  if (!VALIDATE_ENABLED || !VALIDATE_ENDPOINT)
    return { ok: true, exists: true };
  try {
    // POST { path } => { exists: boolean }
    const res = await fetch(VALIDATE_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path: pathname }),
      // add credentials if needed
    });
    if (!res.ok) return { ok: false, exists: false };
    const data = await res.json();
    return { ok: true, exists: Boolean(data?.exists) };
  } catch (err) {
    // If validate check fails, don't block users — treat as ok (fail-open)
    return { ok: false, exists: true };
  }
}

// Routes List
const VALID_ROUTES = [
  "/",
  "/login",
  "/dashboard",
  "/profile",
  "/settings",
  "/services",
  "/products",
  "/tracking",
  "/cart",
  "/order",
  "/items",
  "/orders",
  "/success",
  "/invoice",
  "/orders/ongoing",
  "/errorpage/not-found",
  "/errorpage/internal",
  "/errorpage/unauthorized",
  "/settings/master",
  "/items/:path*",
  "/services/:path*",
  "/payments/:path*",
  "/invoices/:path*",
];

// helper untuk deteksi apakah route valid
function isValidRoute(pathname: string): boolean {
  if (VALID_ROUTES.includes(pathname)) return true;

  return VALID_ROUTES.some((r) => pathname.startsWith(r + "/"));
}

// CODE
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("token");
  const ua = req.headers.get("user-agent") || "";
  const isCrawler = isBot(ua);

  console.log("[TEST] Middleware active on:", req.nextUrl.pathname);
  console.log("Pathname middleware: ", pathname);

  // Protection Login
  if (
    ["/dashboard", "/profile", "/orders", "/settings", "/items"].some((path) =>
      req.nextUrl.pathname.startsWith(path)
    )
  ) {
    if (!token) {
      return NextResponse.rewrite(new URL("/login", req.url));
    }
  }

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/assets") ||
    pathname.match(/\.(png|jpg|jpeg|svg|gif|ico|webp|css|js|map)$/)
  ) {
    return NextResponse.next();
  }

  // If Not Found
  const editMatch = pathname.match(/\/edit\/([^/]+)(?:\/|$)/);

  console.log("Edit match: ", editMatch);
  console.log("Token: ", token);

  // Find Match
  if (editMatch) {
    const id = editMatch[1];

    if (!id || !/^[a-zA-Z0-9_-]+$/.test(id)) {
      // invalid format -> show not-found
      return isCrawler
        ? NextResponse.redirect(new URL("/errorpage/not-found", req.url))
        : NextResponse.rewrite(new URL("/errorpage/not-found", req.url));
    }

    // Optional: validate existence using API endpoint (configurable)
    if (VALIDATE_ENABLED && VALIDATE_ENDPOINT) {
      const { ok, exists } = await validatePathWithApi(pathname);
      // If validation API replies false (exists === false) => show not found
      if (ok && !exists) {
        return isCrawler
          ? NextResponse.redirect(new URL("/errorpage/not-found", req.url))
          : NextResponse.rewrite(new URL("/errorpage/not-found", req.url));
      }
      // if ok===false (validate failed), we do nothing (fail-open) to avoid false negatives
    }
  }

  const isValid = isValidRoute(pathname);

  console.log("Validation Routes: ", isValid);

  // IS VALID
  if (!isValid) {
    const notFoundUrl = new URL("/errorpage/not-found", req.nextUrl.origin);

    return NextResponse.rewrite(notFoundUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|api|favicon.ico|assets|.*\\..*).*)",
    // "/protected/:path*",
    // "/public/:path*",
    // "/auth/:path*",
    // "/items/:path*",
    // "/dashboard/:path*",
    // "/profile/:path*",
    // "/items/:path*",
    // "/services/:path*",
    // "/payments/:path*",
    // "/invoices/:path*",
    // "/errorpage/:path*",
  ],
};
