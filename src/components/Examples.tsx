import { motion } from 'framer-motion'
import {
  PhoneMissed,
  Bot,
  MessageSquare,
  Inbox,
  MessageCircle,
  CalendarCheck,
  Send,
  TrendingUp,
  Users,
  ClipboardList,
  Wrench,
  UserPlus,
  ListChecks,
} from 'lucide-react'
import { WorkflowDiagram, type WorkflowNode } from './ui/WorkflowDiagram'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' as const } },
}

type Example = {
  tag: 'Legal' | 'Healthcare' | 'Restaurant' | 'Property' | 'Finance'
  title: string
  problem: string
  result: string
  workflow: WorkflowNode[]
}

const examples: Example[] = [
  {
    tag: 'Legal',
    title: 'Missed-call recovery for law firms',
    problem: 'Every missed call after hours is a case walking to a faster competitor.',
    result: 'Qualified leads in the attorney\u2019s inbox, 24/7.',
    workflow: [
      { icon: PhoneMissed, label: 'Missed call' },
      { icon: Bot, label: 'AI responds', highlight: true },
      { icon: MessageSquare, label: 'SMS qualifies' },
      { icon: Inbox, label: 'Attorney notified' },
    ],
  },
  {
    tag: 'Healthcare',
    title: 'AI intake for med spas & clinics',
    problem: 'Front desk stuck in phone tag instead of care.',
    result: 'Booked, prepped patients. Zero phone tag.',
    workflow: [
      { icon: MessageCircle, label: 'Patient inquiry' },
      { icon: Bot, label: 'AI intake', highlight: true },
      { icon: CalendarCheck, label: 'Appointment booked' },
      { icon: Send, label: 'Prep instructions sent' },
    ],
  },
  {
    tag: 'Restaurant',
    title: 'Demand forecasting for restaurants',
    problem: 'Staffing guessed from gut. Always wrong one way or the other.',
    result: 'Right people, right shift, every night.',
    workflow: [
      { icon: TrendingUp, label: 'Sales + weather + events' },
      { icon: Bot, label: 'AI forecast', highlight: true },
      { icon: Users, label: 'Optimal staffing' },
    ],
  },
  {
    tag: 'Property',
    title: 'Maintenance triage for property managers',
    problem: 'Tenant requests get lost between text, email, and sticky notes.',
    result: 'Every request logged, ranked, and dispatched.',
    workflow: [
      { icon: MessageSquare, label: 'Tenant text' },
      { icon: Bot, label: 'AI triage', highlight: true },
      { icon: ClipboardList, label: 'Work order created' },
      { icon: Wrench, label: 'Vendor dispatched' },
    ],
  },
  {
    tag: 'Finance',
    title: 'Lead qualification for mortgage brokers',
    problem: 'Brokers burn hours on browsers who\u2019ll never close.',
    result: 'Only meet with borrowers who are ready.',
    workflow: [
      { icon: UserPlus, label: 'New inquiry' },
      { icon: Bot, label: 'AI qualifies', highlight: true },
      { icon: ListChecks, label: 'Doc checklist sent' },
      { icon: CalendarCheck, label: 'Qualified meeting' },
    ],
  },
]

const tagColors: Record<Example['tag'], string> = {
  Legal: 'bg-blue-900/30 text-blue-300 border-blue-800/40',
  Healthcare: 'bg-emerald-900/30 text-emerald-300 border-emerald-800/40',
  Restaurant: 'bg-orange-900/30 text-orange-300 border-orange-800/40',
  Property: 'bg-purple-900/30 text-purple-300 border-purple-800/40',
  Finance: 'bg-amber-900/30 text-amber-300 border-amber-800/40',
}

export default function Examples() {
  return (
    <section id="examples" className="bg-bg py-20 md:py-28 lg:py-32 border-t border-border">
      <div className="mx-auto max-w-[1200px] px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
          className="max-w-[720px]"
        >
          <h2 className="heading-lg text-text">What AI Automation Looks Like</h2>
          <p className="body-lg mt-4 text-text-secondary">
            Every build is different. These are the shapes — your tools, your workflows, your data.
          </p>
        </motion.div>

        <div className="mt-14 space-y-6">
          {examples.map((ex, i) => (
            <motion.article
              key={ex.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.06, ease: 'easeOut' as const } },
              }}
              className="rounded-2xl border border-border bg-surface p-8 md:p-10"
            >
              <div className="max-w-[720px]">
                <span className={`inline-block rounded-full border px-3 py-1 text-xs font-semibold ${tagColors[ex.tag]}`}>
                  {ex.tag}
                </span>
                <h3 className="heading-md mt-3 text-text">{ex.title}</h3>
                <p className="body-md mt-2 text-text-secondary">{ex.problem}</p>
              </div>

              <WorkflowDiagram nodes={ex.workflow} className="mt-10 md:mt-12" />

              <div className="mt-10 flex items-center justify-center gap-2 border-t border-border pt-6">
                <span className="text-accent" aria-hidden="true">&rarr;</span>
                <p className="text-sm font-medium text-text">{ex.result}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
