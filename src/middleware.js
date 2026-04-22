// import { NextResponse } from "next/server";

// export function middleware(request) {
//   const auth = request.cookies.get("auth")?.value;
//   const isLogin = request.nextUrl.pathname === "/login";

//   // login ছাড়া কিছুই access করতে পারবে না
//   if (!auth && !isLogin) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   // login করা থাকলে আবার login page এ যাবে না
//   if (auth && isLogin) {
//     return NextResponse.redirect(new URL("/dashboard", request.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/((?!_next|api|favicon.ico).*)"],
// };
import { NextResponse } from "next/server";

export function middleware(request) {
  const auth = request.cookies.get("auth")?.value;
  const isLogin = request.nextUrl.pathname === "/login";

  if (!auth && !isLogin) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (auth && isLogin) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico).*)"],
};
