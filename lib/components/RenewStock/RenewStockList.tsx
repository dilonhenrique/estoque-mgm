"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Product, ProductWithQty } from "../../../types/schemas";
import { SubmitButton } from "../ui/FormButton";
import { toast } from "sonner";
import { stockService } from "@/backend/services/stock";
import ProductSelector from "../ProductSelector/ProductSelector";

export default function RenewStockList({ products }: IProps) {
  const router = useRouter();
  const [stock, setStock] = useState<ProductWithQty[]>([]);

  async function submitStock(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    await Promise.all(
      stock.map(async (item) => stockService.increment(item.id, item.qty))
    );

    toast.success("Reposição realizada com sucesso!");
    router.push("/produtos");
  }

  return (
    <form onSubmit={submitStock}>
      <ProductSelector value={stock} onValueChange={setStock} />

      <SubmitButton color="primary">Repor estoque</SubmitButton>
    </form>
  );
}

type IProps = {
  products: Product[];
};
