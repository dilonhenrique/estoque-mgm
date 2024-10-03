import { CheckboxProps as NCheckboxProps } from "@nextui-org/react";
import { ControllerProps, FieldPath, FieldValues } from "react-hook-form";

export type CheckboxUncontrolledProps = NCheckboxProps;

export type CheckboxControlledProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = CheckboxUncontrolledProps &
  Omit<ControllerProps<TFieldValues, TName>, "render"> & {
    disableRhf?: false;
    isSelected?: never;
  };

export type CheckboxProps =
  | (CheckboxUncontrolledProps & { disableRhf: true })
  | CheckboxControlledProps;
