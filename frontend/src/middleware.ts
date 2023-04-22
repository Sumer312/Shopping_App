import { NextRequest, NextResponse } from "next/server";


export const config = {
  matcher: "/add-product",
};

export function middleware(req: NextRequest) {
  const token = req.cookies.get("seller")
  req.nextUrl.pathname = !token ? "/auth/seller/login" : "/add-product";
  return NextResponse.rewrite(req.nextUrl);
}
