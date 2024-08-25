"use client";

import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { Button, Chip, Tooltip } from "@nextui-org/react";
import {
  CalendarCheck,
  CalendarX,
  Package,
  Pencil,
  SquareCheckBig,
  SquareX,
  Trash,
} from "lucide-react";
import Link from "next/link";
import { Procedure } from "../../../types/schemas";
import { dateTimeToString } from "@/utils/dateToString";
import { procedureService } from "@/backend/services/procedures";
import { toast } from "sonner";

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
        <TableColumn width="180">
          <></>
        </TableColumn>
        <TableColumn width="110">
          <></>
        </TableColumn>
      </TableHeader>
      <TableBody emptyContent={<>Nenhum procedimento encontrado</>}>
        {procedures?.map((procedure) => (
          <TableRow key={procedure.id}>
            <TableCell className="font-semibold">
              {procedure.name}
            </TableCell>
            <TableCell>{procedure.customer?.name ?? "-"}</TableCell>
            <TableCell>
              {dateTimeToString(procedure.scheduled_for) ?? "-"}
            </TableCell>
            <TableCell>
              <Tooltip content="Produtos">
                <Chip
                  startContent={<Package />}
                  className="ps-2 pe-0 me-2"
                  variant="faded"
                  color="primary"
                >
                  {procedure.products.length}
                </Chip>
              </Tooltip>

              <Tooltip
                content={
                  procedure.confirmed_by_customer
                    ? "Confirmado"
                    : "Não confirmado"
                }
              >
                <Chip
                  className="px-0 me-2"
                  variant="faded"
                  color={
                    procedure.confirmed_by_customer ? "primary" : undefined
                  }
                >
                  {procedure.confirmed_by_customer ? (
                    <CalendarCheck />
                  ) : (
                    <CalendarX className="text-default-500" />
                  )}
                </Chip>
              </Tooltip>

              <Tooltip content={procedure.done ? "Realizado" : "Não realizado"}>
                <Chip
                  className="px-0"
                  variant="faded"
                  color={procedure.done ? "primary" : undefined}
                >
                  {procedure.done ? (
                    <SquareCheckBig />
                  ) : (
                    <SquareX className="text-default-500" />
                  )}
                </Chip>
              </Tooltip>
            </TableCell>
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
              <Button
                isIconOnly
                variant="light"
                color="danger"
                onPress={async () => {
                  if (confirm("Deseja excluir este procedimento?")) {
                    const response = await procedureService.remove(
                      procedure.id
                    );
                    if (response.success)
                      toast.success("Excluído com sucesso!");
                  }
                }}
              >
                <Trash size={16} />
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
