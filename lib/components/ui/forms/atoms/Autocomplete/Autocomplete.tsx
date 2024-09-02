"use client";

import { globalConfig } from "@/utils/consts/global.config";
import {
  Autocomplete as NAutocomplete,
  AutocompleteProps,
} from "@nextui-org/react";
import { useState } from "react";

type Key = string | number;
type Props<T extends object> = AutocompleteProps<T>;

export default function Autocomplete<T extends object>({
  name,
  selectedKey,
  onSelectionChange = () => {},
  ...props
}: Props<T>) {
  const { variant, labelPlacement } = globalConfig.input;
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
        variant={variant}
        labelPlacement={labelPlacement}
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
