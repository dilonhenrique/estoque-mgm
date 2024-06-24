
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Home({
  searchParams,
}: {
  searchParams: { callbackUrl?: string };
}) {
  const session = await auth();
  if (session) redirect(searchParams.callbackUrl ?? "/");

  return (
    <main className="p-8">
      <div className="w-full flex flex-col gap-4 justify-start items-start mb-4">
        <h1>Faça seu login acima</h1>
      </div>
    </main>
  );
}
