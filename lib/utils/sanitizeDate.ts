export function sanitizeDate(date: FormDataEntryValue | FormDataEntryValue[]) {
  if (typeof date !== "string") return date;
  return date.split("[")[0];
}
