import { NextResponse, type NextRequest } from "next/server";
import { decodeCustomJWT } from "./lib/utils";

// Optional: Add your secret in `.env` as NEXTAUTH_SECRET
const secret = process.env.NEXTAUTH_SECRET;

const AUTH_ROUTES = ["/sign-in", "/sign-up"];
const PROTECTED_ROUTES = [
  "/dashboard",
  "/dashboard/students",
  "/dashboard/courses",
  "/dashboard/events",
  "/dashboard/settings",
  "/dashboard/transaction",
  "/profile"
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  //   const token = await getToken({ req: request, secret });
  const token = request.cookies.get("course-app-authentication")?.value;

  const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route));
  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  // ✅ User is authenticated
  if (token) {
    const data = await decodeCustomJWT(token);
    if (isAuthRoute) {
      if (data?.role !== "ADMIN") {
        return NextResponse.redirect(new URL("/courses", request.url));
      }
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.next();
  }

  // ❌ User is not authenticated
  if (isProtectedRoute) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/sign-in", "/sign-up", "/dashboard/:path*", "/profile"],
};
