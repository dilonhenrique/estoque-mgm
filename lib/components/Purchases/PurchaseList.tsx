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
import { Package, Pencil, Trash } from "lucide-react";
import Link from "next/link";
import { Purchase } from "@/types/schemas";
import { toast } from "sonner";
import { purchaseService } from "@/backend/services/purchases";
import dateToString from "@/utils/parser/other/dateToString";

type IProps = { purchases: Purchase[] };

export default function PurchaseList({ purchases }: IProps) {
  return (
    <Table
      removeWrapper
      selectionBehavior="replace"
      aria-label="tabela de compras"
    >
      <TableHeader>
        <TableColumn>FORNECEDOR</TableColumn>
        <TableColumn width="250">DATA</TableColumn>
        <TableColumn width="100">
          <></>
        </TableColumn>
        <TableColumn width="110">
          <></>
        </TableColumn>
      </TableHeader>
      <TableBody emptyContent={<>Nenhuma compra encontrada</>}>
        {purchases?.map((purchase) => (
          <TableRow key={purchase.id}>
            <TableCell className="font-semibold">
              {purchase.supplier?.name ?? "-"}
            </TableCell>
            <TableCell>{dateToString(purchase.created_at).date()}</TableCell>
            <TableCell>
              <Tooltip content="Produtos">
                <Chip
                  startContent={<Package />}
                  className="ps-2 pe-0 me-2"
                  variant="faded"
                  color="primary"
                >
                  {purchase.items.length}
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
                href={`/compras/${purchase.id}`}
              >
                <Pencil size={16} />
              </Button>
              <Button
                isIconOnly
                variant="light"
                color="danger"
                onPress={async () => {
                  if (confirm("Deseja excluir esta compra?")) {
                    const response = await purchaseService.remove(purchase.id);
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
