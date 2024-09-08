"use client";

import { useRouter } from "next/navigation";
import { Purchase } from "@/types/schemas";
import { toast } from "sonner";
import FormButton, { SubmitButton } from "../ui/FormButton";
import ProductSelector from "../ProductSelector/ProductSelector";
import { useState } from "react";
import { purchaseService } from "@/backend/services/purchases";
import SupplierAutocomplete from "../ui/forms/custom/SupplierAutocomplete/SupplierAutocomplete";
import { Form } from "../ui/forms/atoms/Form/Form";
import { purchaseAction } from "@/backend/actions/purchases";
import { purchaseSchema } from "@/utils/validation/schema/purchase";

type Props = {
  purchase?: Purchase;
};

export default function PurchaseForm({ purchase }: Props) {
  const router = useRouter();
  const [products, setProducts] = useState(purchase?.items ?? []);

  const [refreshItems, setRefreshItems] = useState(true);
  const refreshProducts = () => setRefreshItems(!refreshItems);

  async function submitAction(formData: FormData | Purchase) {
    const data =
      formData instanceof FormData ? Object.fromEntries(formData) : formData;
    const payload = {
      ...data,
      products:
        products?.map((item) => ({
          id: item.id,
          qty: item.qty,
          cost: item.cost,
        })) ?? [],
    };

    return purchase
      ? await purchaseAction.update(purchase.id, payload)
      : await purchaseAction.create(payload);
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
          value={products}
          onValueChange={setProducts}
          refreshItems={refreshItems}
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
