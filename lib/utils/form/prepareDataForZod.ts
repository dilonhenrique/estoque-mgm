import { AnyObject } from "@/types/types";
import { sanitizeEmptyValues } from "../parser/other/sanitizeEmptyValues";

export function prepareDataForZod(data: FormData | AnyObject): AnyObject {
  const obj = data instanceof FormData ? Object.fromEntries(data) : data;
  return sanitizeEmptyValues(obj);
}
