"use client";

import { useRouter } from "next/navigation";
import { Customer } from "@/types/schemas";
import { toast } from "sonner";
import FormButton, { SubmitButton } from "../ui/FormButton";
import { customerService } from "@/backend/services/customers";
import { customerAction } from "@/backend/actions/customers";
import { customerSchema } from "@/utils/validation/schema/customer";
import { DatePicker, Form, Input } from "../ui/forms/fields";
import { mask } from "@/utils/mask";

type Props = {
  customer?: Customer;
};

export default function CustomerForm({ customer }: Props) {
  const router = useRouter();

  async function submit(formData: FormData | Customer) {
    return customer
      ? await customerAction.update(customer.id, formData)
      : await customerAction.create(formData);
  }

  return (
    <Form
      className="w-full max-w-2xl flex flex-wrap gap-4 items-start"
      schema={customer ? customerSchema.update : customerSchema.create}
      defaultValues={customer}
      action={submit}
      onSuccess={(res) => {
        toast.success(res.message);
        if (!customer) router.push("/clientes");
      }}
      onError={(res) => {
        if (res.response?.message) toast.error(res.response?.message);
      }}
    >
      <Input name="name" label="Nome do cliente" isRequired />
      <Input name="email" label="E-mail do cliente" />
      <Input name="phone" label="Telefone do cliente" mask={mask.phone} />
      <DatePicker
        name="birthday"
        label="Aniversário do cliente"
        granularity="day"
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
            Excluir
          </FormButton>
        )}

        <SubmitButton color="primary">
          {customer ? "Atualizar" : "Cadastrar"}
        </SubmitButton>
      </div>
    </Form>
  );
}
