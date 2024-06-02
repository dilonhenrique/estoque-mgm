import { UserRole } from "@/lib/models/types";
import NextAuth, {
  type DefaultSession,
  type User as NextAuthUser,
} from "next-auth";

export interface ExtendedUser extends NextAuthUser {
  _id: string;
}

declare module "next-auth" {
  interface User extends Partial<ExtendedUser> {}
  interface Session {
    user: ExtendedUser & DefaultSession["user"];
  }
}
