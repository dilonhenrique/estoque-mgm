"use client";

import { Card, CardBody, CardHeader } from "@nextui-org/react";
import PasswordInput from "../PasswordInput/PasswordInput";
import { Input } from "../ui/forms/fields";

type IProps = {
  title: string;
};

export default function UserForm({ title }: IProps) {
  return (
    <Card>
      <CardHeader>
        <h2>{title}</h2>
      </CardHeader>
      <CardBody className="gap-4 grid md:grid-cols-12 grid-cols-2">
        <Input
          name="user.img_url"
          label="Avatar"
          className="col-span-6 hidden"
        />
        <Input name="user.name" label="Nome" className="col-span-6" />
        <Input name="user.email" label="Email" className="col-span-6" />
        <PasswordInput
          name="user.password"
          label="Senha"
          className="col-span-6"
        />
        <PasswordInput
          name="user.confirm_password"
          label="Confirme sua senha"
          className="col-span-6"
        />
      </CardBody>
    </Card>
  );
}
