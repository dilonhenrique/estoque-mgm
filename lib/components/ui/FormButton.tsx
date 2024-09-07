"use client";

import { useFormContext } from "react-hook-form";
import { Button, ButtonProps } from "@nextui-org/react";

export default function FormButton(props: ButtonProps) {
  const methods = useFormContext();

  return <Button isDisabled={methods?.formState.isSubmitting} {...props} />;
}

export function SubmitButton(props: ButtonProps) {
  const methods = useFormContext();

  return (
    <Button
      isLoading={methods?.formState.isSubmitting}
      type="submit"
      {...props}
    />
  );
}
