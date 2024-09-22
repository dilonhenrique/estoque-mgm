import { fakeEvent } from "@/utils/form/fakeEvent";
import { mask } from "@/utils/mask";
import {
  Button,
  ButtonProps,
  forwardRef,
  Input,
  InputProps,
} from "@nextui-org/react";
import { Minus, Plus } from "lucide-react";
import {
  ChangeEvent,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
  useFormContext,
} from "react-hook-form";

type Props = NormalProps | ControlledProps;

type ControlledProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = NormalProps & Omit<ControllerProps<TFieldValues, TName>, "render">;

type NormalProps = Omit<
  InputProps,
  | "endContent"
  | "startContent"
  | "value"
  | "defaultValue"
  | "onValueChange"
  | "min"
  | "max"
> & {
  buttonProps?: ButtonProps;
  value?: number | null;
  defaultValue?: number | null;
  onValueChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
};

export default function IncreaserInput(props: Props) {
  const { name, ...rest } = props;
  const methods = useFormContext();

  if (methods?.control && name) {
    const fieldErros = methods.getFieldState(name)?.error;

    const value = props.value ?? props.defaultValue;
    if (value !== undefined) methods.setValue(name, value);

    return (
      <ControlledIncreaserInput
        name={name}
        control={methods.control}
        isInvalid={!!fieldErros?.message}
        errorMessage={fieldErros?.message?.toString()}
        {...rest}
      />
    );
  }

  return <NormalIncreaserInput {...props} />;
}

function ControlledIncreaserInput({ name, control, ...rest }: ControlledProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { disabled, ...field } }) => {
        // console.log(rest.isInvalid);
        // console.log(field.value);
        return (
          <NormalIncreaserInput {...field} isDisabled={disabled} {...rest} />
        );
      }}
    />
  );
}

const NormalIncreaserInput = forwardRef(
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
    }: NormalProps,
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
      if (onChange) onChange(fakeEvent(props.name, newValue));
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
