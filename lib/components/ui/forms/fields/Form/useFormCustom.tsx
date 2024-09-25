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
  const defaultFormProps: UseFormProps<T> = useMemo(
    () => ({
      mode: "onBlur",
      reValidateMode: "onChange",
      defaultValues,
      resolver: schema ? zodResolver(schema) : undefined,
    }),
    [schema, defaultValues]
  );

  const _options = useMemo(
    () => merge(defaultFormProps, useFormProps),
    [defaultFormProps, useFormProps]
  );

  const methods = useForm<T>(_options);

  return methods;
}
