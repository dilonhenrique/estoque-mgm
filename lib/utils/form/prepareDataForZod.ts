import { AnyObject } from "@/types/types";

export function prepareDataForSchema(data: FormData | AnyObject): AnyObject {
  const obj = data instanceof FormData ? Object.fromEntries(data) : data;
  return obj;
}
