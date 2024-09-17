import { AnyObject } from "@/types/types";
import { sanitizeEmptyValues } from "../parser/other/sanitizeEmptyValues";

export function prepareDataForSchema(data: FormData | AnyObject): AnyObject {
  const obj = data instanceof FormData ? Object.fromEntries(data) : data;
  return obj;
  return sanitizeEmptyValues(obj);
}
