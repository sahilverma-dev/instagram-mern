export const pageVariants = {
  initial: {
    opacity: 0,
    x: "-100wh",
  },
  animate: {
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

export const postContainerVariants = {
  hidden: {
    opacity: 0,
    x: -100,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      staggerChildren: 0.1,
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
  exit: {
    opacity: 0,
    x: -100,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};
export const postVarients = {
  hidden: {
    opacity: 0,
    x: -100,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
  exit: {
    opacity: 0,
    x: 100,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};
