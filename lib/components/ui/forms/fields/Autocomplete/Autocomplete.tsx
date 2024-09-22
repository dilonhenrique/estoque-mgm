"use client";

import { useMemo, useState } from "react";
import { globalConfig } from "@/utils/consts/global.config";
import {
  AutocompleteProps,
  Autocomplete as NAutocomplete,
} from "@nextui-org/react";
import { Controller, get, useFormContext } from "react-hook-form";
import { syntheticChangeEvent } from "@/utils/form/syntheticEvent";
import {
  AutocompleteControlledProps,
  AutocompleteRawProps,
  AutocompleteUncontrolledProps,
  Key,
} from "./Autocomplete.type";

export default function Autocomplete<T extends object>(
  props: AutocompleteProps<T>
) {
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
}: AutocompleteControlledProps<T>) {
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
}: AutocompleteUncontrolledProps<T>) {
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
}: AutocompleteRawProps<T>) {
  const { variant, labelPlacement } = globalConfig.input;

  return (
    <>
      <NAutocomplete
        variant={variant}
        labelPlacement={labelPlacement}
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
