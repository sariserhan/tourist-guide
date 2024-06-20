import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRouteForAdmin = createRouteMatcher([
  '/admin(.*)'
]);

const isProtectedRoute = createRouteMatcher([
  '/post(.*)'
]);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect()
  // if (isProtectedRouteForAdmin(req)) {
  //   auth().protect(has => {
  //     return (
  //       has({ role: "org:admin" })
  //     )
  //   })
  // }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
