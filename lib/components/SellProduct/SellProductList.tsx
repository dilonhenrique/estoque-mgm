"use client";

import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Input,
} from "@nextui-org/react";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { Plus, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { Product } from "../../../types/schemas";
import { SubmitButton } from "../ui/FormButton";
import { toast } from "sonner";
import { stockService } from "@/backend/services/stock";

export default function SellProductList({ products }: IProps) {
  const router = useRouter();
  const [stock, setStock] = useState<StockItem[]>([]);

  const availableProducts = useMemo(() => {
    return products.filter(
      (prod) => !stock.some((item) => item.product.id === prod.id)
    );
  }, [stock, products]);

  useEffect(addItem, []);

  function addItem() {
    setStock([...stock, { product: availableProducts[0], increment: 1 }]);
  }

  function removeItem(id: string) {
    const newStock = stock.filter((item) => item.product.id !== id);
    setStock(newStock);
  }

  function changeItemProduct(index: number, productId: string) {
    const newProd = availableProducts.find((p) => p.id === productId);

    if (newProd) {
      setStock(
        stock.map((item, i) => {
          if (i === index) {
            item.product = newProd;

            if (item.increment > newProd.stock) {
              item.increment = newProd.stock;
            }
          }
          return item;
        })
      );
    }
  }

  function changeItemIncrement(index: number, increment: string) {
    setStock(
      stock.map((item, i) => {
        if (i === index) {
          item.increment = Number(increment);
        }
        return item;
      })
    );
  }

  async function submitStock(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    await Promise.all(
      stock.map(async (item) =>
        stockService.increment(item.product.id, -item.increment)
      )
    );

    toast.success("Venda realizada com sucesso!");
    router.push("/produtos");
  }

  return (
    <form onSubmit={submitStock}>
      <div className="flex flex-col gap-4 mb-4">
        {stock.map((item, index) => (
          <div
            className="grid grid-cols-[30px,_1fr,_1fr,_100px] gap-4 items-center"
            key={item.product.id}
          >
            <Button
              size="sm"
              color="danger"
              variant="light"
              isIconOnly
              startContent={<Trash size={16} />}
              onClick={() => removeItem(item.product.id)}
            />

            <Autocomplete
              label="Produto"
              isClearable={false}
              selectedKey={item.product.id}
              onSelectionChange={(val) => changeItemProduct(index, String(val))}
            >
              {availableProducts.concat(item.product).map((product) => (
                <AutocompleteItem
                  value={product.id}
                  key={product.id}
                  title={product.name}
                />
              ))}
            </Autocomplete>

            <Input
              type="number"
              min="1"
              // max={item.product.stock}
              label="Qtd usado"
              value={item.increment.toString()}
              onValueChange={(val) => changeItemIncrement(index, val)}
              endContent={
                <span className="flex h-full items-center text-sm opacity-50">
                  {item.product.unit}
                </span>
              }
            />

            <div>
              <p className="text-sm opacity-50">Qtd atual:</p>
              <p className="text-sm">
                {item.product.stock} {item.product.unit}
              </p>
            </div>
          </div>
        ))}

        {availableProducts.length > 0 && (
          <Button
            onClick={addItem}
            isIconOnly
            size="sm"
            startContent={<Plus size={16} />}
          />
        )}
      </div>

      <SubmitButton color="primary">Finalizar venda</SubmitButton>
    </form>
  );
}

type IProps = {
  products: Product[];
};

type StockItem = { product: Product; increment: number };
