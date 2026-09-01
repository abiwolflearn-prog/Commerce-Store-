import React from 'react';
import { motion, HTMLMotionProps } from 'motion/react';

export type RevealDirection = 'up' | 'down' | 'left' | 'right' | 'scale' | 'none';

export interface ScrollRevealProps extends HTMLMotionProps<'div'> {
  direction?: RevealDirection;
  distance?: number;
  delay?: number;
  duration?: number;
  once?: boolean;
  margin?: string;
  children?: React.ReactNode;
}

/**
 * ScrollReveal Component
 * Triggers a premium fade-in-out or translation entrance animation 
 * using an elegant cubic-bezier curve when scrolled into view.
 */
export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  direction = 'up',
  distance = 40,
  delay = 0,
  duration = 0.8,
  once = true,
  margin = '-50px',
  ...props
}) => {
  const variants = {
    hidden: {
      opacity: 0,
      x: direction === 'left' ? distance : direction === 'right' ? -distance : 0,
      y: direction === 'up' ? distance : direction === 'down' ? -distance : 0,
      scale: direction === 'scale' ? 0.95 : 1,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: {
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin }}
      variants={variants}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export interface StaggerContainerProps extends HTMLMotionProps<'div'> {
  staggerDelay?: number;
  initialDelay?: number;
  once?: boolean;
  margin?: string;
  children?: React.ReactNode;
}

/**
 * StaggerContainer Component
 * Orchestrates staggered entry timelines for nested StaggerItem components.
 */
export const StaggerContainer: React.FC<StaggerContainerProps> = ({
  children,
  staggerDelay = 0.12,
  initialDelay = 0,
  once = true,
  margin = '-50px',
  ...props
}) => {
  const variants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: initialDelay,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin }}
      variants={variants}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export interface StaggerItemProps extends HTMLMotionProps<'div'> {
  direction?: RevealDirection;
  distance?: number;
  duration?: number;
  children?: React.ReactNode;
}

/**
 * StaggerItem Component
 * Animates in sync with the parent StaggerContainer's stagger timeline.
 */
export const StaggerItem: React.FC<StaggerItemProps> = ({
  children,
  direction = 'up',
  distance = 40,
  duration = 0.8,
  ...props
}) => {
  const itemVariants = {
    hidden: {
      opacity: 0,
      x: direction === 'left' ? distance : direction === 'right' ? -distance : 0,
      y: direction === 'up' ? distance : direction === 'down' ? -distance : 0,
      scale: direction === 'scale' ? 0.95 : 1,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: {
        duration,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.div
      variants={itemVariants}
      {...props}
    >
      {children}
    </motion.div>
  );
};
