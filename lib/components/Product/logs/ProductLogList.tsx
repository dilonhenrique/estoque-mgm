"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { LogWithAction } from "../../../../types/schemas";
import { logCause } from "@/utils/locale/logCause";
import { dateTimeToString } from "@/utils/dateToString";

type Props = {
  logs: LogWithAction[];
};

export default function ProductLogList({ logs }: Props) {
  function renderLogCause(log: LogWithAction) {
    const path = getLogPath(log);
    const label = logCause.get(log.cause);

    // if (path) {
    //   return <Link href={path}>{label}</Link>;
    // }
    return label;
  }

  function getLogPath(log: LogWithAction) {
    switch (log.cause) {
      case "procedure":
        return `/procedimentos/${log.procedure?.id}`;
      case "purchase":
      // return `/procedimento/${log.purchase?.id}`
      default:
        return null;
    }
  }

  return (
    <Table fullWidth removeWrapper aria-label="tabela de logs">
      <TableHeader>
        <TableColumn>DATA</TableColumn>
        <TableColumn>MOTIVO</TableColumn>
        <TableColumn>QTD</TableColumn>
      </TableHeader>
      <TableBody emptyContent="Nenhum histórico">
        {logs.map((log) => (
          <TableRow key={log.id}>
            <TableCell>{dateTimeToString(log.date)}</TableCell>
            <TableCell>{renderLogCause(log)}</TableCell>
            <TableCell>{log.qty}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
