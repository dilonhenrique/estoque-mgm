"use client";

import { Ref, useMemo, useState } from "react";
import { globalConfig } from "@/utils/consts/global.config";
import {
  Autocomplete as NAutocomplete,
  AutocompleteProps,
} from "@nextui-org/react";
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
  get,
  useFormContext,
  UseFormRegister,
} from "react-hook-form";
import { syntheticChangeEvent } from "@/utils/form/syntheticEvent";

type Key = string | number;

type RawProps<T extends object> = AutocompleteProps<T> & {
  inputRef?: Ref<HTMLInputElement>;
};

type NormalProps<T extends object> = RawProps<T>;

type ControlledProps<
  U extends object,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = NormalProps<U> &
  Omit<ControllerProps<TFieldValues, TName>, "render"> & {
    register: UseFormRegister<FieldValues>;
  };

type Props<U extends object> = NormalProps<U> | ControlledProps<U>;

export default function Autocomplete<T extends object>(props: Props<T>) {
  const { name, ...rest } = props;
  const methods = useFormContext();

  if (methods?.control && name) {
    const fieldErros = methods.getFieldState(name)?.error;

    const value = props.selectedKey ?? props.defaultSelectedKey;
    if (value !== undefined) methods.setValue(name, value);

    return (
      <ControlledAutocomplete
        name={name}
        control={methods.control}
        register={methods.register}
        isInvalid={!!fieldErros?.message}
        errorMessage={fieldErros?.message?.toString()}
        {...rest}
      />
    );
  }

  return <NormalAutocomplete {...props} />;
}

function ControlledAutocomplete<T extends object>({
  name,
  control,
  register,
  selectedKey,
  defaultSelectedKey,
  onSelectionChange = () => {},
  inputRef,
  ...rest
}: ControlledProps<T>) {
  const typedInputName = useMemo(() => generateInputLabelName(name), [name]);
  const _defaultSelectedKey = useMemo(
    () => defaultSelectedKey ?? get(control?._defaultValues, name),
    [name, defaultSelectedKey]
  );
  const inputProps = register(name);

  const [value, setValue] = useState<Key | null | undefined>(
    selectedKey ?? _defaultSelectedKey
  );

  function syncValues(key: Key | null) {
    onSelectionChange(key);
    setValue(key);
    inputProps.onChange(syntheticChangeEvent(name, key));
  }

  return (
    <>
      <Controller
        name={typedInputName}
        control={control}
        render={({ field: { disabled, onChange, ref, ...field } }) => (
          <RawAutocomplete
            selectedKey={selectedKey}
            onSelectionChange={syncValues}
            isDisabled={disabled}
            onInputChange={(val) =>
              onChange(syntheticChangeEvent(typedInputName, val))
            }
            defaultSelectedKey={_defaultSelectedKey}
            inputRef={ref}
            {...field}
            {...rest}
          />
        )}
      />
      <input
        className="hidden"
        value={value === undefined || value === null ? "" : String(value)}
        {...inputProps}
      />
    </>
  );
}

function NormalAutocomplete<T extends object>({
  name,
  selectedKey,
  onSelectionChange = () => {},
  inputRef,
  ...props
}: NormalProps<T>) {
  const [value, setValue] = useState<Key | null | undefined>(
    selectedKey ?? props.defaultSelectedKey
  );

  function syncValues(key: Key | null) {
    onSelectionChange(key);
    setValue(key);
  }

  return (
    <>
      <RawAutocomplete
        name={`${name}_name`}
        selectedKey={selectedKey}
        onSelectionChange={syncValues}
        {...props}
      />
      <input
        className="hidden"
        ref={inputRef}
        name={name}
        value={value === undefined || value === null ? "" : String(value)}
        onInput={(ev) => setValue(ev.currentTarget.value)}
      />
    </>
  );
}

function RawAutocomplete<T extends object>({
  inputRef,
  ...props
}: RawProps<T>) {
  const { variant, labelPlacement } = globalConfig.input;

  return (
    <>
      <NAutocomplete
        variant={variant}
        labelPlacement={labelPlacement}
        // inputProps={{ ref: inputRef }}
        {...props}
      />
    </>
  );
}

function generateInputLabelName(name: string) {
  const lastDotIndex = name.lastIndexOf(".");
  if (lastDotIndex > 0) {
    return `${name.slice(0, lastDotIndex)}.name`;
  }
  return `${name}_name`;
}
