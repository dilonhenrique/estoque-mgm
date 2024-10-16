import { LogCause } from "@prisma/client";

const logCause = new Map<LogCause, string>([
  [LogCause.procedure, "Procedimento"],
  [LogCause.purchase, "Compra"],
  [LogCause.personal, "Pessoal"],
  [LogCause.lost, "Perda"],
  [LogCause.other, "Outro"],
]);

export default function localeLogCause(key?: LogCause) {
  if (!key) return null;

  return logCause.get(key);
}
