import { Dictionary, isDate, isEmpty, isNumber, omitBy } from "lodash";

export function sanitizeEmptyValues(
  obj: Dictionary<unknown> | null | undefined
) {
  return omitBy(obj, isEmptyAndNotDate);
}

function isEmptyAndNotDate<
  T extends {
    __trapAny: any;
  }
>(value: T) {
  return isEmpty(value) && !isDate(value) && !isNumber(value);
}
