import { globalConfig } from "@/utils/consts/global.config";
import { DatePicker as NDatePicker, DatePickerProps } from "@nextui-org/react";

type Props = DatePickerProps;

export default function DatePicker(props: Props) {
  const { variant, labelPlacement } = globalConfig.input;

  return (
    <NDatePicker variant={variant} labelPlacement={labelPlacement} {...props} />
  );
}
