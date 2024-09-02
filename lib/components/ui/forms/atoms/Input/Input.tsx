import { globalConfig } from "@/utils/consts/global.config";
import { Input as NInput, InputProps } from "@nextui-org/react";

type Props = InputProps;

export default function Input(props: Props) {
  const { variant, labelPlacement } = globalConfig.input;

  return (
    <NInput variant={variant} labelPlacement={labelPlacement} {...props} />
  );
}
