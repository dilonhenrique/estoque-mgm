import { AutocompleteProps as NAutocompleteProps } from "@nextui-org/react";
import { Ref } from "react";
import {
  ControllerProps,
  FieldPath,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";

export type Key = string | number;

export type AutocompleteRawProps<T extends object> = NAutocompleteProps<T> & {
  inputRef?: Ref<HTMLInputElement>;
};

export type AutocompleteUncontrolledProps<T extends object> =
  AutocompleteRawProps<T>;

export type AutocompleteControlledProps<
  U extends object,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = AutocompleteUncontrolledProps<U> &
  Omit<ControllerProps<TFieldValues, TName>, "render"> & {
    register: UseFormRegister<FieldValues>;
  };

export type AutocompleteProps<U extends object> =
  | AutocompleteUncontrolledProps<U>
  | AutocompleteControlledProps<U>;
