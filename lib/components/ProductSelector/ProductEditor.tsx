import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Input,
} from "@nextui-org/react";
import { Trash } from "lucide-react";
import { Product, ProductWithQty } from "../../../types/schemas";

type Props = {
  product: ProductWithQty;
  availableProducts: Product[];
  removeItem: () => void;
  changeProduct: (id: string) => void;
  changeIncrement: (inc: string) => void;
};

export default function ProductEditor({
  product,
  availableProducts,
  removeItem,
  changeProduct,
  changeIncrement,
}: Props) {
  return (
    <div className="flex gap-2 items-center" key={product.id}>
      <Button
        size="sm"
        color="danger"
        variant="light"
        isIconOnly
        startContent={<Trash size={16} />}
        onClick={removeItem}
      />

      <Autocomplete
        label="Produto"
        isClearable={false}
        selectedKey={product.id}
        onSelectionChange={(val) => changeProduct(String(val))}
      >
        {availableProducts.concat(product).map((product) => (
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
        value={product.qty.toString()}
        onValueChange={(val) => changeIncrement(val)}
        endContent={
          <span className="flex h-full items-center text-sm opacity-50">
            {product.unit}
          </span>
        }
      />

      <div className="min-w-20">
        <p className="text-sm opacity-50">Qtd atual:</p>
        <p className="text-sm">
          {product.stock} {product.unit}
        </p>
      </div>
    </div>
  );
}
