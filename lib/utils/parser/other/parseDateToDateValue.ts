import { DateValue } from "@nextui-org/react";
import { parseAbsoluteToLocal } from "@internationalized/date";

export function parseDateToDateValue(
  date?: Date | DateValue
): DateValue | undefined {
  return date instanceof Date ? parseAbsoluteToLocal(date.toISOString()) : date;
}
