import { PrismaAdapter } from "@/utils/PrismaAdapter";
import NextAuth, { Account } from "next-auth";
import { Adapter } from "next-auth/adapters";
import Google from "next-auth/providers/google";
import { cookies } from "next/headers";
import postgres from "prisma/postgres.db";

export const pages = {
  signIn: "/auth/login",
  newUser: "/auth/cadastro",
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
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.account_id = user.account_id;
        token.img_url = user.img_url;
      }

      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.name = token.name as string;
      session.user.email = token.email as string;
      session.user.account_id = token.account_id as string;
      session.user.img_url = token.img_url as string | undefined;

      return session;
    },
    async signIn({ user, account }) {
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

      setCookieAccountData(account);

      const params = new URLSearchParams();
      if (user.name) params.set("name", user.name);
      if (user.email) params.set("email", user.email);
      if (user.image) params.set("img_url", user.image);

      return `/auth/cadastro?${params.toString()}`;
    },
  },
});

export const SOCIAL_ACCOUNT_DATA = "SOCIAL_ACCOUNT_DATA";

function setCookieAccountData(account: Account) {
  const socialAccountData = JSON.stringify({ ...account });
  cookies().set(SOCIAL_ACCOUNT_DATA, socialAccountData, {
    maxAge: 60 * 60, // 60 minutes
    path: "/",
  });
}
