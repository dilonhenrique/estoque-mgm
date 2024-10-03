import { SelectProps as NSelectProps } from "@nextui-org/react";
import { Ref } from "react";
import { ControllerProps, FieldPath, FieldValues } from "react-hook-form";

export type SelectUncontrolledProps<U extends object> = NSelectProps<U> & {
  selectRef?: Ref<HTMLSelectElement>;
};

export type SelectControlledProps<
  U extends object,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = SelectUncontrolledProps<U> &
  Omit<ControllerProps<TFieldValues, TName>, "render"> & {
    disableRhf?: false;
    selectedKeys?: never;
  };

export type SelectProps<U extends object> =
  | (SelectUncontrolledProps<U> & { disableRhf: true })
  | SelectControlledProps<U>;
