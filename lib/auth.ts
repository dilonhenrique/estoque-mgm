import { PrismaAdapter } from "@/utils/PrismaAdapter";
import NextAuth from "next-auth";
import { Adapter } from "next-auth/adapters";
import Google from "next-auth/providers/google";
import postgres from "prisma/postgres.db";
import { userRepo } from "./backend/repositories/users";

export const pages = {
  signIn: "/auth/login",
  newUser: "/auth/new-user",
  // signOut: '/auth/signout',
  // error: '/auth/error', // Error code passed in query string as ?error=
  // verifyRequest: '/auth/verify-request', // (used for check email message)
};

const adapter = PrismaAdapter(postgres) as Adapter;

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter,
  providers: [
    Google({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
  ],
  session: { strategy: "jwt" },
  pages,
  callbacks: {
    async session({ session, user }) {
      console.log("Authoptions session cb:", user);
      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
          name: user.name,
          email: user.email,
          account_id: user.account_id,
        },
      };
    },
    async signIn({ user, account, profile }) {
      if (!account?.providerAccountId && !account?.provider) {
        return false;
      }

      if (adapter.getUserByAccount) {
        const existingUser = await adapter.getUserByAccount({
          providerAccountId: account?.providerAccountId,
          provider: account.provider,
        });

        if (existingUser) return true;
      }

      return "/auth/new-user";
    },
  },
});
