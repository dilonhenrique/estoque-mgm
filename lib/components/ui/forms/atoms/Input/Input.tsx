import { globalConfig } from "@/utils/consts/global.config";
import { Input as NInput, InputProps, forwardRef } from "@nextui-org/react";
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
  useFormContext,
} from "react-hook-form";

type NormalProps = InputProps;

type ControlledProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = NormalProps & Omit<ControllerProps<TFieldValues, TName>, "render">;

type Props = NormalProps | ControlledProps;

export default function Input(props: Props) {
  const { name, ...rest } = props;
  const methods = useFormContext();

  if (methods?.control && name) {
    const fieldErros = methods.getFieldState(name)?.error;

    const value = props.value ?? props.defaultValue;
    if (value !== undefined) methods.setValue(name, value);

    return (
      <ControlledInput
        name={name}
        control={methods.control}
        isInvalid={!!fieldErros?.message}
        errorMessage={fieldErros?.message?.toString()}
        {...rest}
      />
    );
  }

  return <NormalInput {...props} />;
}

function ControlledInput({ name, control, ...rest }: ControlledProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { disabled, ...field } }) => (
        <NormalInput {...field} isDisabled={disabled} {...rest} />
      )}
    />
  );
}

const NormalInput = forwardRef((props: NormalProps, ref) => {
  const { variant, labelPlacement } = globalConfig.input;

  return (
    <NInput
      ref={ref}
      variant={variant}
      labelPlacement={labelPlacement}
      {...props}
    />
  );
});
