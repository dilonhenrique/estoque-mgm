import { globalConfig } from "@/utils/consts/global.config";
import { Input as NInput, forwardRef } from "@nextui-org/react";
import { Controller, useFormContext } from "react-hook-form";
import {
  InputControlledProps,
  InputProps,
  InputUncontrolledProps,
} from "./Input.type";

export default function Input({ disableRhf, ...props }: InputProps) {
  const { name, value, ...rest } = props;
  const methods = useFormContext();

  if (methods?.control && name && !disableRhf) {
    const fieldErros = methods.getFieldState(name)?.error;

    if (props.defaultValue !== undefined)
      methods.setValue(name, props.defaultValue);

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
      render={({ field: { disabled, ...field } }) => (
        <Uncontrolled {...field} isDisabled={disabled} {...rest} />
      )}
    />
  );
}

const Uncontrolled = forwardRef((props: InputUncontrolledProps, ref) => {
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
