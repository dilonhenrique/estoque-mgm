"use client";

import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { Button, Tooltip } from "@nextui-org/react";
import {
  ChevronRight,
  FileClock,
  History,
  Pencil,
  ScrollText,
} from "lucide-react";
import Link from "next/link";
import { Product } from "@/types/schemas";

type IProps = { products: Product[] };

export default function ProductList({ products }: IProps) {
  return (
    <Table
      removeWrapper
      selectionBehavior="replace"
      aria-label="tabela de produtos"
    >
      <TableHeader>
        <TableColumn>NOME</TableColumn>
        <TableColumn width="150">QTD</TableColumn>
        <TableColumn width="150">MIN</TableColumn>
        <TableColumn width="120">
          <></>
        </TableColumn>
      </TableHeader>
      <TableBody emptyContent={<>Nenhum produto encontrado</>}>
        {products?.map((product) => (
          <TableRow key={product.id}>
            <TableCell className="font-semibold">{product.name}</TableCell>
            <TableCell>
              {product.stock} {product.unit}
            </TableCell>
            <TableCell>
              {product.minStock === undefined ? (
                <span className="opacity-50">-</span>
              ) : (
                `${product.minStock} ${product.unit}`
              )}
            </TableCell>
            <TableCell>
              {/* <Dropdown>
                <DropdownTrigger> */}
              <Tooltip content="Histórico">
                <Button
                  isIconOnly
                  variant="light"
                  as={Link}
                  href={`/produtos/logs/${product.id}`}
                >
                  <History size={16} />
                </Button>
              </Tooltip>

              <Tooltip content="Editar">
                <Button
                  isIconOnly
                  variant="light"
                  as={Link}
                  href={`/produtos/${product.id}`}
                >
                  <Pencil size={16} />
                </Button>
              </Tooltip>
              {/* </DropdownTrigger>
                <DropdownMenu>
                  <DropdownItem href={`/produtos/${product._id}`}>
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
