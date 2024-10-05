import { syntheticChangeEvent } from "@/utils/form/syntheticEvent";
import { Button, forwardRef, Input } from "@nextui-org/react";
import { Minus, Plus } from "lucide-react";
import { useEffect, useImperativeHandle, useRef, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import {
  IncreaserInputControlledProps,
  IncreaserInputProps,
  IncreaserInputUncontrolledProps,
} from "./IncreaserInput.type";

export default function IncreaserInput(props: IncreaserInputProps) {
  const { name, ...rest } = props;
  const methods = useFormContext();

  if (methods?.control && name) {
    const fieldErros = methods.getFieldState(name)?.error;

    const value = props.value ?? props.defaultValue;
    if (value !== undefined) methods.setValue(name, value);

    return (
      <Controlled
        name={name}
        control={methods.control}
        isInvalid={!!fieldErros?.message}
        errorMessage={fieldErros?.message?.toString()}
        {...rest}
      />
    );
  }

  return <Uncontrolled {...props} />;
}

function Controlled({ name, control, ...rest }: IncreaserInputControlledProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { disabled, ...field } }) => {
        return <Uncontrolled {...field} isDisabled={disabled} {...rest} />;
      }}
    />
  );
}

const Uncontrolled = forwardRef(
  (
    {
      defaultValue,
      min = 0,
      max = 100,
      step = 1,
      value = 0,
      onChange,
      buttonProps,
      onValueChange,
      ...props
    }: IncreaserInputUncontrolledProps,
    ref
  ) => {
    const [currentValue, setCurrentValue] = useState(
      value ?? defaultValue ?? 0
    );

    const inputRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(ref, () => inputRef.current);

    const focusInput = () => inputRef.current?.focus();

    const changeCurrentValue = (newValue: number) => {
      setCurrentValue(newValue);
      if (onChange) onChange(syntheticChangeEvent(props.name, newValue));
      if (onValueChange) onValueChange(newValue);
    };

    const handleDecrease = () => {
      const newValue = Math.max(min, currentValue - step);
      changeCurrentValue(newValue);

      focusInput();
    };

    const handleIncrease = () => {
      const newValue = Math.min(max, currentValue + step);
      changeCurrentValue(newValue);

      focusInput();
    };

    const handleInputChange = (val: string) => {
      const newValue = Number(val);
      if (!isNaN(newValue) && newValue >= min && newValue <= max) {
        changeCurrentValue(newValue);
      }
    };

    useEffect(() => {
      setCurrentValue(value ?? 0);
    }, [value]);

    const hasLabelInside =
      props.label &&
      (props.labelPlacement === "inside" || props.labelPlacement === undefined);
    const isMin = currentValue <= min;
    const isMax = currentValue >= max;

    const DecreaseButton = () => (
      <Button
        isIconOnly
        onPress={handleDecrease}
        onMouseDown={(e) => e.preventDefault()}
        isDisabled={isMin}
        size="sm"
        className={!hasLabelInside ? "-ms-2" : "min-w-6 w-6 h-6 rounded-t-none"}
        {...buttonProps}
      >
        <Minus />
      </Button>
    );

    const IncreaseButton = () => (
      <Button
        isIconOnly
        onPress={handleIncrease}
        onMouseDown={(e) => e.preventDefault()}
        isDisabled={isMax}
        size="sm"
        className={!hasLabelInside ? "-me-2" : "min-w-6 w-6 h-6 rounded-b-none"}
        {...buttonProps}
      >
        <Plus />
      </Button>
    );

    return (
      <Input
        ref={inputRef}
        value={String(currentValue)}
        onValueChange={handleInputChange}
        min={min}
        max={max}
        step={step}
        classNames={{
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
    );
  }
);
