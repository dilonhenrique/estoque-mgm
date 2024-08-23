import "./globals.css";
import { auth } from "@/auth";
import { Toaster } from "sonner";
import { Providers } from "./providers";

export const metadata = {
  title: "Estoque | Bianca Assis",
  description: "gestão de estoque",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Providers session={session}>
          {children}
          <Toaster position="bottom-right" />
        </Providers>
      </body>
    </html>
  );
}
