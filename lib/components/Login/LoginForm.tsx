"use client";

import { Button, Card, CardBody, CardFooter, Divider } from "@nextui-org/react";
import { SubmitButton } from "../ui/FormButton";
import { useRouter } from "next/navigation";
import { AnyObject } from "@/types/types";
import { toast } from "sonner";
import PasswordInput from "../PasswordInput/PasswordInput";
import { signIn } from "next-auth/react";
import Link from "next/link";
import Input from "../ui/forms/atoms/Input/Input";
import { loginSchema } from "@/utils/validation/schema/login";
import { Form } from "../ui/forms/atoms/Form/Form";
import { authAction } from "@/backend/actions/auth";

export default function LoginForm() {
  const router = useRouter();

  async function submit(formData: FormData | AnyObject) {
    return await authAction.login(formData);
  }

  return (
    <Form
      className="w-full gap-4 flex flex-col max-w-lg"
      schema={loginSchema}
      action={submit}
      onSuccess={(res) => {
        toast.success(res.message);
        router.push("/");
      }}
      onError={(res) => {
        if (res.response?.message) toast.error(res.response?.message);
      }}
    >
      <Card>
        <CardBody className="gap-4">
          <Input name="email" label="Email" className="col-span-6" />
          <PasswordInput name="password" label="Senha" className="col-span-6" />
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
    </Form>
  );
}
