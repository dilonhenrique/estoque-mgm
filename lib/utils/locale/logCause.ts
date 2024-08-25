import { LogCause } from "@prisma/client";

export const logCause = new Map<LogCause, string>([
  [LogCause.procedure, "Procedimento"],
  [LogCause.purchase, "Compra"],
  [LogCause.personal, "Pessoal"],
  [LogCause.lost, "Perda"],
  [LogCause.other, "Outro"],
]);
