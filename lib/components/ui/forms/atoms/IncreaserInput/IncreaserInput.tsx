import { mask } from "@/utils/mask";
import { Button, ButtonProps, InputProps } from "@nextui-org/react";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import Input from "../Input/Input";

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
  const [_value, _setValue] = useState(value ?? defaultValue ?? "0");

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
    onChange(String(val));
  };

  const increase = () => {
    const val = sumString(_value, +1);
    if (Number(val) > Number(props.max)) return;
    onChange(val);
  };

  const DecreaseButton = () => (
    <Button
      isIconOnly
      onPress={decrease}
      isDisabled={isMin}
      size="sm"
      // variant={hasLabelInside ? "light" : undefined}
      className={!hasLabelInside ? "-ms-2" : "min-w-6 w-6 h-6 rounded-t-none"}
      {...buttonProps}
    >
      <Minus />
    </Button>
  );

  const IncreaseButton = () => (
    <Button
      isIconOnly
      onPress={increase}
      isDisabled={isMax}
      size="sm"
      // variant={hasLabelInside ? "light" : undefined}
      className={!hasLabelInside ? "-me-2" : "min-w-6 w-6 h-6 rounded-b-none"}
      {...buttonProps}
    >
      <Plus />
    </Button>
  );

  return (
    <div className="flex items-center gap-1">
      <Input
        value={mask.number(_value)}
        onValueChange={onChange}
        classNames={{
          base: "w-auto",
          input: !hasLabelInside ? "text-center" : undefined,
        }}
        startContent={!hasLabelInside && <DecreaseButton />}
        endContent={
          !hasLabelInside ? (
            <IncreaseButton />
          ) : (
            <div className="grid grid-rows-2 -mb-1.5 -me-1.5">
              <IncreaseButton />
              <DecreaseButton />
            </div>
          )
        }
        {...props}
      />
    </div>
  );
}
