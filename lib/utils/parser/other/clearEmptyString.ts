import { AnyObject } from "@/types/types";

export function clearEmptyString(obj: AnyObject) {
  for (let key of Object.keys(obj)) {
    if (obj[key] === "") {
      delete obj[key];
    } else if (typeof obj[key] === "object") {
      obj[key] = clearEmptyString(obj[key]);
      if (Object.keys(obj[key]).length === 0) delete obj[key];
    }
  }
  return Array.isArray(obj) ? obj.filter((val) => val) : obj;
}
