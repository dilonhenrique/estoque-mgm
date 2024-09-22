import { merge } from "lodash";
import { useMemo } from "react";
import { ZodType } from "zod";
import { zodResolver } from "@/utils/formResolver/zodResolver";
import { FieldValues, useForm, UseFormProps } from "react-hook-form";

type Props<T extends FieldValues> = {
  defaultValues?: UseFormProps<T>["defaultValues"];
  schema?: ZodType;
  useFormProps?: UseFormProps<T>;
};

export function useFormCustom<T extends FieldValues>({
  defaultValues,
  schema,
  useFormProps,
}: Props<T> = {}) {
  // TODO: TRY TO GET CONTEXT FIRST
  const defaultFormProps: UseFormProps<T> = {
    mode: "onBlur",
    defaultValues,
    resolver: schema ? zodResolver(schema) : undefined,
  };

  const _options = useMemo(
    () => merge(defaultFormProps, useFormProps),
    [defaultFormProps, useFormProps]
  );

  const methods = useForm<T>(_options);

  return methods;
}
