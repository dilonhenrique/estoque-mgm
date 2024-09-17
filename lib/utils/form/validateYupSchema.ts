import * as Yup from "yup";
import { AnyObject } from "@/types/types";
import { appendErrors, FieldError, FieldValues } from "react-hook-form";

type ValidationResult<TFieldValues extends FieldValues> =
  | { success: true; data: TFieldValues; errors?: Record<string, FieldError> }
  | { success: false; errors: Record<string, FieldError>; data?: TFieldValues };

export function validateYupSchema<TFieldValues extends FieldValues>(
  schema: Yup.ObjectSchema<TFieldValues>,
  // | ReturnType<typeof Yup.lazy<Yup.ObjectSchema<TFieldValues>>>,
  values: AnyObject
): ValidationResult<TFieldValues> {
  try {
    console.log("will validate: ", values);
    const result = schema.validateSync(values, { abortEarly: false });

    return {
      success: true,
      data: result as TFieldValues,
    };
  } catch (e: any) {
    if (!e.inner) {
      throw e;
    }

    return {
      success: false,
      errors: parseErrorSchema(e),
    };
  }
}

const parseErrorSchema = (
  error: Yup.ValidationError,
  validateAllFieldCriteria = true
) => {
  return (error.inner || []).reduce<Record<string, FieldError>>(
    (previous, error) => {
      if (!previous[error.path!]) {
        previous[error.path!] = { message: error.message, type: error.type! };
      }

      if (validateAllFieldCriteria) {
        const types = previous[error.path!].types;
        const messages = types && types[error.type!];

        previous[error.path!] = appendErrors(
          error.path!,
          validateAllFieldCriteria,
          previous,
          error.type!,
          messages
            ? ([] as string[]).concat(messages as string[], error.message)
            : error.message
        ) as FieldError;
      }

      return previous;
    },
    {}
  );
};
