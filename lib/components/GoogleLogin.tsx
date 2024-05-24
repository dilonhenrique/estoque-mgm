'use client'

import { Button } from "@nextui-org/react";
import { signIn } from "next-auth/react";

export default function GoogleLogin() {
  return (<Button onClick={() => signIn("google")}>Sign in with google</Button>)
}