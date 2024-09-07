import { ActionResult } from "@/types/types";
import {
  FieldValues,
  FormProps as OriginalFormProps,
  UseFormProps,
} from "react-hook-form";
import { z } from "zod";

export type ResponseWithError = { response?: ActionResult; error?: unknown };

export type FormProps<
  T extends FieldValues,
  U extends FieldValues | undefined = undefined
> = Omit<
  OriginalFormProps<T, U>,
  "validateStatus" | "onError" | "onSuccess" | "action"
> & {
  action?:
    | ((formData: FormData | T) => ActionResult)
    | ((formData: FormData | T) => Promise<ActionResult>);
  validateResponse?: (response: ActionResult) => boolean;
  onSuccess?: (res: ActionResult) => void;
  onError?: (res: ResponseWithError) => void;
  schema?: z.ZodType;
  defaultValues?: UseFormProps<T>["defaultValues"];
  useFormProps?: UseFormProps<T>;
};
