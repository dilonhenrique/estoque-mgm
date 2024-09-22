"use client";

import { useRouter } from "next/navigation";
import { Supplier } from "@/types/schemas";
import { toast } from "sonner";
import FormButton, { SubmitButton } from "../ui/FormButton";
import { supplierService } from "@/backend/services/suppliers";
import { supplierSchema } from "@/utils/validation/schema/supplier";
import { supplierAction } from "@/backend/actions/suppliers";
import { Form, Input } from "../ui/forms/fields";

type Props = {
  supplier?: Supplier;
};

export default function SupplierForm({ supplier }: Props) {
  const router = useRouter();

  async function submit(formData: FormData | Supplier) {
    return supplier
      ? await supplierAction.update(supplier.id, formData)
      : await supplierAction.create(formData);
  }

  return (
    <Form
      className="w-full max-w-2xl flex flex-wrap gap-4 items-start"
      schema={supplier ? supplierSchema.update : supplierSchema.create}
      defaultValues={supplier}
      action={submit}
      onSuccess={(res) => {
        toast.success(res.message);
        if (!supplier) router.push("/fornecedores");
      }}
      onError={(res) => {
        if (res.response?.message) toast.error(res.response?.message);
      }}
    >
      <Input
        name="name"
        label="Nome do fornecedor"
        isRequired
        className="w-full"
      />
      {/* TODO: mask */}
      <Input name="cnpj" label="CNPJ do fornecedor" className="w-full" />{" "}
      <Input name="email" label="E-mail do fornecedor" className="w-full" />
      <Input name="phone" label="Telefone do fornecedor" className="w-full" />
      <div className="w-full flex justify-end gap-4">
        {supplier && (
          <FormButton
            color="danger"
            variant="light"
            onClick={async () => {
              if (confirm("Tem certeza que deseja excluir este fornecedor?")) {
                const deleted = await supplierService.remove(supplier.id);
                if (deleted) router.push("/");
              }
            }}
          >
            Excluir
          </FormButton>
        )}

        <SubmitButton type="submit" color="primary">
          {supplier ? "Atualizar" : "Cadastrar"}
        </SubmitButton>
      </div>
    </Form>
  );
}
