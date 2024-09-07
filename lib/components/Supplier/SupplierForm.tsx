"use client";

import { useRouter } from "next/navigation";
import { useFormState } from "react-dom";
import { ServiceResult } from "@/types/types";
import { Supplier } from "@/types/schemas";
import { toast } from "sonner";
import FormButton, { SubmitButton } from "../ui/FormButton";
import { supplierService } from "@/backend/services/suppliers";
import { mask } from "@/utils/mask";
import Input from "../ui/forms/atoms/Input/Input";

type Props = {
  supplier?: Supplier;
};

export default function SupplierForm({ supplier }: Props) {
  const router = useRouter();
  const [state, formAction] = useFormState(submitAction, {
    success: true,
    fieldErrors: {},
  } as ServiceResult<Supplier>);

  async function submitAction(status: ServiceResult, formData: FormData) {
    const response = supplier
      ? await supplierService.update(supplier.id, formData)
      : await supplierService.create(formData);

    if (response.success) {
      toast.success("Salvo com sucesso!");

      if (!supplier) {
        router.push("/fornecedores");
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
        label="Nome do fornecedor"
        defaultValue={supplier?.name}
        isRequired
        className="w-full"
        isInvalid={!!state.fieldErrors.name}
        errorMessage={state.fieldErrors.name}
      />

      <Input
        name="cnpj"
        label="CNPJ do fornecedor"
        defaultValue={mask.cnpj(supplier?.cnpj)}
        className="w-full"
        isInvalid={!!state.fieldErrors.cnpj}
        errorMessage={state.fieldErrors.cnpj}
      />

      <Input
        name="email"
        label="E-mail do fornecedor"
        defaultValue={supplier?.email}
        className="w-full"
        isInvalid={!!state.fieldErrors.email}
        errorMessage={state.fieldErrors.email}
      />

      <Input
        name="phone"
        label="Telefone do fornecedor"
        defaultValue={supplier?.phone}
        className="w-full"
        isInvalid={!!state.fieldErrors.phone}
        errorMessage={state.fieldErrors.phone}
      />

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
    </form>
  );
}
