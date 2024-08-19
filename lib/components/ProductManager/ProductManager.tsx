import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Input,
} from "@nextui-org/react";
import { Plus, Trash } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Product, ProductWithQty } from "../../../types/schemas";
import { productService } from "@/backend/services/products";

type Props = {
  defaultValue?: ProductWithQty[];
  value?: ProductWithQty[];
  onValueChange?: (products: ProductWithQty[]) => void;
};

export default function ProductManager({
  defaultValue = [],
  value,
  onValueChange = () => {},
}: Props) {
  const [initialLoad, setInitialLoad] = useState(true);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<ProductWithQty[]>(
    value ?? defaultValue
  );

  const availableProducts = useMemo(() => {
    return allProducts.filter(
      (prod) => !selectedProducts.some((item) => item.id === prod.id)
    );
  }, [selectedProducts, allProducts]);

  useEffect(() => {
    productService.search().then((res) => {
      if (res.data) {
        setAllProducts(res.data.items);
      }
    });
  }, []);

  useEffect(() => {
    if (initialLoad && availableProducts.length > 0) {
      addItem();
      setInitialLoad(false);
    }
  }, [availableProducts, initialLoad]);

  useEffect(() => {
    onValueChange(selectedProducts);
  }, [selectedProducts]);

  function addItem() {
    setSelectedProducts([
      ...selectedProducts,
      { ...availableProducts[0], qty: 1 },
    ]);
  }

  function removeItem(id: string) {
    const newStock = selectedProducts.filter((item) => item.id !== id);
    setSelectedProducts(newStock);
  }

  function changeItemProduct(index: number, productId: string) {
    const newProd = availableProducts.find((p) => p.id === productId);

    if (newProd) {
      setSelectedProducts(
        selectedProducts.map((item, i) => {
          if (i === index) {
            item = { ...newProd, qty: item.qty };

            if (item.qty > newProd.stock) {
              item.qty = newProd.stock;
            }
          }
          return item;
        })
      );
    }
  }

  function changeItemIncrement(index: number, increment: string) {
    setSelectedProducts(
      selectedProducts.map((item, i) => {
        if (i === index) {
          item.qty = Number(increment);
        }
        return item;
      })
    );
  }

  return (
    <div className="flex flex-col gap-4 mb-4">
      {selectedProducts.map((item, index) => (
        <div
          className="grid grid-cols-[30px,_1fr,_1fr,_100px] gap-4 items-center"
          key={item.id}
        >
          <Button
            size="sm"
            color="danger"
            variant="light"
            isIconOnly
            startContent={<Trash size={16} />}
            onClick={() => removeItem(item.id)}
          />

          <Autocomplete
            label="Produto"
            isClearable={false}
            selectedKey={item.id}
            onSelectionChange={(val) => changeItemProduct(index, String(val))}
          >
            {availableProducts.concat(item).map((product) => (
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
            value={item.qty.toString()}
            onValueChange={(val) => changeItemIncrement(index, val)}
            endContent={
              <span className="flex h-full items-center text-sm opacity-50">
                {item.unit}
              </span>
            }
          />

          <div>
            <p className="text-sm opacity-50">Qtd atual:</p>
            <p className="text-sm">
              {item.stock} {item.unit}
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
  );
}
