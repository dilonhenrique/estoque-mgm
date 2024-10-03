import {
  DatePickerProps as NDatePickerProps,
  DateValue,
} from "@nextui-org/react";
import { ControllerProps, FieldPath, FieldValues } from "react-hook-form";

export type DatePickerUncontrolledProps = Omit<
  NDatePickerProps,
  "defaultValue"
> & {
  defaultValue?: Date | DateValue;
};

export type DatePickerControlledProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = DatePickerUncontrolledProps &
  Omit<ControllerProps<TFieldValues, TName>, "render"> & {
    disableRhf?: false;
    value?: never;
  };

export type DatePickerProps =
  | (DatePickerUncontrolledProps & { disableRhf: true })
  | DatePickerControlledProps;
