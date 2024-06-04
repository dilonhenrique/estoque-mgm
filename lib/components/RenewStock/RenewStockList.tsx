"use client";

import { WithStringId } from "@/utils/parseUtils";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Input,
} from "@nextui-org/react";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { Product } from "../../../types/schemas";
import { Plus, Trash } from "lucide-react";
import { productActions } from "@/backend/actions/products";
import { useRouter } from "next/navigation";

export default function RenewStockList({ products }: IProps) {
  const router = useRouter();
  const [stock, setStock] = useState<StockItem[]>([]);
  const availableProducts = useMemo(() => {
    return products.filter(
      (prod) => !stock.some((item) => item.product._id === prod._id)
    );
  }, [stock, products]);

  useEffect(addItem, []);

  function addItem() {
    setStock([...stock, { product: availableProducts[0], increment: 0 }]);
  }

  function removeItem(id: string) {
    const newStock = stock.filter((item) => item.product._id !== id);
    setStock(newStock);
  }

  function changeItemProduct(index: number, productId: string) {
    const newProd = availableProducts.find((p) => p._id === productId);

    if (newProd) {
      setStock(
        stock.map((item, i) => {
          if (i === index) {
            item.product = newProd;
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
        productActions.updateStock(item.product._id, item.increment)
      )
    );

    router.push("/produtos");
  }

  return (
    <form onSubmit={submitStock}>
      <div className="flex flex-col gap-4 mb-4">
        {stock.map((item, index) => (
          <div
            className="grid grid-cols-[30px,_1fr,_1fr,_100px] gap-4 items-center"
            key={item.product._id}
          >
            <Button
              size="sm"
              color="danger"
              variant="light"
              isIconOnly
              startContent={<Trash size={16} />}
              onClick={() => removeItem(item.product._id)}
            />

            <Autocomplete
              label="Produto"
              selectedKey={item.product._id}
              onSelectionChange={(val) => changeItemProduct(index, String(val))}
            >
              {availableProducts.concat(item.product).map((product) => (
                <AutocompleteItem
                  value={product._id}
                  key={product._id}
                  title={product.name}
                />
              ))}
            </Autocomplete>

            <Input
              type="number"
              label="Qtd reposição"
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

      <Button color="primary" type="submit">
        Repor estoque
      </Button>
    </form>
  );
}

type IProps = {
  products: WithStringId<Product>[];
};

type StockItem = { product: WithStringId<Product>; increment: number };
