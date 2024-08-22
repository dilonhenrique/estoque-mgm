import { Button } from "@nextui-org/react";
import { Plus } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Product, ProductWithQty } from "../../../types/schemas";
import { productService } from "@/backend/services/products";
import ProductEditor from "./ProductEditor";
import ProductTable from "./ProductTable";

type Props = {
  defaultValue?: ProductWithQty[];
  value?: ProductWithQty[];
  onValueChange?: (products: ProductWithQty[]) => void;
  isViewOnly?: boolean;
};

export default function ProductSelector({
  defaultValue,
  value,
  onValueChange = () => {},
  isViewOnly,
}: Props) {
  const [initialLoad, setInitialLoad] = useState(true);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<ProductWithQty[]>(
    value ?? defaultValue ?? []
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
  }, [isViewOnly]);

  useEffect(() => {
    if (initialLoad) {
      setInitialLoad(false);
      if (!(value ?? defaultValue) && availableProducts.length > 0) {
        addItem();
      }
    }
  }, [availableProducts, initialLoad]);

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

  useEffect(() => {
    onValueChange(selectedProducts);
  }, [selectedProducts]);

  useEffect(() => {
    setSelectedProducts(value ?? []);
  }, [value]);

  useEffect(() => {
    setSelectedProducts(
      selectedProducts.map((selected) => {
        const prod =
          allProducts.find((prod) => prod.id === selected.id) ?? selected;
        return { ...prod, qty: selected.qty };
      })
    );
  }, [allProducts]);

  return (
    <div className="flex flex-col gap-4 mb-4">
      {isViewOnly ? (
        <ProductTable products={selectedProducts} />
      ) : (
        selectedProducts.map((item, index) => (
          <ProductEditor
            key={item.id}
            product={item}
            availableProducts={availableProducts}
            removeItem={() => removeItem(item.id)}
            changeProduct={(id) => changeItemProduct(index, String(id))}
            changeIncrement={(inc) => changeItemIncrement(index, inc)}
          />
        ))
      )}

      {!isViewOnly && availableProducts.length > 0 && (
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
