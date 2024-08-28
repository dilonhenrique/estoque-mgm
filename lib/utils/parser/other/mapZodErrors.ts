import { keyBy, mapValues } from "lodash";
import { ZodIssue } from "zod";

export function mapZodErrors(errors: ZodIssue[]) {
  return mapValues(keyBy(errors, "path"), "message");
}
