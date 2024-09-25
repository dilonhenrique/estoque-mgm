"use client";

import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { ServiceResult } from "@/types/types";
import PasswordInput from "../PasswordInput/PasswordInput";
import { useSearchParams } from "next/navigation";
import { Input } from "../ui/forms/fields";

type IProps = {
  title: string;
};

export default function UserForm({ title }: IProps) {
  // const searchParams = useSearchParams();
  // const params = Object.fromEntries(searchParams);

  return (
    <Card>
      <CardHeader>
        <h2>{title}</h2>
      </CardHeader>
      <CardBody className="gap-4 grid md:grid-cols-12 grid-cols-2">
        <Input
          name="user.img_url"
          label="Avatar"
          // defaultValue={params.img_url}
          className="col-span-6 hidden"
          // isInvalid={!!formState.fieldErrors.img_url}
          // errorMessage={formState.fieldErrors.img_url}
        />
        <Input
          name="user.name"
          label="Nome"
          // defaultValue={params.name}
          className="col-span-6"
          // isInvalid={!!formState.fieldErrors.name}
          // errorMessage={formState.fieldErrors.name}
        />
        <Input
          name="user.email"
          label="Email"
          // defaultValue={params.email}
          className="col-span-6"
          // isInvalid={!!formState.fieldErrors.email}
          // errorMessage={formState.fieldErrors.email}
        />
        <PasswordInput
          name="user.password"
          label="Senha"
          className="col-span-6"
          // isInvalid={!!formState.fieldErrors.password}
          // errorMessage={formState.fieldErrors.password}
        />
        <PasswordInput
          name="user.confirm_password"
          label="Confirme sua senha"
          className="col-span-6"
          // isInvalid={!!formState.fieldErrors.confirm_password}
          // errorMessage={formState.fieldErrors.confirm_password}
        />
      </CardBody>
    </Card>
  );
}
