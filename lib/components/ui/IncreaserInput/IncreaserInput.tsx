import { mask } from "@/utils/mask";
import { Button, ButtonProps, Input, InputProps } from "@nextui-org/react";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

type Props = InputProps & {
  buttonProps?: ButtonProps;
};

export default function IncreaserInput({
  value,
  onValueChange = () => {},
  buttonProps,
  ...props
}: Props) {
  const [_value, _setValue] = useState(value);

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
    <div className="flex gap-2 shrink-0 justify-start items-end">
      <Button
        isIconOnly
        onPress={decrease}
        isDisabled={isMin}
        size="sm"
        radius="full"
        className="mb-1"
        {...buttonProps}
      >
        <Minus />
      </Button>
      <Input
        value={mask.number(_value)}
        // value={_value}
        onValueChange={onChange}
        labelPlacement="outside"
        classNames={{
          base: "w-auto",
          input: "text-center",
          inputWrapper: "w-20",
        }}
        {...props}
      />
      <Button
        isIconOnly
        onPress={increase}
        isDisabled={isMax}
        size="sm"
        radius="full"
        className="mb-1"
        {...buttonProps}
      >
        <Plus />
      </Button>
    </div>
  );
}
