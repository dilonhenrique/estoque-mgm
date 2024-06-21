"use client";

import { Button, Divider } from "@nextui-org/react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body className="w-screen h-screen flex flex-col items-center justify-center">
        <h2>Algo deu errado!</h2>
        <p>{error.name}</p>
        <p>{error.message}</p>
        <p>{error.stack}</p>
        
        <Divider className="my-4" />

        <Button onClick={() => reset()}>Tente de novo</Button>
      </body>
    </html>
  );
}
