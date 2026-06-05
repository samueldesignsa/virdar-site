import { type ElementType, type ReactNode } from 'react'
import { motion, useReducedMotion, type HTMLMotionProps } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1] as const

type Tag = 'div' | 'p' | 'span' | 'h2' | 'h3' | 'section' | 'ul' | 'li'

const MOTION = {
  div: motion.div,
  p: motion.p,
  span: motion.span,
  h2: motion.h2,
  h3: motion.h3,
  section: motion.section,
  ul: motion.ul,
  li: motion.li,
} as const

const PLAIN: Record<Tag, Tag> = {
  div: 'div',
  p: 'p',
  span: 'span',
  h2: 'h2',
  h3: 'h3',
  section: 'section',
  ul: 'ul',
  li: 'li',
}

type RevealProps = {
  children: ReactNode
  /** semantic element to render */
  as?: Tag
  /** stagger index — matches the prototype's data-d (delay = 0.08s * d) */
  d?: number
  className?: string
  style?: React.CSSProperties
} & Omit<HTMLMotionProps<'div'>, 'children' | 'style'>

/**
 * Reveal-on-scroll wrapper. The rest state is visible; we animate FROM hidden
 * (opacity 0, y 26px) when the element scrolls into view, once. Honors
 * prefers-reduced-motion by rendering the plain element immediately so a missed
 * observer or reduced-motion preference never leaves content blank.
 */
export default function Reveal({ children, as = 'div', d = 0, className, style, ...rest }: RevealProps) {
  const reduce = useReducedMotion()

  if (reduce) {
    const PlainTag = PLAIN[as]
    return (
      <PlainTag className={className} style={style}>
        {children}
      </PlainTag>
    )
  }

  const MotionTag = MOTION[as] as ElementType
  return (
    <MotionTag
      className={className}
      style={style}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -6% 0px' }}
      transition={{ duration: 0.64, ease: EASE, delay: d * 0.08 }}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}
