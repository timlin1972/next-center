export const authConfig = {
  pages: {
    signIn: "/login",
  },
  providers: [],
  callbacks: {
    // FOR MORE DETAIL ABOUT CALLBACK FUNCTIONS CHECK https://next-auth.js.org/configuration/callbacks
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.isAdmin = user.isAdmin;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.isAdmin = token.isAdmin;
      }
      return session;
    },
    authorized({ auth, request }) {
      const user = auth?.user;
      const isOnAdmin = request.nextUrl?.pathname.startsWith("/admin");
      const isOnBlog = request.nextUrl?.pathname.startsWith("/blog");
      const isOnSystemInformation = request.nextUrl?.pathname.startsWith(
        "/system_information"
      );
      const isOnLogin = request.nextUrl?.pathname.startsWith("/login");

      if (isOnAdmin && !user?.isAdmin) {
        return false;
      }

      if (isOnBlog && !user) {
        return false;
      }

      if (isOnSystemInformation && !user) {
        return false;
      }

      if (isOnLogin && user) {
        return Response.redirect(new URL("/", request.nextUrl));
      }

      return true;
    },
  },
};
