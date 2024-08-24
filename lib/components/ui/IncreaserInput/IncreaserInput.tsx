import { mask } from "@/utils/mask";
import { Button, ButtonProps, Input, InputProps } from "@nextui-org/react";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

type Props = Omit<InputProps, "endContent" | "startContent"> & {
  buttonProps?: ButtonProps;
};

export default function IncreaserInput({
  defaultValue,
  value,
  onValueChange = () => {},
  buttonProps,
  ...props
}: Props) {
  const [_value, _setValue] = useState(value ?? defaultValue);

  const hasLabelInside =
    props.label &&
    (props.labelPlacement === "inside" || props.labelPlacement === undefined);
  const isMin = Number(_value) <= Number(props.min);
  const isMax = Number(_value) >= Number(props.max);

  function onChange(value: string) {
    onValueChange(value);
    _setValue(value);
  }

  function sumString(string: string | undefined, value: number) {
    return String(Number(string) + value);
  }

  const decrease = () => {
    const val = sumString(_value, -1);
    if (Number(val) < Number(props.min)) return;
    _setValue(String(val));
  };

  const increase = () => {
    const val = sumString(_value, +1);
    if (Number(val) > Number(props.max)) return;
    _setValue(val);
  };

  return (
    <Input
      value={mask.number(_value)}
      onValueChange={onChange}
      classNames={{
        base: "w-auto",
        input: "text-center",
        inputWrapper: !hasLabelInside ? "w-32" : undefined,
        label: hasLabelInside ? "text-center w-full pe-0 ps-2" : undefined,
      }}
      startContent={
        <Button
          isIconOnly
          onPress={decrease}
          isDisabled={isMin}
          size="sm"
          className={`-ms-2 ${hasLabelInside ? "-mb-1.5" : ""}`}
          {...buttonProps}
        >
          <Minus />
        </Button>
      }
      endContent={
        <Button
          isIconOnly
          onPress={increase}
          isDisabled={isMax}
          size="sm"
          className={`-me-2 ${hasLabelInside ? "-mb-1.5" : ""}`}
          {...buttonProps}
        >
          <Plus />
        </Button>
      }
      {...props}
    />
  );
}
