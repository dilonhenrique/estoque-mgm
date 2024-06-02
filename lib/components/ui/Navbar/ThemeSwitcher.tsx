"use client";

import { DropdownItem, Switch } from "@nextui-org/react";
import { useTheme } from "next-themes";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  function toggleTheme() {
    if (theme === "light") setTheme("dark");
    else setTheme("light");
  }

  return (
    <DropdownItem
      startContent={<Switch checked={theme === "dark"} />}
      onClick={() => toggleTheme()}
    >
      Ligar Darkmode
    </DropdownItem>
  );
}
