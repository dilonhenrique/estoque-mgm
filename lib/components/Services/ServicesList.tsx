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
import { Service } from "@/types/schemas";

type IProps = { services: Service[] };

export default function ServicesList({ services }: IProps) {
  return (
    <Table
      removeWrapper
      selectionBehavior="replace"
      aria-label="tabela de clientes"
    >
      <TableHeader>
        <TableColumn>NOME</TableColumn>
        <TableColumn width="150">PRODUTOS</TableColumn>
        <TableColumn width="50">
          <></>
        </TableColumn>
      </TableHeader>
      <TableBody emptyContent={<>Nenhum serviço encontrado</>}>
        {services?.map((service) => (
          <TableRow key={service.id}>
            <TableCell className="font-semibold">{service.name}</TableCell>
            <TableCell>{service.products.length}</TableCell>
            <TableCell>
              {/* <Dropdown>
                <DropdownTrigger> */}
              <Button
                isIconOnly
                variant="light"
                as={Link}
                href={`/servicos/${service.id}`}
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
