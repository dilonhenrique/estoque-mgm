"use client";

import Link from "next/link";
import AvatarMenu from "./AvatarMenu";
import { Session } from "next-auth";
import {
  Button,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Navbar as NextNavbar,
  ScrollShadow,
  cn,
} from "@nextui-org/react";
import { useCallback, useState } from "react";
import { menuItems } from "@/utils/consts/menu";
import Icon from "../Icon/Icon";
import { usePathname } from "next/navigation";
import { Plus } from "lucide-react";

export default function Navbar({ session }: { session: Session | null }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const pathname = usePathname();
  const user = session?.user;

  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  return (
    // <nav className="w-full flex gap-4 min-h-20 items-center justify-between p-8 py-4 bg-neutral-900 border-b border-neutral-800">
    //   <Link className="font-light text-2xl tracking-widest text-white" href="/">
    //     ESTOQUE
    //   </Link>

    //   <div className="ms-auto flex gap-2">
    //     <AvatarMenu session={session} />
    //   </div>
    // </nav>
    <NextNavbar
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="full"
      classNames={{ wrapper: "border-b border-default-100", base:"dark bg-background/90 text-foreground" }}
    >
      <NavbarContent>
        {user && (
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          />
        )}
        <NavbarBrand>
          <p className="font-light text-inherit tracking-widest text-xl">
            ESTOQUE
          </p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <AvatarMenu session={session} />
        </NavbarItem>
      </NavbarContent>

      {user && (
        <NavbarMenu className="max-w-80 shadow-large bg-content1/80 backdrop-blur-lg pt-6">
          <ScrollShadow hideScrollBar className="h-full flex flex-col gap-2">
            {menuItems.map((item, index) => {
              const isActive = pathname.startsWith(item.url);

              return (
                <NavbarMenuItem key={`nav-item-${index}`} isActive={isActive}>
                  <Button
                    onPress={closeMenu}
                    variant={isActive ? "solid" : "light"}
                    size="lg"
                    as={Link}
                    href={item.url}
                    className={cn(
                      "justify-start text-default-500 px-4",
                      isActive && "bg-default-800 text-default font-semibold"
                    )}
                    fullWidth
                    startContent={
                      <Icon
                        value={item.iconKey}
                        className="text-3xl"
                        strokeWidth={1.2}
                      />
                    }
                    endContent={
                      <Button
                        as={Link}
                        onPress={closeMenu}
                        href={`${item.url}/novo`}
                        isIconOnly
                        variant={isActive ? "bordered" : "ghost"}
                        radius="full"
                        size="sm"
                        className={cn(
                          "ms-auto scale-75 text-default-600",
                          isActive && "text-default-100"
                        )}
                      >
                        <Plus className="text-xl" />
                      </Button>
                    }
                  >
                    {item.label}
                  </Button>
                </NavbarMenuItem>
              );
            })}
          </ScrollShadow>
        </NavbarMenu>
      )}
    </NextNavbar>
  );
}
