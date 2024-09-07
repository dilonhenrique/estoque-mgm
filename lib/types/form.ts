import { ServiceResult } from "@/types/types";
import {
  FieldValues,
  FormProps as OriginalFormProps,
  UseFormProps,
} from "react-hook-form";
import { z } from "zod";

export type ResponseWithError =
  | { response: ServiceResult; error?: undefined }
  | { response?: ServiceResult; error: unknown };

export type FormProps<
  T extends FieldValues,
  U extends FieldValues | undefined = undefined
> = Omit<
  OriginalFormProps<T, U>,
  "validateStatus" | "onError" | "onSuccess" | "action"
> & {
  action?:
    | ((formData: FormData | T) => ServiceResult)
    | ((formData: FormData | T) => Promise<ServiceResult>);
  validateResponse?: (response: ServiceResult) => boolean;
  onError?: (res: ResponseWithError) => void;
  onSuccess?: (res: ResponseWithError) => void;
  schema?: z.ZodType;
  defaultValues?: UseFormProps<T>["defaultValues"];
  useFormProps?: UseFormProps<T>;
};
