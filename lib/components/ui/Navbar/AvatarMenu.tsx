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
import {
  HandCoins,
  HandHelping,
  LogOut,
  MoonStar,
  Package,
  PackagePlus,
  SunDim,
  User,
} from "lucide-react";
import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import { useTheme } from "next-themes";
import Link from "next/link";

export default function AvatarMenu({ session }: { session: Session | null }) {
  const { theme, setTheme } = useTheme();

  function toggleTheme() {
    if (theme === "light") setTheme("dark");
    else setTheme("light");
  }

  return (
    <>
      {/* {status === "loading" && (
        <Skeleton className="rounded-full">
          <Avatar />
        </Skeleton>
      )} */}

      {session && (
        <Dropdown>
          <DropdownTrigger>
            <Button isIconOnly variant="bordered" radius="full">
              <Avatar
                src={session.user.img_url ?? undefined}
                name={session.user.name ?? undefined}
              />
            </Button>
          </DropdownTrigger>

          <DropdownMenu aria-label="menu principal">
            <DropdownSection showDivider>
              <DropdownItem
                startContent={<Package size={16} />}
                as={Link}
                href="/produtos"
              >
                Estoque atual
              </DropdownItem>
              <DropdownItem
                startContent={<User size={16} />}
                as={Link}
                href="/clientes"
              >
                Clientes
              </DropdownItem>
              <DropdownItem
                startContent={<HandHelping size={16} />}
                as={Link}
                href="/servicos"
              >
                Serviços
              </DropdownItem>
              {/* <DropdownItem
                startContent={<PackagePlus size={16} />}
                as={Link}
                href="/repor-estoque"
              >
                Repor Estoque
              </DropdownItem>
              <DropdownItem
                startContent={<HandCoins size={16} />}
                as={Link}
                href="/nova-venda"
              >
                Nova Venda
              </DropdownItem> */}
            </DropdownSection>

            <DropdownSection showDivider>
              <DropdownItem
                startContent={
                  theme === "dark" ? (
                    <SunDim size={16} />
                  ) : (
                    <MoonStar size={16} />
                  )
                }
                onClick={toggleTheme}
              >
                {theme === "dark" ? "Modo Claro" : "Modo Escuro"}
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

      {!session && <Button onClick={() => signIn()}>Login</Button>}
    </>
  );
}
