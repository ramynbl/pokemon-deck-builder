import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const pageVariants = {
  initial: { opacity: 0, scale: 0.98, y: 10 },
  in: { opacity: 1, scale: 1, y: 0 },
  out: { opacity: 0, scale: 1.02, y: -10 }
};

const pageTransition = {
  type: "spring",
  stiffness: 300,
  damping: 25,
  mass: 0.8
};

export default function PageTransition({ children, className = "" }) {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className={className}
      style={{ width: "100%", height: "100%" }}
    >
      {children}
    </motion.div>
  );
}
