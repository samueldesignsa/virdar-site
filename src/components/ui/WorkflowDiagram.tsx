import { motion } from 'framer-motion'
import { Fragment } from 'react'
import type { LucideIcon } from 'lucide-react'

export type WorkflowNode = {
  icon: LucideIcon
  label: string
  highlight?: boolean
}

type WorkflowDiagramProps = {
  nodes: WorkflowNode[]
  className?: string
}

export function WorkflowDiagram({ nodes, className = '' }: WorkflowDiagramProps) {
  return (
    <div
      className={`flex flex-col items-stretch gap-0 md:flex-row md:items-start md:justify-between md:gap-2 ${className}`}
      role="img"
      aria-label={`Workflow: ${nodes.map((n) => n.label).join(' to ')}`}
    >
      {nodes.map((node, i) => {
        const Icon = node.icon
        const isLast = i === nodes.length - 1
        return (
          <Fragment key={`${node.label}-${i}`}>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: i * 0.12, ease: 'easeOut' }}
              className="flex flex-row items-center gap-3 md:flex-1 md:flex-col md:gap-3"
            >
              <div
                className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border transition-colors ${
                  node.highlight
                    ? 'border-accent/60 bg-accent/10 text-accent shadow-[0_0_24px_rgba(201,169,110,0.18)]'
                    : 'border-border bg-surface-raised text-text-secondary'
                }`}
              >
                <Icon size={22} strokeWidth={1.75} aria-hidden="true" />
              </div>
              <span className="text-xs font-medium leading-tight text-text-secondary md:text-center">
                {node.label}
              </span>
            </motion.div>

            {!isLast && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.3, delay: i * 0.12 + 0.2 }}
                aria-hidden="true"
                className="relative ml-7 flex h-5 w-px items-center justify-center md:ml-0 md:mt-7 md:h-px md:w-auto md:flex-1"
              >
                <span className="block h-full w-full border-l border-dashed border-border md:border-l-0 md:border-t" />
              </motion.div>
            )}
          </Fragment>
        )
      })}
    </div>
  )
}
