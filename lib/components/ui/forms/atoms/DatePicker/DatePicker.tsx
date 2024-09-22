import { useMemo } from "react";
import { syntheticChangeEvent } from "@/utils/form/syntheticEvent";
import { sanitizeDate } from "@/utils/parser/other/sanitizeDate";
import { globalConfig } from "@/utils/consts/global.config";
import { parseDateToDateValue } from "@/utils/parser/other/parseDateToDateValue";
import {
  DatePicker as NDatePicker,
  DatePickerProps,
  DateValue,
} from "@nextui-org/react";
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
  get,
  useFormContext,
} from "react-hook-form";

type NormalProps = Omit<DatePickerProps, "defaultValue"> & {
  defaultValue?: Date | DateValue;
};

type ControlledProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = NormalProps & Omit<ControllerProps<TFieldValues, TName>, "render">;

type Props = NormalProps | ControlledProps;

export default function DatePicker(props: Props) {
  const { name, ...rest } = props;
  const methods = useFormContext();

  if (methods?.control && name) {
    const fieldErros = methods.getFieldState(name)?.error;

    const value = props.value ?? props.defaultValue;
    if (value !== undefined) methods.setValue(name, value);

    return (
      <ControlledDatePicker
        name={name}
        control={methods.control}
        isInvalid={!!fieldErros?.message}
        errorMessage={fieldErros?.message?.toString()}
        {...rest}
      />
    );
  }

  return <NormalDatePicker {...props} />;
}

function ControlledDatePicker({
  name,
  control,
  defaultValue,
  ...rest
}: ControlledProps) {
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
          <NormalDatePicker
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

function NormalDatePicker({ defaultValue, ...props }: NormalProps) {
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
