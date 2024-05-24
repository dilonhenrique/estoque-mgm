import clientPromise from "../lib/mongodb";
import { Button } from "@nextui-org/react";
import GoogleLogin from "@/components/GoogleLogin";

async function getProps() {
  try {
    await clientPromise;
    return {
      props: { isConnected: true },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { isConnected: false },
    };
  }
};

export default async function Home() {
  const isConnected = await getProps();

  return (
    <div className="container">
      <main>
        <h1 className="text-3xl font-bold text-purple-600">
          Hello world!
        </h1>

        <Button>Teste de butão</Button>

        <GoogleLogin />

        {isConnected ? (
          <h2 className="subtitle">You are connected to MongoDB</h2>
        ) : (
          <h2 className="subtitle">
            You are NOT connected to MongoDB. Check the <code>README.md</code>{" "}
            for instructions.
          </h2>
        )}
      </main>
    </div>
  );
}
