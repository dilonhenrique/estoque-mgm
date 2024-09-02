"use client";

import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useFormState } from "react-dom";
import { MutationResult } from "@/types/types";
import { productService } from "@/backend/services/products";
import { Product } from "@/types/schemas";
import { toast } from "sonner";
import FormButton, { SubmitButton } from "../ui/FormButton";
import CategoryAutocomplete from "../ui/forms/custom/CategoryAutocomplete/CategoryAutocomplete";
import IncreaserInput from "../ui/forms/atoms/IncreaserInput/IncreaserInput";
import { Pencil } from "lucide-react";
import ModalStockEdit from "./StockEdit/ModalStockEdit";
import { useState } from "react";
import Input from "../ui/forms/atoms/Input/Input";

type ProductFormProps = {
  product?: Product;
  actionFn: (product: FormData) => Promise<MutationResult<Product | null>>;
};

export default function ProductForm({ product, actionFn }: ProductFormProps) {
  const router = useRouter();
  const [isStockOpen, setStockOpen] = useState(false);
  const [state, formAction] = useFormState(submitAction, {
    success: true,
    errors: {},
  } as MutationResult);

  async function submitAction(status: MutationResult, formData: FormData) {
    const response = await actionFn(formData);

    if (response.success) {
      toast.success("Salvo com sucesso!");

      if (!product) {
        router.push("/produtos");
      }
    } else {
      toast.error("Confira os campos e tente novamente");
    }

    return response;
  }

  return (
    <>
      <form
        className="w-full max-w-2xl flex flex-wrap gap-4 items-start"
        action={formAction}
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

        {product ? (
          <Input
            label="Quantidade atual"
            className="w-60 grow"
            defaultValue={product.stock.toString()}
            isReadOnly
            endContent={
              <Button
                variant="ghost"
                isIconOnly
                radius="full"
                className="-mb-0.5"
                onPress={() => setStockOpen(true)}
              >
                <Pencil className="text-foreground-500" size={16} />
              </Button>
            }
          />
        ) : (
          <IncreaserInput
            name="stock"
            label="Quantidade atual"
            min={0}
            defaultValue="0"
            isRequired
            className="w-44 grow"
            isInvalid={!!state.errors.stock}
            errorMessage={state.errors.stock}
          />
        )}

        {/* <Select
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
      </Select> */}

        <Input
          name="unit"
          label="Unidade de medida"
          defaultValue={product?.unit}
          isRequired
          className="w-60 grow"
          isInvalid={!!state.errors.unit}
          errorMessage={state.errors.unit}
        />

        <Input
          name="minStock"
          label="Estoque mínimo"
          defaultValue={product?.minStock?.toString()}
          type="number"
          className="w-60 grow"
          isInvalid={!!state.errors.minStock}
          errorMessage={state.errors.minStock}
        />

        <CategoryAutocomplete
          name="category"
          label="Categoria"
          placeholder="Escolha ou digite uma categoria"
          allowsCustomValue
          defaultSelectedKey={product?.category?.id}
          className="w-60 grow"
          isInvalid={!!state.errors.category_id}
          errorMessage={state.errors.category_id}
        />

        <Input
          name="code"
          label="Código do produto"
          defaultValue={product?.code}
          className="w-60 grow"
          isInvalid={!!state.errors.code}
          errorMessage={state.errors.code}
        />

        <div className="w-full flex justify-end gap-4">
          {product && (
            <FormButton
              color="danger"
              variant="light"
              onClick={async () => {
                if (confirm("Tem certeza que deseja excluir este produto?")) {
                  const deleted = await productService.remove(product.id);
                  if (deleted.data) router.push("/");
                }
              }}
            >
              Excluir
            </FormButton>
          )}

          <SubmitButton type="submit" color="primary">
            {product ? "Atualizar" : "Cadastrar"}
          </SubmitButton>
        </div>
      </form>

      {product && (
        <ModalStockEdit
          product={product}
          isOpen={isStockOpen}
          onClose={() => setStockOpen(false)}
        />
      )}
    </>
  );
}

// const units = [
//   "Unidades",
//   "Kilos",
//   "Gramas",
//   "Litros",
//   "Mililitros",
//   "Metros",
//   "Centímetros",
//   "Caixas",
// ];
