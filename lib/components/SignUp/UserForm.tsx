"use client";

import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { MutationResult } from "@/types/types";
import PasswordInput from "../PasswordInput/PasswordInput";
import { useSearchParams } from "next/navigation";
import Input from "../ui/forms/atoms/Input/Input";

type IProps = {
  title: string;
  formState: MutationResult;
};

export default function UserForm({ title, formState }: IProps) {
  const searchParams = useSearchParams();
  const params = Object.fromEntries(searchParams);

  return (
    <Card>
      <CardHeader>
        <h2>{title}</h2>
      </CardHeader>
      <CardBody className="gap-4 grid md:grid-cols-12 grid-cols-2">
        <Input
          name="img_url"
          label="Avatar"
          defaultValue={params.img_url}
          className="col-span-6 hidden"
          isInvalid={!!formState.errors.img_url}
          errorMessage={formState.errors.img_url}
        />
        <Input
          name="name"
          label="Nome"
          defaultValue={params.name}
          className="col-span-6"
          isInvalid={!!formState.errors.name}
          errorMessage={formState.errors.name}
        />
        <Input
          name="email"
          label="Email"
          defaultValue={params.email}
          className="col-span-6"
          isInvalid={!!formState.errors.email}
          errorMessage={formState.errors.email}
        />
        <PasswordInput
          name="password"
          label="Senha"
          className="col-span-6"
          isInvalid={!!formState.errors.password}
          errorMessage={formState.errors.password}
        />
        <PasswordInput
          name="confirm_password"
          label="Confirme sua senha"
          className="col-span-6"
          isInvalid={!!formState.errors.confirm_password}
          errorMessage={formState.errors.confirm_password}
        />
      </CardBody>
    </Card>
  );
}
