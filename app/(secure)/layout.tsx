import { auth } from "@/auth";
import Navbar from "@/components/ui/Navbar/Navbar";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  return (
    <>
      <Navbar session={session} />
      {children}
    </>
  );
}
