"use client";

import { Card, CardBody, CardHeader, SelectItem } from "@nextui-org/react";
import { DocType } from "@prisma/client";
import { Input, Select } from "../ui/forms/fields";

type IProps = {
  title: string;
};

export default function AccountForm({ title }: IProps) {
  return (
    <Card>
      <CardHeader>
        <h2>{title}</h2>
      </CardHeader>
      <CardBody className="gap-4 grid md:grid-cols-12 grid-cols-1">
        <Input
          name="account.fullname"
          label="Nome completo"
          className="col-span-6"
        />
        <Input
          name="account.professional_number"
          label="Número CRBM"
          className="col-span-6"
        />
        <Select
          name="account.document_type"
          label="Tipo de documento"
          items={Object.values(DocType).map((value) => ({ value }))}
          // defaultSelectedKeys={[DocType.CPF]}
          className="col-span-4"
        >
          {(item) => <SelectItem key={item.value}>{item.value}</SelectItem>}
        </Select>
        <Input
          name="account.document"
          label="CPF/CNPJ"
          className="col-span-8"
        />
      </CardBody>
    </Card>
  );
}
