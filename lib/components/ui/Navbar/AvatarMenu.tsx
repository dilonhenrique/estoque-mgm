import {
  Avatar,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Skeleton,
  DropdownSection,
} from "@nextui-org/react";
import {
  HandCoins,
  LogOut,
  MoonStar,
  Package,
  PackagePlus,
  SunDim,
} from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import Link from "next/link";

export default function AvatarMenu() {
  const { data: session, status } = useSession();
  const { theme, setTheme } = useTheme();

  function toggleTheme() {
    if (theme === "light") setTheme("dark");
    else setTheme("light");
  }

  return (
    <>
      {status === "loading" && (
        <Skeleton className="rounded-full">
          <Avatar />
        </Skeleton>
      )}

      {status === "authenticated" && (
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
              </DropdownItem>
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

      {status === "unauthenticated" && (
        <Button onClick={() => signIn("google")}>Entrar com Google</Button>
      )}
    </>
  );
}
