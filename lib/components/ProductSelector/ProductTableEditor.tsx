import {
  AutocompleteItem,
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { Trash } from "lucide-react";
import { Product, ProductWithQty } from "../../../types/schemas";
import IncreaserInput from "../ui/IncreaserInput/IncreaserInput";
import Autocomplete from "../ui/Autocomplete/Autocomplete";

type Props = {
  products: ProductWithQty[];
  availableProducts: Product[];
  removeItem: (id: string) => void;
  changeItemProduct: (index: number, id: string) => void;
  changeItemIncrement: (index: number, inc: string) => void;
};

export default function ProductTableEditor({
  products,
  availableProducts,
  removeItem,
  changeItemProduct,
  changeItemIncrement,
}: Props) {
  return (
    <Table
      fullWidth
      classNames={{ wrapper: "p-2" }}
      aria-label="tabela de produtos"
    >
      <TableHeader>
        <TableColumn>
          <></>
        </TableColumn>
        <TableColumn>NOME</TableColumn>
        <TableColumn>QTD</TableColumn>
        <TableColumn>ESTOQUE</TableColumn>
      </TableHeader>
      <TableBody emptyContent="Nenhum produto selecionado">
        {products.map((item, index) => (
          <TableRow
            key={item.id}
            className="last:border-0 border-b border-content2"
          >
            <TableCell>
              <Button
                size="sm"
                color="danger"
                variant="light"
                isIconOnly
                startContent={<Trash size={16} />}
                onPress={() => removeItem(item.id)}
              />
            </TableCell>

            <TableCell>
              <Autocomplete
                isClearable={false}
                selectedKey={item.id}
                onSelectionChange={(id) => changeItemProduct(index, String(id))}
                aria-label="selecione um produto"
              >
                {availableProducts.concat(item).map((product) => (
                  <AutocompleteItem
                    value={product.id}
                    key={product.id}
                    title={product.name}
                  />
                ))}
              </Autocomplete>
            </TableCell>

            <TableCell>
              <IncreaserInput
                min="1"
                // max={item.product.stock}
                value={item.qty.toString()}
                onValueChange={(inc) => changeItemIncrement(index, inc)}
              />
            </TableCell>

            <TableCell>
              <div className="min-w-20">
                <p className="text-sm">
                  {item.stock} {item.unit}
                </p>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
