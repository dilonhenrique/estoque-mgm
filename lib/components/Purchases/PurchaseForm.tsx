"use client";

import { useRouter } from "next/navigation";
import { useFormState } from "react-dom";
import { MutationResult } from "@/types/types";
import { Purchase } from "@/types/schemas";
import { toast } from "sonner";
import FormButton, { SubmitButton } from "../ui/FormButton";
import ProductSelector from "../ProductSelector/ProductSelector";
import { useState } from "react";
import { purchaseService } from "@/backend/services/purchases";
import SupplierAutocomplete from "../ui/SupplierAutocomplete/SupplierAutocomplete";

type Props = {
  purchase?: Purchase;
};

export default function PurchaseForm({ purchase }: Props) {
  const router = useRouter();
  const [products, setProducts] = useState(purchase?.items ?? []);
  const [state, formAction] = useFormState(submitAction, {
    success: true,
    errors: {},
  } as MutationResult<Purchase>);

  async function submitAction(status: MutationResult, formData: FormData) {
    const payload = {
      ...Object.fromEntries(formData),
      products:
        products?.map((item) => ({
          id: item.id,
          qty: item.qty,
          cost: item.cost,
        })) ?? [],
    };

    const response = purchase
      ? await purchaseService.update(purchase.id, payload)
      : await purchaseService.create(payload);

    if (response.success) {
      toast.success("Salvo com sucesso!");

      if (!purchase) {
        router.push("/compras");
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
      <SupplierAutocomplete
        name="supplier_id"
        label="Fornecedor"
        placeholder="Escolha um fornecedor"
        allowsCustomValue
        defaultSelectedKey={purchase?.supplier?.id}
        className="w-60 grow"
        isInvalid={!!state.errors.customer_id}
        errorMessage={state.errors.customer_id}
      />

      <div className="w-full">
        <h4 className="text-content4-foreground mb-2">Produtos comprados:</h4>
        <ProductSelector value={products} onValueChange={setProducts} />
      </div>

      <div className="w-full flex justify-end gap-4">
        {purchase && (
          <FormButton
            color="danger"
            variant="light"
            onClick={async () => {
              if (confirm("Tem certeza que deseja excluir esta compra?")) {
                const deleted = await purchaseService.remove(purchase.id);
                if (deleted) router.push("/compras");
              }
            }}
          >
            Excluir
          </FormButton>
        )}

        <SubmitButton type="submit" color="primary">
          {purchase ? "Atualizar" : "Cadastrar"}
        </SubmitButton>
      </div>
    </form>
  );
}
