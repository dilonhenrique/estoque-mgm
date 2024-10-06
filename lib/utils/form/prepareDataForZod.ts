import { AnyObject } from "@/types/types";
import { clearEmptyString } from "../parser/other/clearEmptyString";

export function prepareDataForSchema(data: FormData | AnyObject): AnyObject {
  const obj = data instanceof FormData ? Object.fromEntries(data) : data;
  return clearEmptyString(obj);
}
