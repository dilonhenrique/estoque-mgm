import { globalConfig } from "@/utils/consts/global.config";
import { Select as NSelect } from "@nextui-org/react";
import { Controller, useFormContext } from "react-hook-form";
import {
  SelectControlledProps,
  SelectProps,
  SelectUncontrolledProps,
} from "./Select.type";

export default function Select<T extends object>(props: SelectProps<T>) {
  const { name, ...rest } = props;
  const methods = useFormContext();

  if (methods?.control && name) {
    const fieldErros = methods.getFieldState(name)?.error;

    const value = props.selectedKeys ?? props.defaultSelectedKeys;
    if (value !== undefined) methods.setValue(name, value);

    return (
      <Controlled
        name={name}
        control={methods.control}
        isInvalid={!!fieldErros?.message}
        errorMessage={fieldErros?.message?.toString()}
        {...rest}
      />
    );
  }

  return <Uncontrolled {...props} />;
}

function Controlled<T extends object>({
  name,
  control,
  ...rest
}: SelectControlledProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { disabled, ref, ...field } }) => (
        <Uncontrolled
          {...field}
          selectRef={ref}
          isDisabled={disabled}
          {...rest}
        />
      )}
    />
  );
}

function Uncontrolled<T extends object>({
  selectRef,
  ...props
}: SelectUncontrolledProps<T>) {
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
