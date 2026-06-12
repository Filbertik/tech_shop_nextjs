// src/middleware.ts

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const PUBLIC_PATHS = ["/", "/product", "/api", "/_next", "/favicon.ico"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isPublic = PUBLIC_PATHS.some((path) => pathname.startsWith(path));

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET, // 🔥 ВАЖЛИВО
  });

  // 🔐 якщо НЕ залогінений і лізе в protected
  if (!token && !isPublic) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // ✅ якщо залогінений і заходить на головну — можна редіректнути в акаунт
  if (token && pathname === "/") {
    return NextResponse.redirect(new URL("/account", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { getToken } from "next-auth/jwt";

// const PUBLIC_PATHS = ["/", "/product", "/api", "/_next", "/favicon.ico"];

// export async function middleware(req: NextRequest) {
//   const { pathname } = req.nextUrl;

//   const isPublic = PUBLIC_PATHS.some((p) => pathname.startsWith(p));

//   const token = await getToken({ req });

//   if (!token && !isPublic) {
//     return NextResponse.redirect(new URL("/", req.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
// };

// // import { NextResponse } from "next/server";
// // import type { NextRequest } from "next/server";
// // import { getToken, GetTokenParams } from "next-auth/jwt";

// // export async function middleware(request: NextRequest) {
// //   const { pathname } = request.nextUrl;

// //   let params: GetTokenParams = {
// //     req: request,
// //     secret: process.env.AUTH_SECRET ?? "secret",
// //   };

// //   if (process.env.NODE_ENV === "production") {
// //     params = {
// //       ...params,
// //       cookieName: "__Secure-authjs.session-token",
// //     };
// //   }

// //   const token = await getToken(params);

// //   const protectedRoutes = ["/ingredients", "/recipes/new", "/recipes/:path*"];

// //   if (
// //     protectedRoutes.some((route) =>
// //       pathname.startsWith(route.replace(":path*", ""))
// //     )
// //   ) {
// //     if (!token) {
// //       const url = new URL("/error", request.url);
// //       url.searchParams.set("message", "Недостатньо прав доступу");
// //       return NextResponse.redirect(url);
// //     }
// //   }

// //   return NextResponse.next();
// // }

// // export const config = {
// //   matcher: ["/ingredients", "/recipes/new", "/recipes/:path*"],
// // };
