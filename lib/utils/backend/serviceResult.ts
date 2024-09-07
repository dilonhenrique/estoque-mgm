import { ZodIssue } from "zod";
import { mapZodErrors } from "../parser/other/mapZodErrors";
import { ServiceResult } from "@/types/types";

export const serviceResult = {
  success: serviceResultSuccess,
  fieldErrors: serviceResultFieldErrors,
  error: serviceResultError,
};

function serviceResultSuccess<T = any>(
  data: T,
  message?: string
): ServiceResult<T> {
  return {
    success: true,
    data,
    message: message ?? "Salvo com sucesso!",
    status: 200,
  };
}

function serviceResultFieldErrors<T = any>(
  errors: ZodIssue[]
): ServiceResult<T> {
  return {
    success: false,
    fieldErrors: mapZodErrors(errors),
    message: "Confira os campos e tente novamente",
    status: 400,
  };
}

function serviceResultError<T = any>(
  status: number = 500,
  message?: string
): ServiceResult<T> {
  return {
    success: false,
    fieldErrors: {},
    message: message ?? "Erro interno",
    status,
  };
}
