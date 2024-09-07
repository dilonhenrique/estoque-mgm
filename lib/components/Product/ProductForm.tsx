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
import { Form } from "../ui/forms/atoms/Form/Form";
import { z } from "zod";

type Props = {
  product?: Product;
};

const schema = z.object({
  id: z.string(),
  name: z.string().optional(),
  unit: z.string().optional(),
  stock: z.coerce.number().optional(),
  minStock: z.coerce.number().optional(),
  code: z.string().optional(),
  category: z.string().optional(),
  img_url: z.string().optional(),
});

export default function ProductForm({ product }: Props) {
  const router = useRouter();
  const [isStockOpen, setStockOpen] = useState(false);

  async function submit(formData: FormData | Product) {
    return product
      ? await productService.update(product.id, formData)
      : await productService.create(formData);
  }

  return (
    <>
      <Form
        className="w-full max-w-2xl flex flex-wrap gap-4 items-start"
        schema={schema}
        defaultValues={product}
        action={submit}
        onSuccess={() => {
          toast.success("Salvo com sucesso!");
          if (!product) router.push("/produtos");
        }}
        onError={() => {
          toast.error("Confira os campos e tente novamente");
        }}
      >
        <Input
          name="name"
          label="Nome do produto"
          isRequired
          className="w-full"
        />

        {product ? (
          <Input
            label="Quantidade atual"
            className="w-60 grow"
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
            isRequired
            className="sm:w-48"
          />
        )}

        <Input
          name="unit"
          label="Unidade de medida"
          isRequired
          className="w-60 grow"
        />

        <Input
          name="minStock"
          label="Estoque mínimo"
          type="number"
          className="w-60 grow"
        />

        <CategoryAutocomplete
          name="category"
          label="Categoria"
          placeholder="Escolha ou digite uma categoria"
          allowsCustomValue
          className="w-60 grow"
        />

        <Input name="code" label="Código do produto" className="w-60 grow" />

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
      </Form>

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
