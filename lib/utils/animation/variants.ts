import { Variants } from "framer-motion";

export const menuVariants: Variants = {
  enter: {
    translateX: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
      easings: "easeOut",
    },
  },
  exit: {
    translateX: '-5rem',
    opacity: 0,
    transition: {
      duration: 0.25,
      easings: "easeIn",
    },
  },
};
