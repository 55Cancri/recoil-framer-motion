import { Variants, TargetAndTransition, Variant } from "framer-motion";
import * as Utils from "../modules/utils";

const SCALE = 0.95;

export const page: Variants = {
  initial: { opacity: 1, when: "beforeChildren" } as Variant,
  enter: { opacity: 1, when: "beforeChildren" } as Variant,
  exit: {
    opacity: 1,
    transition: {
      easings: "easeInOut",
      when: "afterChildren",
    } as TargetAndTransition,
  },
};

export const fade = {
  initial: { opacity: 0 } as Variant,
  enter: { opacity: 1, transition: { staggerChildren: 2.5 } } as Variant,
  exit: { opacity: 0 } as Variant,
};

export const bounce = {
  initial: {
    scale: 0.5,
    opacity: 0,
    // transition: { duration: 0.2 },
  } as Variant,
  enter: {
    scale: 1,
    opacity: 1,
    // transition: { type: "spring", bounce: 0.6 },
  } as Variant,
  exit: {
    scale: 0.5,
    opacity: 0,
    // transition: { duration: 0.2 },
  } as Variant,
};

type Opts = {
  delay?: number;
};
type Direction = "left" | "right" | "up" | "down";
export const swipe = (direction: Direction, opts?: Opts): Variants => {
  const delay = opts?.delay ?? Utils.Numbers.random(0.1, 0.3);
  const coords = get_coords(direction);
  return {
    initial: {
      scale: SCALE,
      opacity: 0,
      x: coords.x,
      y: coords.y,
      transition: {
        type: "spring",
        stiffness: 55,
        delay,
        // delay: Utils.Numbers.random(0.1, 0.3),
        duration: Utils.Numbers.random(0.1, 1),
      } as TargetAndTransition,
    },
    enter: {
      scale: 1,
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 55,
        delay,
        duration: Utils.Numbers.random(0.1, 1),
      } as TargetAndTransition,
    },
    exit: {
      scale: SCALE,
      opacity: 0,
      x: coords.x,
      y: coords.y,
      transition: {
        easings: "easeInOut",
        delay,
        duration: Utils.Numbers.random(0.1, 1),
      } as TargetAndTransition,
    },
  };
};

export const ul = {
  open: {
    height: "auto",
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.2,
      easings: "easeInOut",
      when: "beforeChildren",
    } as TargetAndTransition,
  },
  closed: {
    height: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
      easings: "easeInOut",
      when: "afterChildren",
    } as TargetAndTransition,
  },
};

export const li = {
  open: {
    x: 0,
    opacity: 1,
    transition: { x: { stiffness: 1000, velocity: -100 } },
  },
  closed: {
    x: -50,
    opacity: 0,
    transition: { x: { stiffness: 1000 } },
  },
};

function get_coords(direction: Direction) {
  if (direction === "left" || direction === "right") {
    return { x: direction === "left" ? -500 : 500, y: 0 };
  }
  if (direction === "down" || direction === "up") {
    return { y: direction === "down" ? -500 : 500, x: 0 };
  }
  throw new Error("Invalid direction.");
}
