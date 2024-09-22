import { z } from "zod";
import { ActionResult } from "@/types/types";
import { BaseSyntheticEvent, Ref } from "react";
import {
  Control,
  FieldValues,
  UseFormProps,
  UseFormReturn,
} from "react-hook-form";

export type ResponseWithError = { response?: ActionResult; error?: unknown };

type BeforeSubmitPayload<T extends FieldValues> = {
  data: T;
  event?: BaseSyntheticEvent<object, any, any>;
  formData: FormData;
  methods: UseFormReturn<T, any, undefined>;
};

export type FormProps<T extends FieldValues> = Omit<
  React.FormHTMLAttributes<HTMLFormElement>,
  "onError" | "onSubmit" | "action"
> & {
  control?: Control<T>;
  headers?: Record<string, string>;
  children?: React.ReactNode | React.ReactNode[];
  render?: (props: {
    submit: (e?: React.FormEvent) => void;
  }) => React.ReactNode | React.ReactNode[];
  action?:
    | ((formData: FormData | T) => ActionResult)
    | ((formData: FormData | T) => Promise<ActionResult>);
  validateResponse?: (response: ActionResult) => boolean;
  onSuccess?: (res: ActionResult) => void;
  onError?: (res: ResponseWithError) => void;
  schema?: z.ZodType;
  defaultValues?: UseFormProps<T>["defaultValues"];
  useFormProps?: UseFormProps<T>;
  formRef?: Ref<HTMLFormElement>;
  beforeSubmit?: (payload: BeforeSubmitPayload<T>) => unknown;
};

// export type FormProps<
//   T extends FieldValues,
//   U extends FieldValues | undefined = undefined
// > = Omit<
//   OriginalFormProps<T, U>,
//   | "validateStatus"
//   | "onError"
//   | "onSuccess"
//   | "action"
//   | "method"
//   | "encType"
//   | "onSubmit"
// > & {
//   action?:
//     | ((formData: FormData | T) => ActionResult)
//     | ((formData: FormData | T) => Promise<ActionResult>);
//   validateResponse?: (response: ActionResult) => boolean;
//   onSuccess?: (res: ActionResult) => void;
//   onError?: (res: ResponseWithError) => void;
//   schema?: z.ZodType;
//   defaultValues?: UseFormProps<T>["defaultValues"];
//   useFormProps?: UseFormProps<T>;
//   formRef?: Ref<HTMLFormElement>;
//   beforeSubmit?: (payload: BeforeSubmitPayload<T>) => unknown;
// };
