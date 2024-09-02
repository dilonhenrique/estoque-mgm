"use client";

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
} from "@nextui-org/react";
import { SubmitButton } from "../ui/FormButton";
import { useRouter } from "next/navigation";
import { useFormState } from "react-dom";
import { MutationResult } from "@/types/types";
import { toast } from "sonner";
import PasswordInput from "../PasswordInput/PasswordInput";
import { signIn } from "next-auth/react";
import { authService } from "@/backend/services/auth";
import Link from "next/link";
import Input from "../ui/forms/atoms/Input/Input";

export default function LoginForm() {
  const router = useRouter();
  const [state, formAction] = useFormState(submitAction, {
    success: true,
    errors: {},
  } as MutationResult);

  async function submitAction(status: MutationResult, formData: FormData) {
    const response = await authService.login(formData);

    if (!response.success) {
      if (response.status === 400) {
        toast.error("Confira os campos e tente novamente");
      } else {
        toast.error(response.errors.message ?? "Error");
      }
    } else {
      toast.success("Logado com sucesso!");
      router.push("/");
    }

    return response;
  }

  return (
    <form
      className="w-full gap-4 flex flex-col max-w-lg"
      action={formAction}
      noValidate
    >
      <Card>
        <CardBody className="gap-4">
          <Input
            name="email"
            label="Email"
            className="col-span-6"
            isInvalid={!!state.errors.email}
            errorMessage={state.errors.email}
          />
          <PasswordInput
            name="password"
            label="Senha"
            className="col-span-6"
            isInvalid={!!state.errors.password}
            errorMessage={state.errors.password}
          />
        </CardBody>
        <CardFooter className="pb-4">
          <SubmitButton color="primary" variant="shadow" fullWidth>
            Entrar
          </SubmitButton>
        </CardFooter>
      </Card>

      <div className="flex gap-2 items-center">
        <div className="grow">
          <Divider />
        </div>
        <p className="text-default-400 text-tiny">OU</p>
        <div className="grow">
          <Divider />
        </div>
      </div>

      <Button onClick={() => signIn("google")}>Entrar com Google</Button>

      <div className="flex gap-4 justify-center items-center text-tiny text-foreground-400">
        Não tem uma conta?
        <Button
          as={Link}
          href="/auth/cadastro"
          variant="light"
          color="secondary"
          size="sm"
        >
          Faça seu cadastro
        </Button>
      </div>
    </form>
  );
}
