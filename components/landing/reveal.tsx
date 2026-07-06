'use client'

import { motion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'

export const easeCalm = [0.22, 1, 0.36, 1] as const

// Use a function variant so `custom` (delay) is properly threaded through
// without a conflicting top-level `transition` prop — which causes framer-motion
// to emit unhandled promise rejections when two transition configs fight.
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease: easeCalm },
  }),
}

export function Reveal({
  children,
  delay = 0,
  className,
  once = true,
}: {
  children: ReactNode
  delay?: number
  className?: string
  once?: boolean
}) {
  return (
    <motion.div
      className={className}
      variants={fadeUp}
      custom={delay}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-80px' }}
    >
      {children}
    </motion.div>
  )
}

export function Stagger({
  children,
  className,
  gap = 0.12,
}: {
  children: ReactNode
  className?: string
  gap?: number
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: gap, delayChildren: 0 },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

// StaggerItem uses a plain (non-function) variant since delay comes from stagger
const staggerItemVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeCalm },
  },
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <motion.div className={className} variants={staggerItemVariant}>
      {children}
    </motion.div>
  )
}
