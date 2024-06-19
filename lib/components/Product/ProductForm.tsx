"use client";

import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useFormState } from "react-dom";
import { MutationResult } from "../../../types/types";
import { productActions } from "@/backend/actions/products";
import { Product } from "../../../types/schemas";
import { toast } from "sonner";

const units = [
  "Unidades",
  "Kilos",
  "Gramas",
  "Litros",
  "Mililitros",
  "Metros",
  "Centímetros",
  "Caixas",
];

type ProductFormProps = {
  product?: Product;
  actionFn: (product: FormData) => Promise<MutationResult<Product | null>>;
};

export default function ProductForm({ product, actionFn }: ProductFormProps) {
  const router = useRouter();
  const [state, formAction] = useFormState(submitAction, {
    success: true,
    errors: {},
  } as MutationResult);

  async function submitAction(status: MutationResult, formData: FormData) {
    const response = await actionFn(formData);

    if (response.success) {
      toast.success("Salvo com sucesso!");

      if (!product && response.data?.id) {
        router.push(`/products/${response.data.id}`);
      }
    } else {
      toast.error("Confira os campos e tente novamente");
    }

    return response;
  }

  return (
    <form
      action={formAction}
      className="w-full max-w-2xl flex flex-wrap gap-4 items-start"
      noValidate
    >
      <Input name="id" defaultValue={product?.id} className="hidden" />

      <Input
        name="name"
        label="Nome do produto"
        defaultValue={product?.name}
        isRequired
        className="w-full"
        isInvalid={!!state.errors.name}
        errorMessage={state.errors.name}
      />

      <Input
        name="stock"
        label="Quantidade atual"
        // defaultValue={product?.stock?.toString()}
        type="number"
        isRequired
        className="w-60 grow"
        isInvalid={!!state.errors.stock}
        errorMessage={state.errors.stock}
      />

      <Select
        name="unit"
        label="Unidade de medida"
        defaultSelectedKeys={product?.unit ? [product?.unit] : [units[0]]}
        isRequired
        className="w-60 grow"
        isInvalid={!!state.errors.unit}
        errorMessage={state.errors.unit}
      >
        {units.map((unit) => (
          <SelectItem value={unit} key={unit} title={unit}></SelectItem>
        ))}
      </Select>

      <Input
        name="minStock"
        label="Estoque mínimo"
        defaultValue={product?.minStock?.toString()}
        type="number"
        className="w-60 grow"
        isInvalid={!!state.errors.minStock}
        errorMessage={state.errors.minStock}
      />

      <Input
        name="code"
        label="Código do produto"
        defaultValue={product?.code}
        className="w-60 grow"
        isInvalid={!!state.errors.code}
        errorMessage={state.errors.code}
      />

      <div className="w-full flex gap-4">
        {product && (
          <Button
            color="danger"
            variant="light"
            onClick={async () => {
              const deleted = await productActions.remove(product.id);
              if (deleted.data) router.push("/");
            }}
          >
            Deletar produto
          </Button>
        )}
        <Button type="submit" color="primary">
          {product ? "Atualizar" : "Cadastrar"}
        </Button>
      </div>
    </form>
  );
}
