"use client";

import { NextUIProvider } from "@nextui-org/react";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";

export function Providers({ children, session }: IProps) {
  return (
    <SessionProvider session={session}>
      <ThemeProvider storageKey="bf-theme">
        <NextUIProvider locale="pt-BR">{children}</NextUIProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}

type IProps = {
  children: React.ReactNode;
  session: Session | null;
};
