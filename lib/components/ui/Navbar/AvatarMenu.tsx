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
import { CirclePlus, LogOut, MoonStar, Package, SunDim } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useTheme } from "next-themes";

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
            <Button isIconOnly variant="light" radius="full">
              <Avatar
                src={session.user.image ?? undefined}
                name={session.user.name ?? undefined}
              />
            </Button>
          </DropdownTrigger>

          <DropdownMenu aria-label="menu principal">
            <DropdownSection showDivider>
              <DropdownItem startContent={<Package size={16} />}>
                Estoque
              </DropdownItem>
              <DropdownItem startContent={<CirclePlus size={16} />}>
                Novo serviço
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
