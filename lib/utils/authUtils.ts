import { authOptions } from "./authOptions";
import { getServerSession } from "next-auth";

export async function getSessionUser() {
  const session = await getServerSession(authOptions);
  if (session?.user?.email) {
    return session.user;
  }
  return null;
}

export async function isSignedIn(): Promise<boolean> {
  const user = await getSessionUser();
  return !!user;
}
