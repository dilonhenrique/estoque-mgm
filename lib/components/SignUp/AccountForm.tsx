"use client";

import {
  Card,
  CardBody,
  CardHeader,
  SelectItem,
} from "@nextui-org/react";
import { ServiceResult } from "@/types/types";
import { DocType } from "@prisma/client";
import Select from "../ui/forms/atoms/Select/Select";
import Input from "../ui/forms/atoms/Input/Input";

type IProps = {
  title: string;
  formState: ServiceResult;
};

export default function AccountForm({ title, formState }: IProps) {
  return (
    <Card>
      <CardHeader>
        <h2>{title}</h2>
      </CardHeader>
      <CardBody className="gap-4 grid md:grid-cols-12 grid-cols-1">
        <Input
          name="fullname"
          label="Nome completo"
          className="col-span-6"
          isInvalid={!!formState.fieldErrors.fullname}
          errorMessage={formState.fieldErrors.fullname}
        />
        <Input
          name="professional_number"
          label="Número CRBM"
          className="col-span-6"
          isInvalid={!!formState.fieldErrors.professional_number}
          errorMessage={formState.fieldErrors.professional_number}
        />
        <Select
          name="document_type"
          label="Tipo de documento"
          items={Object.values(DocType).map((value) => ({ value }))}
          defaultSelectedKeys={[DocType.CPF]}
          className="col-span-4"
          isInvalid={!!formState.fieldErrors.document_type}
          errorMessage={formState.fieldErrors.document_type}
        >
          {(item) => <SelectItem key={item.value}>{item.value}</SelectItem>}
        </Select>
        <Input
          name="document"
          label="CPF/CNPJ"
          className="col-span-8"
          isInvalid={!!formState.fieldErrors.document}
          errorMessage={formState.fieldErrors.document}
        />
      </CardBody>
    </Card>
  );
}
