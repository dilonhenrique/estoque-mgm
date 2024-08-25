import { ArrowDownCircle, ArrowUpCircle, MinusCircle } from "lucide-react";

type Color =
  | "default"
  | "success"
  | "danger"
  | "primary"
  | "secondary"
  | "warning";

export const getNumberColor = {
  color(num: number, fallback: Color = "default"): Color {
    if (num === 0) return fallback;
    if (num > 0) return "success";
    return "danger";
  },
  text(num: number, fallback = "") {
    if (num === 0) return fallback;
    if (num > 0) return "text-success";
    return "text-danger";
  },
  icon(num: number, fallback = MinusCircle): typeof MinusCircle {
    if (num === 0) return fallback;
    if (num > 0) return ArrowUpCircle;
    return ArrowDownCircle;
  },
};
