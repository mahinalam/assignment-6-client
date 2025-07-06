// import type { NextRequest } from "next/server";

// import { NextResponse } from "next/server";

// import { getCurrentUser } from "./services/AuthService";

// type Role = keyof typeof roleBasedRoutes;

// const AuthRoutes = ["/login", "/register"];

// const roleBasedRoutes = {
//   USER: [/^\/profile/, /^\/dashboard/],
//   ADMIN: [/^\/dashboard/],
// };

// // This function can be marked `async` if using `await` inside
// export async function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl;
//   const user = await getCurrentUser();

//   console.log(user, pathname);

//   if (!user) {
//     if (AuthRoutes.includes(pathname)) {
//       return NextResponse.next();
//     } else {
//       return NextResponse.redirect(
//         new URL(`/login?redirect=${pathname}`, request.url)
//       );
//     }
//   }

//   if (user?.role && roleBasedRoutes[user.role as Role]) {
//     const routes = roleBasedRoutes[user?.role as Role];

//     if (routes.some((route) => pathname.match(route))) {
//       return NextResponse.next();
//     }
//   }

//   return NextResponse.redirect(new URL("/", request.url));
// }

// // See "Matching Paths" below to learn more
// export const config = {
//   matcher: [
//     "/profile",
//     "/profile/:page*",
//     "/dashboard",
//     "/dashboard/:page*",
//     "/login",
//     "/register",
//   ],
// };

// middleware.ts
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;
  const pathname = request.nextUrl.pathname;

  const isPublic =
    pathname.startsWith("/login") || pathname.startsWith("/register");

  if (!token && !isPublic) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token && isPublic) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api).*)"],
};
