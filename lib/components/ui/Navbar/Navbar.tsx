"use client";

import Link from "next/link";
import AvatarMenu from "./AvatarMenu";
import { Session } from "next-auth";

export default function Navbar({ session }: { session: Session | null }) {
  return (
    <nav className="w-full flex gap-4 min-h-20 items-center justify-between p-8 py-4 bg-neutral-900 border-b border-neutral-800">
      <Link className="font-light text-2xl tracking-widest text-white" href="/">
        ESTOQUE
      </Link>

      <div className="ms-auto flex gap-2">
        <AvatarMenu session={session} />
      </div>
    </nav>
  );
}
