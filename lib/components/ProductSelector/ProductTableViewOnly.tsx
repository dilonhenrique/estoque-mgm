import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { ProductWithQty } from "../../../types/schemas";

type Props = {
  products: ProductWithQty[];
};

export default function ProductTableViewOnly({ products }: Props) {
  return (
    <Table
      fullWidth
      classNames={{ wrapper: "p-2 bg-transparent border border-default-100" }}
      aria-label="tabela de produtos"
    >
      <TableHeader>
        <TableColumn>NOME</TableColumn>
        <TableColumn>QTD</TableColumn>
      </TableHeader>
      <TableBody emptyContent="Nenhum produto selecionado">
        {products.map((item) => (
          <TableRow
            key={item.id}
            className="last:border-0 border-b border-content2"
          >
            <TableCell>
              <h5>{item.name}</h5>
            </TableCell>
            <TableCell>
              {item.qty} {item.unit}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
