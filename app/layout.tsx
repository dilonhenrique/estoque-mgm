import { auth } from "@/auth";
import "./globals.css";
import { Providers } from "@/components/ui/providers";
import { Toaster } from "sonner";

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
