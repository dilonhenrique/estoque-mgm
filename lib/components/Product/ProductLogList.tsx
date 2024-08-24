"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { LogWithAction } from "../../../types/schemas";

type Props = {
  logs: LogWithAction[];
};

export default function ProductLogList({ logs }: Props) {
  return (
    <Table fullWidth aria-label="tabela de logs">
      <TableHeader>
        <TableColumn>DATA</TableColumn>
        <TableColumn>MOTIVO</TableColumn>
        <TableColumn>QTD</TableColumn>
      </TableHeader>
      <TableBody emptyContent="Nenhum histórico">
        {logs.map((log) => (
          <TableRow>
            <TableCell>{log.date.toLocaleString()}</TableCell>
            <TableCell>{log.cause}</TableCell>
            <TableCell>{log.qty}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
