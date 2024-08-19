"use client";

import { DatePicker, Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useFormState } from "react-dom";
import { MutationResult } from "../../../types/types";
import { Customer } from "../../../types/schemas";
import { toast } from "sonner";
import FormButton, { SubmitButton } from "../ui/FormButton";
import { customerService } from "@/backend/services/customers";
import { parseAbsoluteToLocal } from "@internationalized/date";

type CustomerFormProps = {
  customer?: Customer;
};

export default function CustomerForm({ customer }: CustomerFormProps) {
  const router = useRouter();
  const [state, formAction] = useFormState(submitAction, {
    success: true,
    errors: {},
  } as MutationResult<Customer>);

  async function submitAction(status: MutationResult, formData: FormData) {
    const response = customer
      ? await customerService.update(customer.id, formData)
      : await customerService.create(formData);

    if (response.success) {
      toast.success("Salvo com sucesso!");

      if (!customer) {
        router.push("/clientes");
      }
    } else {
      toast.error("Confira os campos e tente novamente");
    }

    return response;
  }

  return (
    <form
      className="w-full max-w-2xl flex flex-wrap gap-4 items-start"
      action={formAction}
      noValidate
    >
      <Input
        name="name"
        label="Nome do cliente"
        defaultValue={customer?.name}
        isRequired
        className="w-full"
        isInvalid={!!state.errors.name}
        errorMessage={state.errors.name}
      />

      <Input
        name="email"
        label="E-mail do cliente"
        defaultValue={customer?.email}
        className="w-full"
        isInvalid={!!state.errors.email}
        errorMessage={state.errors.email}
      />

      <Input
        name="phone"
        label="Telefone do cliente"
        defaultValue={customer?.phone}
        className="w-full"
        isInvalid={!!state.errors.phone}
        errorMessage={state.errors.phone}
      />

      <DatePicker
        name="birthday"
        label="Aniversário do cliente"
        defaultValue={
          customer?.birthday
            ? parseAbsoluteToLocal(customer?.birthday.toISOString())
            : undefined
        }
        className="w-full"
        isInvalid={!!state.errors.birthday}
        errorMessage={state.errors.birthday}
      />

      <div className="w-full flex justify-end gap-4">
        {customer && (
          <FormButton
            color="danger"
            variant="light"
            onClick={async () => {
              if (confirm("Tem certeza que deseja excluir este cliente?")) {
                const deleted = await customerService.remove(customer.id);
                if (deleted) router.push("/");
              }
            }}
          >
            Deletar cliente
          </FormButton>
        )}

        <SubmitButton type="submit" color="primary">
          {customer ? "Atualizar" : "Cadastrar"}
        </SubmitButton>
      </div>
    </form>
  );
}
