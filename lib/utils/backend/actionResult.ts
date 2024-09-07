import { FieldError } from "react-hook-form";
import { ActionResult, AnyObject, ServiceResult, ZodErrorObject } from "@/types/types";
import { parseErrorSchema } from "../formResolver/zodResolver";

export function actionResult<T>(result: ServiceResult<T>): ActionResult<T> {
  return { ...result, fieldErrors: parseZodErrorsToRhf(result.fieldErrors) };
}

function parseZodErrorsToRhf(errors?: ZodErrorObject): AnyObject<FieldError>{
  if(!errors) return {};

  return parseErrorSchema(errors, true);
  // return {
  //   type: ""
  // }
}
