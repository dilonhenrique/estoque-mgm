import { globalConfig } from "@/utils/consts/global.config";
import { Input as NInput, forwardRef } from "@nextui-org/react";
import { Controller, useFormContext } from "react-hook-form";
import {
  InputControlledProps,
  InputProps,
  InputUncontrolledProps,
} from "./Input.type";
import { IMaskInputProps, IMaskMixin, IMaskMixinProps } from "react-imask";

export default function Input(props: InputProps) {
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

function Controlled({ name, control, ...rest }: InputControlledProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { disabled, ref, ...field } }) => (
        <Uncontrolled {...field} isDisabled={disabled} {...rest} />
      )}
    />
  );
}

const Uncontrolled = forwardRef((props: InputUncontrolledProps, ref) => {
  const { variant, labelPlacement } = globalConfig.input;

  return (
    //@ts-ignore
    <MaskedInput
      inputRef={ref}
      variant={variant}
      labelPlacement={labelPlacement}
      {...props}
    />
  );
});

const MaskedInput = IMaskMixin<
  HTMLInputElement,
  IMaskMixinProps<HTMLInputElement>
>((props) => {
  const { inputRef, ...rest } = props;

  // @ts-ignore
  return <NInput ref={inputRef} {...rest} />;
});
