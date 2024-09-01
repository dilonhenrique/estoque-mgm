"use client";

import {
  Avatar,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
} from "@nextui-org/react";
import { Cog, LogOut, MoonStar, SunDim, User } from "lucide-react";
import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import { useTheme } from "next-themes";

export default function AvatarMenu({ session }: { session: Session | null }) {
  const { resolvedTheme, setTheme } = useTheme();

  function toggleTheme() {
    if (resolvedTheme === "light") setTheme("dark");
    else setTheme("light");
  }

  return (
    <>
      {session && (
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Button isIconOnly variant="bordered" radius="full">
              <Avatar
                src={session.user.img_url ?? undefined}
                name={session.user.name ?? undefined}
              />
            </Button>
          </DropdownTrigger>

          <DropdownMenu
            aria-label="menu de conta"
            topContent={
              <div className="p-2 pt-1">
                <h5>{session.user.name}</h5>
                <p className="text-tiny text-content4-foreground">{session.user.email}</p>
              </div>
            }
            disabledKeys={["profile", "account"]}
          >
            <DropdownSection showDivider>
              <DropdownItem key="profile" startContent={<User size={16} />}>
                Meu perfil
              </DropdownItem>
              <DropdownItem key="account" startContent={<Cog size={16} />}>
                Minha conta
              </DropdownItem>
              <DropdownItem
                key="theme"
                startContent={
                  resolvedTheme === "dark" ? (
                    <SunDim size={16} />
                  ) : (
                    <MoonStar size={16} />
                  )
                }
                onClick={toggleTheme}
              >
                {resolvedTheme === "dark" ? "Modo Claro" : "Modo Escuro"}
              </DropdownItem>
            </DropdownSection>

            <DropdownItem
              startContent={<LogOut size={16} />}
              onClick={() => signOut()}
              color="danger"
              variant="flat"
            >
              Sair
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      )}

      {!session && (
        <Button variant="shadow" color="primary" onClick={() => signIn()}>
          Login
        </Button>
      )}
    </>
  );
}
