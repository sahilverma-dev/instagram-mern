export const pageVariants = {
  initial: {
    opacity: 0,
    x: "-100wh",
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
  exit: {
    opacity: 0,
    x: "100wh",
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};

export const container = {
  hidden: { opacity: 0, x: "-100wh" },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      staggerChildren: 0.05,
    },
  },
};

export const item = {
  hidden: { x: -20, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
  },
};

export const likeIconVarient = {
  liked: {
    scale: [1, 2, 1],
    opacity: [0.5, 1, 0],
  },
  unliked: {
    opacity: 0,
  },
};
