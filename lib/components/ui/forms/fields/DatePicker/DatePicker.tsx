import { useMemo } from "react";
import { syntheticChangeEvent } from "@/utils/form/syntheticEvent";
import { sanitizeDate } from "@/utils/parser/other/sanitizeDate";
import { globalConfig } from "@/utils/consts/global.config";
import { parseDateToDateValue } from "@/utils/parser/other/parseDateToDateValue";
import { DatePicker as NDatePicker } from "@nextui-org/react";
import { Controller, get, useFormContext } from "react-hook-form";
import {
  DatePickerControlledProps,
  DatePickerProps,
  DatePickerUncontrolledProps,
} from "./DatePicker.type";

export default function DatePicker(props: DatePickerProps) {
  const { name, ...rest } = props;
  const methods = useFormContext();

  if (methods?.control && name) {
    const fieldErros = methods.getFieldState(name)?.error;

    const value = props.value ?? props.defaultValue;
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

function Controlled({
  name,
  control,
  defaultValue,
  ...rest
}: DatePickerControlledProps) {
  const _defaultValue = useMemo(
    () => defaultValue ?? get(control?._defaultValues, name),
    [name, defaultValue]
  );

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { disabled, ref, onChange, value, ...field } }) => {
        return (
          <Uncontrolled
            {...field}
            isDisabled={disabled}
            inputRef={ref}
            {...rest}
            defaultValue={_defaultValue}
            onChange={(val) => {
              const sanitizedDate = sanitizeDate(val?.toString());
              onChange(syntheticChangeEvent(name, sanitizedDate));
            }}
          />
        );
      }}
    />
  );
}

function Uncontrolled({ defaultValue, ...props }: DatePickerUncontrolledProps) {
  const { variant, labelPlacement } = globalConfig.input;
  const _defaultValue = parseDateToDateValue(defaultValue);

  return (
    <NDatePicker
      variant={variant}
      labelPlacement={labelPlacement}
      defaultValue={_defaultValue}
      hideTimeZone
      {...props}
    />
  );
}
