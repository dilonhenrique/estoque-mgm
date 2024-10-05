import { ButtonProps, InputProps as NInputProps } from "@nextui-org/react";
import { ControllerProps, FieldPath, FieldValues } from "react-hook-form";

export type IncreaserInputProps =
  | IncreaserInputUncontrolledProps
  | IncreaserInputControlledProps;

export type IncreaserInputControlledProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = IncreaserInputUncontrolledProps &
  Omit<ControllerProps<TFieldValues, TName>, "render">;

export type IncreaserInputUncontrolledProps = Omit<
  NInputProps,
  | "endContent"
  | "startContent"
  | "value"
  | "defaultValue"
  | "onValueChange"
  | "min"
  | "max"
> & {
  buttonProps?: ButtonProps;
  value?: number | null;
  defaultValue?: number | null;
  onValueChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
};
