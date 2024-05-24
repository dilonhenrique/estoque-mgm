import './globals.css';
import { Providers } from "./providers";

export const metadata = {
  title: 'Estoque | Bianca Assis',
  description: 'gestão de estoque',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body suppressHydrationWarning>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
