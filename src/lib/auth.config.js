export const authConfig = {
  pages: {
    signIn: "/login",
  },
  providers: [],
  callbacks: {
    async authorized({ auth, request }) {
      const user = auth?.user;

      const isOnHome = request.nextUrl.pathname === "/";
      const isOnMain = request.nextUrl.pathname.startsWith("/main");

      if (isOnHome) {
        if (user) return Response.redirect(new URL("/main", request.nextUrl));
        return false;
      } else if (isOnMain) {
        if (user) return true;
        return false;
      } else if (user) {
        return Response.redirect(new URL("/main", request.nextUrl));
      }

      return true;
    },
  },
};
