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
import Icon from "../Icon/Icon";

export default function AvatarMenu({ session }: { session: Session | null }) {
  const { resolvedTheme, setTheme } = useTheme();

  function toggleTheme() {
    if (resolvedTheme === "light") setTheme("dark");
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
                startContent={<Icon value="product" size={16} />}
                as={Link}
                href="/produtos"
              >
                Produtos
              </DropdownItem>
              <DropdownItem
                startContent={<Icon value="customer" size={16} />}
                as={Link}
                href="/clientes"
              >
                Clientes
              </DropdownItem>
              <DropdownItem
                startContent={<Icon value="supplier" size={16} />}
                as={Link}
                href="/fornecedores"
              >
                Fornecedores
              </DropdownItem>
              <DropdownItem
                startContent={<Icon value="service" size={16} />}
                as={Link}
                href="/servicos"
              >
                Serviços
              </DropdownItem>
              <DropdownItem
                startContent={<Icon value="procedure" size={16} />}
                as={Link}
                href="/procedimentos"
              >
                Procedimentos
              </DropdownItem>
              <DropdownItem
                startContent={<Icon value="purchase" size={16} />}
                as={Link}
                href="/compras"
              >
                Compras
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

      {!session && <Button onClick={() => signIn()}>Login</Button>}
    </>
  );
}
