
import { auth } from "@/auth";
import LoginForm from "@/components/Login/LoginForm";
import { redirect } from "next/navigation";

export default async function Home({
  searchParams,
}: {
  searchParams: { callbackUrl?: string };
}) {
  const session = await auth();
  if (session) redirect(searchParams.callbackUrl ?? "/");

  return (
    <main className="p-8 w-full max-w-lg">
      <div className="w-full flex flex-col gap-4 justify-start items-start mb-4">
        <h1>Faça seu login</h1>
        <LoginForm />
      </div>
    </main>
  );
}
