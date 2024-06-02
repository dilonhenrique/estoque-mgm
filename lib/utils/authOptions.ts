import { authActions } from "@/backend/actions/auth";
import { userService } from "@/backend/services/users";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  // secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
  ],
  callbacks: {
    async jwt({ token }) {
      if (!token.email) return token;

      const existingUser = await userService.findByEmail(token.email);

      if (!existingUser) return token;

      token._id = existingUser._id.toString();
      token.name = existingUser.name;
      token.email = existingUser.email;

      return token;
    },
    async session({ session, token }) {
      if (token._id && session.user) {
        session.user._id = token._id as string;
        session.user.name = token.name;
        session.user.email = token.email;
      }

      return session;
    },
    async signIn({ user, account, profile }) {
      if (!user.email) {
        console.log("No email found in user object");
        return false;
      }
      await authActions.handleSignIn(user, account, profile);
      return true;
    },
  },
};
