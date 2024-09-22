"use client";

import { useRouter } from "next/navigation";
import { Purchase } from "@/types/schemas";
import { toast } from "sonner";
import FormButton, { SubmitButton } from "../ui/FormButton";
import ProductSelector from "../ProductSelector/ProductSelector";
import { purchaseService } from "@/backend/services/purchases";
import SupplierAutocomplete from "../ui/forms/custom/SupplierAutocomplete/SupplierAutocomplete";
import { purchaseAction } from "@/backend/actions/purchases";
import { purchaseSchema } from "@/utils/validation/schema/purchase";
import { useState } from "react";
import { Form } from "../ui/forms/fields";

type Props = {
  purchase?: Purchase;
};

export default function PurchaseForm({ purchase }: Props) {
  const router = useRouter();

  const [refresh, setRefresh] = useState(false);
  const refreshProducts = () => setRefresh((prod) => !prod);

  async function submitAction(formData: FormData | Purchase) {
    return purchase
      ? await purchaseAction.update(purchase.id, formData)
      : await purchaseAction.create(formData);
  }

  return (
    <Form
      className="w-full max-w-2xl flex flex-wrap gap-4 items-start"
      schema={purchaseSchema}
      defaultValues={purchase}
      action={submitAction}
      onSuccess={(res) => {
        toast.success(res.message);
        if (!purchase) {
          router.push("/compras");
        } else {
          refreshProducts();
        }
      }}
      onError={(res) => {
        if (res.response?.message) toast.error(res.response?.message);
      }}
    >
      <SupplierAutocomplete
        name="supplier.id"
        label="Fornecedor"
        placeholder="Escolha um fornecedor"
        allowsCustomValue
        className="w-60 grow"
      />

      <div className="w-full">
        <h4 className="text-content4-foreground mb-2">Produtos comprados:</h4>
        <ProductSelector
          arrayName="items"
          defaultValue={purchase?.items}
          refreshItems={refresh}
        />
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
    </Form>
  );
}
