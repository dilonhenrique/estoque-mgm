"use client";

import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { Product } from "../../../types/schemas";
import { Button } from "@nextui-org/react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { WithStringId } from "@/utils/parseUtils";

type Props = { products: WithStringId<Product>[] };

export default function ProductList({ products }: Props) {
  return (
    <Table
      removeWrapper
      selectionBehavior="replace"
      aria-label="tabela de produtos"
    >
      <TableHeader>
        <TableColumn>NOME</TableColumn>
        <TableColumn width="200">QTD</TableColumn>
        <TableColumn width="50">VER</TableColumn>
      </TableHeader>
      <TableBody emptyContent={<>Nenhum produto encontrado</>}>
        {products?.map((product) => (
          <TableRow key={product._id}>
            <TableCell>{product.name}</TableCell>
            <TableCell>
              {product.stock} {product.unit}
            </TableCell>
            <TableCell>
              {/* <Dropdown>
                <DropdownTrigger> */}
              <Button
                isIconOnly
                variant="light"
                as={Link}
                href={`/products/${product._id}`}
              >
                <ChevronRight />
              </Button>
              {/* </DropdownTrigger>
                <DropdownMenu>
                  <DropdownItem href={`/products/${product._id}`}>
                    Ver
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown> */}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
