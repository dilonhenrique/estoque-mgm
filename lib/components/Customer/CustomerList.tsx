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
import { Customer } from "../../../types/schemas";

type IProps = { customers: Customer[] };

export default function CustomerList({ customers }: IProps) {
  return (
    <Table
      removeWrapper
      selectionBehavior="replace"
      aria-label="tabela de clientes"
    >
      <TableHeader>
        <TableColumn>NOME</TableColumn>
        <TableColumn>EMAIL</TableColumn>
        <TableColumn>TELEFONE</TableColumn>
        <TableColumn width="50">
          <></>
        </TableColumn>
      </TableHeader>
      <TableBody emptyContent={<>Nenhum cliente encontrado</>}>
        {customers?.map((customer) => (
          <TableRow key={customer.id}>
            <TableCell className="font-semibold">{customer.name}</TableCell>
            <TableCell>
              {customer.email}
            </TableCell>
            <TableCell>
              {customer.phone}
            </TableCell>
            <TableCell>
              {/* <Dropdown>
                <DropdownTrigger> */}
              <Button
                isIconOnly
                variant="light"
                as={Link}
                href={`/clientes/${customer.id}`}
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
