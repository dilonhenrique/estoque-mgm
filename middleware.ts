import { withAuth } from "next-auth/middleware";

export default withAuth((req) => {}, {
  pages: {
    signIn: "/login",
  },
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
