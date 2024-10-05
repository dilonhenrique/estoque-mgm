import { InputProps as NInputProps } from "@nextui-org/react";
import { ControllerProps, FieldPath, FieldValues } from "react-hook-form";

export type InputUncontrolledProps = NInputProps;

export type InputControlledProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = InputUncontrolledProps &
  Omit<ControllerProps<TFieldValues, TName>, "render">;

export type InputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = InputUncontrolledProps | InputControlledProps<TFieldValues, TName>;
