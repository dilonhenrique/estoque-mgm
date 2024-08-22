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

export default function ProductTable({ products }: Props) {
  return (
    <Table
      fullWidth
      hideHeader
      classNames={{ wrapper: "p-2" }}
      aria-label="tabela de produtos"
    >
      <TableHeader>
        <TableColumn>NOME</TableColumn>
        <TableColumn>QTD</TableColumn>
      </TableHeader>
      <TableBody>
        {products.map((item) => (
          <TableRow
            key={item.id}
            className="last:border-0 border-b border-content2"
          >
            <TableCell>
              <h4>{item.name}</h4>
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
