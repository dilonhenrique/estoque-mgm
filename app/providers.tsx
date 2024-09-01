"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { NextUIProvider } from "@nextui-org/react";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";

export function Providers({ children, session }: IProps) {
  return (
    <SessionProvider session={session}>
      <ThemeProvider storageKey="bf-theme">
        <NextUIProvider locale="pt-BR">
          {children}

          <ProgressBar
            height="3px"
            color="hsl(var(--nextui-primary-600))"
            options={{ showSpinner: false }}
          />
        </NextUIProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}

type IProps = {
  children: React.ReactNode;
  session: Session | null;
};
