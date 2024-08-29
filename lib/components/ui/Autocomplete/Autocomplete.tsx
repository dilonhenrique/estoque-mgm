"use client";

import {
  Autocomplete as NAutocomplete,
  AutocompleteProps,
} from "@nextui-org/react";
import { useState } from "react";

type Key = string | number;

export default function Autocomplete<T extends object>({
  name,
  selectedKey,
  onSelectionChange = () => {},
  // onInputChange = () => {},
  ...props
}: AutocompleteProps<T>) {
  const [value, setValue] = useState<Key | null | undefined>(
    selectedKey ?? props.defaultSelectedKey
  );

  function onChange(key: Key | null) {
    onSelectionChange(key);
    setValue(key);
  }

  return (
    <>
      <NAutocomplete
        name={`labeled_${name}`}
        selectedKey={selectedKey}
        onSelectionChange={onChange}
        // onSelect={(ev) => {
        //   console.log(ev.currentTarget.value);
        // }}
        // onInputChange={(val) => {
        //   onInputChange(val);
        //   if (props.allowsCustomValue) onChange(val);
        // }}
        {...props}
      />
      <input
        className="hidden"
        name={name}
        value={value === undefined || value === null ? "" : String(value)}
        onInput={(ev) => setValue(ev.currentTarget.value)}
      />
    </>
  );
}
