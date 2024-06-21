"use client";

import { Button, ButtonProps } from "@nextui-org/react";
import { useFormStatus } from "react-dom";

export default function FormButton(props: ButtonProps) {
  const { pending } = useFormStatus();

  return <Button disabled={pending} {...props} />;
}

export function SubmitButton(props: ButtonProps) {
  const { pending } = useFormStatus();

  return <Button isLoading={pending} type="submit" {...props} />;
}
