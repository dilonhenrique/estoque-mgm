import { globalConfig } from "@/utils/consts/global.config";
import { Select as NSelect, SelectProps } from "@nextui-org/react";

type Props<T extends object> = SelectProps<T>;

export default function Select<T extends object>(props: Props<T>) {
  const { variant, labelPlacement } = globalConfig.input;

  return (
    <NSelect variant={variant} labelPlacement={labelPlacement} {...props} />
  );
}
