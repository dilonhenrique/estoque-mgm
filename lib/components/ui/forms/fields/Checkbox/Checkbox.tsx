import React, { useMemo } from "react";
import { Checkbox as NCheckbox } from "@nextui-org/react";
import { Controller, get, useFormContext } from "react-hook-form";
import {
  CheckboxControlledProps,
  CheckboxProps,
  CheckboxUncontrolledProps,
} from "./Checkbox.type";

export default function Checkbox(props: CheckboxProps) {
  const { name, ...rest } = props;
  const methods = useFormContext();

  if (methods?.control && name) {
    const fieldErros = methods.getFieldState(name)?.error;

    const selected =
      typeof props.isSelected === "boolean"
        ? props.isSelected
        : props.defaultSelected;
    if (selected !== undefined) methods.setValue(name, selected);

    return (
      <Controlled
        name={name}
        control={methods.control}
        isInvalid={!!fieldErros?.message}
        {...rest}
      />
    );
  }

  return <Uncontrolled {...props} />;
}

function Controlled({
  name,
  control,
  defaultSelected,
  ...props
}: CheckboxControlledProps) {
  const _defaultSelected = useMemo(
    () => defaultSelected ?? get(control?._defaultValues, name),
    [name, defaultSelected, control?._defaultValues]
  );

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { disabled, ...field } }) => (
        <Uncontrolled
          {...field}
          isDisabled={disabled}
          {...props}
          defaultSelected={_defaultSelected}
        />
      )}
    />
  );
}

function Uncontrolled(props: CheckboxUncontrolledProps) {
  // const { variant, labelPlacement } = globalConfig.input;

  return <NCheckbox {...props} />;
}
