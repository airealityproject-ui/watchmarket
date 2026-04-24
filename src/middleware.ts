import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  if (!request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.next();
  }

  const authCookie = request.cookies.get("dashboard_auth");
  if (authCookie?.value === process.env.DASHBOARD_PASSWORD) {
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

  return new NextResponse("Unauthorized. Add ?password=YOUR_PASSWORD to URL.", {
    status: 401,
    headers: { "Content-Type": "text/plain" },
  });
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
