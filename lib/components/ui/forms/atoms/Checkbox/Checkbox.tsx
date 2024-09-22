import React, { useMemo } from "react";
import { Checkbox as NCheckbox, CheckboxProps } from "@nextui-org/react";
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
  get,
  useFormContext,
} from "react-hook-form";

type NormalProps = CheckboxProps;

type ControlledProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = NormalProps & Omit<ControllerProps<TFieldValues, TName>, "render">;

type Props = NormalProps | ControlledProps;

export default function Checkbox(props: Props) {
  const { name, ...rest } = props;
  const methods = useFormContext();

  if (methods?.control && name) {
    const fieldErros = methods.getFieldState(name)?.error;

    return (
      <ControlledCheckbox
        name={name}
        control={methods.control}
        isInvalid={!!fieldErros?.message}
        // errorMessage={fieldErros?.message?.toString()}
        {...rest}
      />
    );
  }

  return <NormalCheckbox {...props} />;
}

function ControlledCheckbox({
  name,
  control,
  defaultSelected,
  ...rest
}: ControlledProps) {
  const _defaultSelected = useMemo(
    () => defaultSelected ?? get(control?._defaultValues, name),
    [name, defaultSelected]
  );

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { disabled, ...field } }) => (
        <NormalCheckbox
          {...field}
          isDisabled={disabled}
          {...rest}
          defaultSelected={_defaultSelected}
        />
      )}
    />
  );
}

function NormalCheckbox(props: NormalProps) {
  // const { variant, labelPlacement } = globalConfig.input;

  return <NCheckbox {...props} />;
}
