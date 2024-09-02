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
import { Plus, Trash } from "lucide-react";
import { Product, ProductWithQty } from "@/types/schemas";
import IncreaserInput from "../ui/forms/atoms/IncreaserInput/IncreaserInput";
import Autocomplete from "../ui/forms/atoms/Autocomplete/Autocomplete";

type Props = {
  products: (ProductWithQty | undefined)[];
  availableProducts: Product[];
  removeItem: (id: string) => void;
  changeItemProduct: (index: number, id: string) => void;
  changeItemIncrement: (index: number, inc: string) => void;
  newItem: () => void;
};

export default function ProductTableEditor({
  products,
  availableProducts,
  removeItem,
  changeItemProduct,
  changeItemIncrement,
  newItem,
}: Props) {
  return (
    <Table
      fullWidth
      classNames={{ wrapper: "p-2 bg-transparent border border-default-100" }}
      aria-label="tabela de produtos"
    >
      <TableHeader>
        <TableColumn width={50}>
          <></>
        </TableColumn>
        <TableColumn>NOME</TableColumn>
        <TableColumn width={150}>QTD</TableColumn>
        <TableColumn width={100}>ESTOQUE</TableColumn>
      </TableHeader>
      <TableBody emptyContent="Nenhum produto selecionado">
        {products.concat(undefined).map((item, index) => {
          if (item !== undefined) {
            return (
              <TableRow key={item.id}>
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
                    onSelectionChange={(id) =>
                      changeItemProduct(index, String(id))
                    }
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
            );
          }

          return (
            <TableRow key="newItem">
              <TableCell>
                <Button
                  onPress={newItem}
                  isDisabled={availableProducts.length <= 0}
                  isIconOnly
                  size="sm"
                  startContent={<Plus size={16} />}
                />
              </TableCell>
              <TableCell>
                <></>
              </TableCell>
              <TableCell>
                <></>
              </TableCell>
              <TableCell>
                <></>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
