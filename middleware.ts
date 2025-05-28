// middleware.ts
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const url = request.nextUrl.pathname;

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const payload = JSON.parse(
      Buffer.from(token.split(".")[1], "base64").toString()
    );

    const isAdminRoute = url.startsWith("/admin-panel");
    const isRestaurantRoute = url.startsWith("/restaurant-dashboard");

    if (isAdminRoute && payload.role !== "admin") {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
    
    if (isRestaurantRoute && payload.role !== "restaurant_owner") {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }

  } catch (err) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin-panel/:path*",
    "/restaurant-dashboard/:path*",
  ],
};
