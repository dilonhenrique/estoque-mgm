import { auth } from "@/auth";
import { redirect } from "next/navigation";

export async function getSessionUserOrLogout() {
  const user = await getSessionUser();
  return user ? user : redirect("/");
}

export async function getSessionUser() {
  const session = await auth();
  if (session?.user?.email) {
    return session.user;
  }
  return null;
}

export async function isSignedIn(): Promise<boolean> {
  const user = await getSessionUser();
  return !!user;
}
