import { Variants } from "framer-motion";

export const menuVariants: Variants = {
  enter: {
    x: 0,
    transition: {
      duration: 0.3,
      easings: "easeOut",
    },
  },
  exit: {
    x: '-20rem',
    transition: {
      duration: 0.25,
      easings: "easeIn",
    },
  },
};
