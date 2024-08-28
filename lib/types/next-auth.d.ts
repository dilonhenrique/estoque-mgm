import { UserRole } from "@/lib/models/types";
import { Role } from "@prisma/client";
import NextAuth, {
  type DefaultSession,
  type User as NextAuthUser,
} from "next-auth";

export interface ExtendedUser extends NextAuthUser {
  account_id: string;
  img_url?: string | null;
  role: Role;
}

declare module "next-auth" {
  interface User extends Partial<ExtendedUser> {}
  interface Session {
    user: ExtendedUser & DefaultSession["user"];
  }
}
