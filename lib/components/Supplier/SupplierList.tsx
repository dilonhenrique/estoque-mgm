"use client";

import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { Button } from "@nextui-org/react";
import { Pencil } from "lucide-react";
import Link from "next/link";
import { Supplier } from "@/types/schemas";

type IProps = { suppliers: Supplier[] };

export default function SupplierList({ suppliers }: IProps) {
  return (
    <Table
      removeWrapper
      selectionBehavior="replace"
      aria-label="tabela de fornecedores"
    >
      <TableHeader>
        <TableColumn>NOME</TableColumn>
        <TableColumn>EMAIL</TableColumn>
        <TableColumn>TELEFONE</TableColumn>
        <TableColumn width="50">
          <></>
        </TableColumn>
      </TableHeader>
      <TableBody emptyContent={<>Nenhum fornecedor encontrado</>}>
        {suppliers?.map((supplier) => (
          <TableRow key={supplier.id}>
            <TableCell className="font-semibold">{supplier.name}</TableCell>
            <TableCell>{supplier.email}</TableCell>
            <TableCell>{supplier.phone}</TableCell>
            <TableCell>
              {/* <Dropdown>
                <DropdownTrigger> */}
              <Button
                isIconOnly
                variant="light"
                as={Link}
                href={`/fornecedores/${supplier.id}`}
              >
                <Pencil size={16} />
              </Button>
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
