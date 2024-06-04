"use client";

import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { Product } from "../../../types/schemas";
import { WithStringId } from "@/utils/parseUtils";
import { useFormState } from "react-dom";
import { ActionResult } from "../../../types/types";
import { productActions } from "@/backend/actions/products";

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
  product?: WithStringId<Partial<Product>>;
};

export default function ProductForm({ product }: ProductFormProps) {
  const router = useRouter();
  const [state, formAction] = useFormState(submitAction, {
    success: true,
    errors: [],
  } as ActionResult);

  async function submitAction(status: ActionResult, formData: FormData) {
    if (product) {
      const response = await productActions.update(formData);
      if (response.success) alert("Alterado com sucesso!");
      return response;
    } else {
      const response = await productActions.create(formData);
      if (response.success) router.push(`/products/${response.data}`);
      return response;
    }
  }

  return (
    <form
      action={formAction}
      className="w-full max-w-2xl flex flex-wrap gap-4 items-start"
      noValidate
    >
      <Input name="_id" defaultValue={product?._id} className="hidden" />

      <Input
        name="name"
        label="Nome do produto"
        defaultValue={product?.name}
        isRequired
        className="w-full"
        isInvalid={!!state.errors.find((error) => error.path.includes("name"))}
        errorMessage={
          state.errors.find((error) => error.path.includes("name"))?.message
        }
      />

      <Input
        name="stock"
        label="Quantidade atual"
        defaultValue={product?.stock?.toString()}
        type="number"
        isRequired
        className="w-60 grow"
        isInvalid={!!state.errors.find((error) => error.path.includes("stock"))}
        errorMessage={
          state.errors.find((error) => error.path.includes("stock"))?.message
        }
      />

      <Select
        name="unit"
        label="Unidade de medida"
        defaultSelectedKeys={
          product?.unit ? [product?.unit?.toString()] : [units[0]]
        }
        isRequired
        className="w-60 grow"
        isInvalid={!!state.errors.find((error) => error.path.includes("unit"))}
        errorMessage={
          state.errors.find((error) => error.path.includes("unit"))?.message
        }
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
        isInvalid={
          !!state.errors.find((error) => error.path.includes("min_stock"))
        }
        errorMessage={
          state.errors.find((error) => error.path.includes("min_stock"))
            ?.message
        }
      />

      <Input
        name="code"
        label="Código do produto"
        defaultValue={product?.code}
        className="w-60 grow"
        isInvalid={!!state.errors.find((error) => error.path.includes("code"))}
        errorMessage={
          state.errors.find((error) => error.path.includes("code"))?.message
        }
      />

      <Input
        name="brand"
        label="Marca do produto"
        defaultValue={product?.brand}
        className="w-60 grow"
        isInvalid={!!state.errors.find((error) => error.path.includes("brand"))}
        errorMessage={
          state.errors.find((error) => error.path.includes("brand"))?.message
        }
      />

      <div className="w-full flex gap-4">
        {product && (
          <Button
            color="danger"
            variant="light"
            onClick={async () => {
              const deleted = await productActions.remove(product._id);
              if (deleted) router.push("/");
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
