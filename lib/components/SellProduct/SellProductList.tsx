"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Product, ProductWithQty } from "../../../types/schemas";
import { SubmitButton } from "../ui/FormButton";
import { toast } from "sonner";
import { stockService } from "@/backend/services/stock";
import ProductManager from "../ProductManager/ProductManager";

export default function SellProductList({ products }: IProps) {
  const router = useRouter();
  const [stock, setStock] = useState<ProductWithQty[]>([]);

  async function submitStock(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    await Promise.all(
      stock.map(async (item) => stockService.increment(item.id, -item.qty))
    );

    toast.success("Venda realizada com sucesso!");
    router.push("/produtos");
  }

  return (
    <form onSubmit={submitStock}>
      <ProductManager value={stock} onValueChange={setStock} />

      <SubmitButton color="primary">Finalizar venda</SubmitButton>
    </form>
  );
}

type IProps = {
  products: Product[];
};
