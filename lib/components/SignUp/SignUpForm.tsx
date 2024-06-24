"use client";

import {
  Card,
  CardBody,
  CardHeader,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { DocType } from "@prisma/client";
import { SubmitButton } from "../ui/FormButton";
import { useRouter, useSearchParams } from "next/navigation";
import { useFormState } from "react-dom";
import { MutationResult } from "../../../types/types";
import { accountService } from "@/backend/services/accounts";
import { toast } from "sonner";
import PasswordInput from "../PasswordInput/PasswordInput";

export default function SignUpForm() {
  const searchParams = useSearchParams();
  const params = Object.fromEntries(searchParams);

  const router = useRouter();
  const [state, formAction] = useFormState(submitAction, {
    success: true,
    errors: {},
  } as MutationResult);

  async function submitAction(status: MutationResult, formData: FormData) {
    const response = await accountService.create(formData);

    if (response.success) {
      toast.success("Conta criada com sucesso!");
      router.push("/auth/login");
    } else {
      toast.error("Confira os campos e tente novamente");
    }

    return response;
  }

  return (
    <form
      className="w-full gap-4 flex flex-col max-w-5xl"
      action={formAction}
      noValidate
    >
      <Card>
        <CardHeader>
          <h2>Dados profissionais</h2>
        </CardHeader>
        <CardBody className="gap-4 grid md:grid-cols-12 grid-cols-1">
          <Input
            name="fullname"
            label="Nome completo"
            className="col-span-6"
            isInvalid={!!state.errors.fullname}
            errorMessage={state.errors.fullname}
          />
          <Input
            name="professional_number"
            label="Número CRBM"
            className="col-span-6"
            isInvalid={!!state.errors.professional_number}
            errorMessage={state.errors.professional_number}
          />
          <Select
            name="document_type"
            label="Tipo de documento"
            items={Object.values(DocType).map((value) => ({ value }))}
            defaultSelectedKeys={[DocType.CPF]}
            className="col-span-4"
            isInvalid={!!state.errors.document_type}
            errorMessage={state.errors.document_type}
          >
            {(item) => <SelectItem key={item.value}>{item.value}</SelectItem>}
          </Select>
          <Input
            name="document"
            label="CPF/CNPJ"
            className="col-span-8"
            isInvalid={!!state.errors.document}
            errorMessage={state.errors.document}
          />
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <h2>Endereço profissional</h2>
        </CardHeader>
        <CardBody className="gap-4 grid md:grid-cols-12 grid-cols-2">
          <Input
            name="zip_code"
            label="CEP"
            className="max-w-md col-span-12"
            isInvalid={!!state.errors.zip_code}
            errorMessage={state.errors.zip_code}
          />
          <Input
            name="country"
            label="País"
            className="col-span-4"
            isInvalid={!!state.errors.country}
            errorMessage={state.errors.country}
          />
          <Input
            name="state"
            label="Estado"
            className="col-span-2"
            isInvalid={!!state.errors.state}
            errorMessage={state.errors.state}
          />
          <Input
            name="city"
            label="Cidade"
            className="col-span-6"
            isInvalid={!!state.errors.city}
            errorMessage={state.errors.city}
          />
          <Input
            name="neighborhood"
            label="Bairro"
            className="col-span-6"
            isInvalid={!!state.errors.neighborhood}
            errorMessage={state.errors.neighborhood}
          />
          <Input
            name="street"
            label="Endereço"
            className="col-span-6"
            isInvalid={!!state.errors.street}
            errorMessage={state.errors.street}
          />
          <Input
            name="number"
            label="Número"
            className="col-span-6"
            isInvalid={!!state.errors.number}
            errorMessage={state.errors.number}
          />
          <Input
            name="complement"
            label="Complemento"
            className="col-span-6"
            isInvalid={!!state.errors.complement}
            errorMessage={state.errors.complement}
          />
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <h2>Usuário</h2>
        </CardHeader>
        <CardBody className="gap-4 grid md:grid-cols-12 grid-cols-2">
          <Input
            name="img_url"
            label="Avatar"
            defaultValue={params.img_url}
            className="col-span-6 hidden"
            isInvalid={!!state.errors.img_url}
            errorMessage={state.errors.img_url}
          />
          <Input
            name="name"
            label="Nome"
            defaultValue={params.name}
            className="col-span-6"
            isInvalid={!!state.errors.name}
            errorMessage={state.errors.name}
          />
          <Input
            name="email"
            label="Email"
            defaultValue={params.email}
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
          <PasswordInput
            name="confirm_password"
            label="Confirme sua senha"
            className="col-span-6"
            isInvalid={!!state.errors.confirm_password}
            errorMessage={state.errors.confirm_password}
          />
        </CardBody>
      </Card>

      <div className="flex gap-4 justify-end col-span-full">
        <SubmitButton color="primary" variant="shadow">
          Cadastrar
        </SubmitButton>
      </div>
    </form>
  );
}
