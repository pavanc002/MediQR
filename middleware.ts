import { NextRequest, NextResponse } from "next/server";

// Protect admin CRUD API endpoints using a simple header flag set by the admin UI
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const method = req.method.toUpperCase();

  // Protect medicines collection endpoint for admin only
  if (pathname === "/api/medicines") {
    const isAdmin = req.headers.get("x-admin") === "1";
    if (!isAdmin) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }
  }

  // Protect update/delete for single medicine; allow public GET
  if (pathname.startsWith("/api/medicines/") && pathname.split("/").length === 4) {
    if (method !== "GET") {
      const isAdmin = req.headers.get("x-admin") === "1";
      if (!isAdmin) {
        return NextResponse.json({ error: "Authentication required" }, { status: 401 });
      }
    }
  }

  // Allow QR route and public medicine route to be public
  return NextResponse.next();
}

export const config = {
  // Apply to API routes only
  matcher: [
    "/api/medicines",
    "/api/medicines/:path*",
  ],
};