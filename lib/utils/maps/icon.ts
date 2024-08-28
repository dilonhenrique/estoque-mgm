import {
  Package,
  TestTubeDiagonal,
  FlaskRound,
  Truck,
  Handshake,
  PillBottle,
  Smile,
  HandHeart,
  Sparkle,
  LucideIcon,
  Syringe,
} from "lucide-react";

const icon = new Map<string, LucideIcon>([
  ["product", Syringe],
  ["customer", Smile],
  ["supplier", Truck],
  ["service", HandHeart],
  ["procedure", Handshake],
  ["purchase", Package],
]);

export function getIcon(key: string) {
  return icon.get(key) ?? null;
}
