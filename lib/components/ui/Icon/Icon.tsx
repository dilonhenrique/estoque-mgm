import { getIcon } from "@/utils/maps/icon";
import { LucideProps } from "lucide-react";

type Props = LucideProps & {
  value: string;
};

export default function Icon({ value, ...props }: Props) {
  const IconKeyed = getIcon(value);

  if (IconKeyed === null) return <></>;

  return <IconKeyed {...props} />;
}
