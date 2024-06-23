import { authService } from "@/backend/services/auth";
import { userRepo } from "@/backend/repositories/users";
import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import postgres from "prisma/postgres.db";
import { Adapter } from "next-auth/adapters";
import { PrismaAdapter } from "./PrismaAdapter";

export const pages = {
  signIn: "/auth/login",
  newUser: "/auth/new-user",
  // signOut: '/auth/signout',
  // error: '/auth/error', // Error code passed in query string as ?error=
  // verifyRequest: '/auth/verify-request', // (used for check email message)
};

export const authOptions = {
  // secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(postgres) as Adapter,
  pages,
  session: { strategy: "jwt" },
  providers: [
    // Credentials({

    // }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
  ],
  callbacks: {
    // async jwt({ token }) {
    //   if (!token.email) return token;

    //   const existingUser = await userRepo.findByEmail(token.email);
    //   if (!existingUser) return token;

    //   token.id = existingUser.id;
    //   token.name = existingUser.name;
    //   token.email = existingUser.email;
    //   token.account_id = existingUser.account_id;

    //   return token;
    // },
    // async session({ session, token, user }) {
    //   console.log("Authoptions session cb:", user);
    //   if (token.id && session.user) {
    //     session.user.id = token.id as string;
    //     session.user.name = token.name;
    //     session.user.email = token.email;
    //     session.user.account_id = token.account_id as string;
    //   }

    //   return session;
    // },
    // async signIn({ user, account, profile }) {
    //   if (!user.email) {
    //     console.log("No email found in user object");
    //     return false;
    //   }
    //   const existingUser = await userRepo.findByEmail(user.email);
    //   // await authService.handleSignIn(user, account, profile);
    //   return !!existingUser;
    // },
  },
};
