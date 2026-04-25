import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  if (!request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.next();
  }

  // Check auth token from login
  const accessToken = request.cookies.get("access_token");
  if (accessToken?.value) {
    return NextResponse.next();
  }

  // Legacy: password-based access
  const authCookie = request.cookies.get("dashboard_auth");
  if (authCookie?.value && authCookie.value === process.env.DASHBOARD_PASSWORD) {
    return NextResponse.next();
  }

  const password = request.nextUrl.searchParams.get("password");
  if (password && password === process.env.DASHBOARD_PASSWORD) {
    const response = NextResponse.redirect(
      new URL("/dashboard", request.url)
    );
    response.cookies.set("dashboard_auth", password, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 30,
    });
    return response;
  }

  // Redirect to login
  return NextResponse.redirect(new URL("/login", request.url));
}

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*"],
};
