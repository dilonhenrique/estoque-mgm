import { authService } from "@/backend/services/auth";
import { userRepo } from "@/backend/repositories/users";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  // secret: process.env.NEXTAUTH_SECRET,
  pages: {
    // signIn: '/login',
    // signOut: '/auth/signout',
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // (used for check email message)
    // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  session: { strategy: "jwt" },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
  ],
  callbacks: {
    async jwt({ token }) {
      if (!token.email) return token;

      const existingUser = await userRepo.findByEmail(token.email);
      if (!existingUser) return token;

      token.id = existingUser.id;
      token.name = existingUser.name;
      token.email = existingUser.email;
      token.account_id = existingUser.account_id;

      return token;
    },
    async session({ session, token }) {
      if (token.id && session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.account_id = token.account_id as string;
      }

      return session;
    },
    async signIn({ user, account, profile }) {
      if (!user.email) {
        console.log("No email found in user object");
        return false;
      }
      await authService.handleSignIn(user, account, profile);
      return true;
    },
  },
};
