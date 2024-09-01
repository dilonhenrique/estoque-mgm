"use client";

import AvatarMenu from "./AvatarMenu";
import { Session } from "next-auth";
import {
  Button,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Navbar as NextNavbar,
} from "@nextui-org/react";
import { useCallback, useState } from "react";
import { Menu } from "lucide-react";
import Logo from "../Logo/Logo";
import MainMenu from "./MainMenu";

export default function Navbar({ session }: { session: Session | null }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = session?.user;

  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  return (
    <>
      <NextNavbar
        maxWidth="full"
        classNames={{
          wrapper: "border-b border-default-100 px-8",
          base: "dark bg-background/90 text-foreground",
        }}
      >
        <NavbarContent>
          {user && (
            <Button
              isIconOnly
              onPress={() => setIsMenuOpen(!isMenuOpen)}
              variant="light"
              radius="full"
            >
              <Menu className="text-2xl" strokeWidth={1.2} />
            </Button>
          )}
          <NavbarBrand>
            <Logo />
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent justify="end">
          <NavbarItem className="flex items-center">
            <AvatarMenu session={session} />
          </NavbarItem>
        </NavbarContent>
      </NextNavbar>

      <MainMenu isOpen={isMenuOpen} closeMenu={closeMenu} />
    </>
  );
}
