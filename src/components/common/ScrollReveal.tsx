import React from 'react';
import { motion, useReducedMotion, Variant } from 'motion/react';

export type RevealVariant =
  | 'fadeUp'
  | 'fadeDown'
  | 'fadeLeft'
  | 'fadeRight'
  | 'zoomIn'
  | 'zoomOut'
  | 'flip'
  | 'blurIn'
  | 'stamp';

interface ScrollRevealProps {
  children: React.ReactNode;
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  once?: boolean;
  amount?: number | 'some' | 'all';
}

const baseEase: Variant['ease'] = [0.22, 1, 0.36, 1];

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  variant = 'fadeUp',
  delay = 0,
  duration,
  distance = 36,
  className,
  as,
  once = true,
  amount = 0.2,
}) => {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    const Tag: any = as || 'div';
    return <Tag className={className}>{children}</Tag>;
  }

  const MotionTag: any = as ? (motion as any)[as as string] : motion.div;

  const defaults = {
    transition: {
      duration: duration ?? 0.7,
      delay,
      ease: baseEase,
    },
    viewport: { once, amount },
  };

  const variants: Record<RevealVariant, { hidden: any; show: any }> = {
    fadeUp: {
      hidden: { opacity: 0, y: distance },
      show: { opacity: 1, y: 0 },
    },
    fadeDown: {
      hidden: { opacity: 0, y: -distance },
      show: { opacity: 1, y: 0 },
    },
    fadeLeft: {
      hidden: { opacity: 0, x: distance },
      show: { opacity: 1, x: 0 },
    },
    fadeRight: {
      hidden: { opacity: 0, x: -distance },
      show: { opacity: 1, x: 0 },
    },
    zoomIn: {
      hidden: { opacity: 0, scale: 0.88 },
      show: { opacity: 1, scale: 1 },
    },
    zoomOut: {
      hidden: { opacity: 0, scale: 1.08 },
      show: { opacity: 1, scale: 1 },
    },
    flip: {
      hidden: { opacity: 0, rotateX: -90 },
      show: { opacity: 1, rotateX: 0 },
    },
    blurIn: {
      hidden: { opacity: 0, filter: 'blur(14px)' },
      show: { opacity: 1, filter: 'blur(0px)' },
    },
    stamp: {
      hidden: { opacity: 0, scale: 1.8 },
      show: { opacity: 1, scale: 1 },
    },
  };

  const current = variants[variant];

  return (
    <MotionTag
      className={className}
      variants={current}
      initial="hidden"
      whileInView="show"
      viewport={defaults.viewport}
      transition={defaults.transition}
    >
      {children}
    </MotionTag>
  );
};

export default ScrollReveal;
