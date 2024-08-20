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
import { Procedure } from "../../../types/schemas";

type IProps = { procedures: Procedure[] };

export default function ProcedureList({ procedures }: IProps) {
  return (
    <Table
      removeWrapper
      selectionBehavior="replace"
      aria-label="tabela de procedimentos"
    >
      <TableHeader>
        <TableColumn>SERVIÇO</TableColumn>
        <TableColumn width="250">CLIENTE</TableColumn>
        <TableColumn width="250">DATA</TableColumn>
        <TableColumn width="150">PRODUTOS</TableColumn>
        <TableColumn width="50">
          <></>
        </TableColumn>
      </TableHeader>
      <TableBody emptyContent={<>Nenhum procedimento encontrado</>}>
        {procedures?.map((procedure) => (
          <TableRow key={procedure.id}>
            <TableCell className="font-semibold">
              {procedure.service?.name ?? "Customizado"}
            </TableCell>
            <TableCell>{procedure.customer?.name ?? "-"}</TableCell>
            <TableCell>
              {procedure.scheduled_for?.toLocaleString() ?? "-"}
            </TableCell>
            <TableCell>{procedure.products.length}</TableCell>
            <TableCell>
              {/* <Dropdown>
                <DropdownTrigger> */}
              <Button
                isIconOnly
                variant="light"
                as={Link}
                href={`/procedimentos/${procedure.id}`}
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
