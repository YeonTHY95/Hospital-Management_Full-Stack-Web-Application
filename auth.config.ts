import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/signin',
  },callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnUserView = nextUrl.pathname.startsWith('/userview');
      if (isOnUserView) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/userview', nextUrl));
      }
      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;