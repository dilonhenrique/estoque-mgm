export function parseDate(date?: null): undefined;
export function parseDate(date: Date): Date;
export function parseDate(date?: Date | null): Date | undefined;
export function parseDate(date?: Date | null) {
  if (!date) return undefined;

  return date;
}
