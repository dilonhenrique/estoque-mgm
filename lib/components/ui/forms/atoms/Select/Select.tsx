import { globalConfig } from "@/utils/consts/global.config";
import { Select as NSelect, SelectProps } from "@nextui-org/react";
import { Ref } from "react";
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
  useFormContext,
} from "react-hook-form";

type NormalProps<U extends object> = SelectProps<U> & {
  selectRef?: Ref<HTMLSelectElement>;
};

type ControlledProps<
  U extends object,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = NormalProps<U> & Omit<ControllerProps<TFieldValues, TName>, "render">;

type Props<U extends object> = NormalProps<U> | ControlledProps<U>;

export default function Select<T extends object>(props: Props<T>) {
  const { name, ...rest } = props;
  const methods = useFormContext();

  if (methods?.control && name) {
    const fieldErros = methods.getFieldState(name)?.error;

    const value = props.selectedKeys ?? props.defaultSelectedKeys;
    if (value !== undefined) methods.setValue(name, value);

    return (
      <ControlledSelect
        name={name}
        control={methods.control}
        isInvalid={!!fieldErros?.message}
        errorMessage={fieldErros?.message?.toString()}
        {...rest}
      />
    );
  }

  return <NormalSelect {...props} />;
}

function ControlledSelect<T extends object>({
  name,
  control,
  ...rest
}: ControlledProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { disabled, ref, ...field } }) => (
        <NormalSelect
          {...field}
          selectRef={ref}
          isDisabled={disabled}
          {...rest}
        />
      )}
    />
  );
}

function NormalSelect<T extends object>({
  selectRef,
  ...props
}: NormalProps<T>) {
  const { variant, labelPlacement } = globalConfig.input;

  return (
    <NSelect
      variant={variant}
      labelPlacement={labelPlacement}
      ref={selectRef}
      {...props}
    />
  );
}
