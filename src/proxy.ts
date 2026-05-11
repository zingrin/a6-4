import { NextRequest, NextResponse } from "next/server";
import { Roles } from "@/constants/roles";
import { userService } from "@/services/user.service";

/** Returns the home dashboard URL for a given role */
function getDashboardUrl(role: string): string {
  switch (role) {
    case Roles.admin:      return "/admin/analytics";
    case Roles.tutor:      return "/tutor/dashboard";
    case Roles.institute:  return "/institute/dashboard";
    case Roles.mentor:     return "/mentor/dashboard";
    case Roles.moderator:  return "/moderator/dashboard";
    default:               return "/dashboard"; // student
  }
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  let isAuthenticated = false;
  let userRole = "";

  const { data } = await userService.getSession();

  if (data?.user) {
    isAuthenticated = true;
    userRole = data.user.role;
  }

  // ── Redirect authenticated users away from auth pages ──────────────────────
  if (
    isAuthenticated &&
    (pathname.startsWith("/login") || pathname.startsWith("/register"))
  ) {
    return NextResponse.redirect(new URL(getDashboardUrl(userRole), request.url));
  }

  // ── Redirect unauthenticated users to login ─────────────────────────────────
  const protectedPaths = [
    "/dashboard",
    "/tutor",
    "/admin",
    "/institute",
    "/mentor",
    "/moderator",
  ];
  if (!isAuthenticated && protectedPaths.some((p) => pathname.startsWith(p))) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // ── Role-based route guards ─────────────────────────────────────────────────

  if (pathname.startsWith("/admin") && userRole !== Roles.admin) {
    return NextResponse.redirect(new URL(getDashboardUrl(userRole), request.url));
  }

  if (pathname.startsWith("/tutor") && userRole !== Roles.tutor) {
    return NextResponse.redirect(new URL(getDashboardUrl(userRole), request.url));
  }

  if (pathname.startsWith("/institute") && userRole !== Roles.institute) {
    return NextResponse.redirect(new URL(getDashboardUrl(userRole), request.url));
  }

  if (pathname.startsWith("/mentor") && userRole !== Roles.mentor) {
    return NextResponse.redirect(new URL(getDashboardUrl(userRole), request.url));
  }

  if (pathname.startsWith("/moderator") && userRole !== Roles.moderator) {
    return NextResponse.redirect(new URL(getDashboardUrl(userRole), request.url));
  }

  if (pathname.startsWith("/dashboard") && userRole !== Roles.student) {
    return NextResponse.redirect(new URL(getDashboardUrl(userRole), request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/tutor/:path*",
    "/institute/:path*",
    "/mentor/:path*",
    "/moderator/:path*",
    "/login",
    "/register",
  ],
};