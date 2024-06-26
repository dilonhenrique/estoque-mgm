import { auth } from "@/auth";
import SignUpForm from "@/components/SignUp/SignUpForm";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home({
  searchParams,
}: {
  searchParams: { callbackUrl?: string };
}) {
  const session = await auth();
  if (session) redirect(searchParams.callbackUrl ?? "/");

  return (
    <main className="p-8 w-full max-w-4xl min-h-screen">
      <div className="w-full flex flex-col gap-4 justify-start items-start mb-4">
        <div className="flex justify-between gap-4 w-full">
          <h1>Faça seu cadastro</h1>
          
          <div className="flex gap-4 items-center">
            Já tem uma conta?
            <Button as={Link} href="/auth/login" variant="light" color="secondary">
              Faça login
            </Button>
          </div>
        </div>
        <SignUpForm />
      </div>
    </main>
  );
}
