import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
}

const examples = [
  {
    tag: 'Legal',
    title: 'AI Automation for Law Firms',
    problem: 'Phones ring after hours. Every missed call is a potential case walking to a competitor.',
    solution: 'A custom AI system that catches missed calls, qualifies potential clients via text, and delivers scored leads to the attorney\u2019s inbox \u2014 24/7.',
  },
  {
    tag: 'Healthcare',
    title: 'AI Automation for Med Spas & Clinics',
    problem: 'Front desk staff spend hours on phone tag \u2014 booking consultations, answering questions, sending prep instructions.',
    solution: 'A custom AI intake system that handles inquiries around the clock, books appointments based on treatment and availability, and sends prep info automatically.',
  },
  {
    tag: 'Restaurant',
    title: 'AI Automation for Restaurants',
    problem: 'Managers guess staffing levels based on gut feeling. Some nights overstaffed, others understaffed.',
    solution: 'A custom demand forecasting system that analyzes sales history, weather, local events, and seasonality to predict daily covers and recommend staffing levels.',
  },
  {
    tag: 'Property',
    title: 'AI Automation for Property Management',
    problem: 'Tenants call for every maintenance issue. Staff manually log, categorize, and dispatch \u2014 and requests get lost.',
    solution: 'A custom AI that receives maintenance requests via text, asks clarifying questions, categorizes urgency, creates work orders, and dispatches the right vendor.',
  },
  {
    tag: 'Finance',
    title: 'AI Automation for Mortgage & Lending',
    problem: 'Brokers spend hours on unqualified leads \u2014 people just browsing, not ready to move.',
    solution: 'A custom AI lead qualification system that screens new inquiries, assesses readiness, and sends qualified borrowers a personalized document checklist \u2014 before the first call.',
  },
]

const tagColors: Record<string, string> = {
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
            Every business is different. Here are examples of systems we can build — tailored to your operations, your tools, and your workflows.
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
              <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-10">
                <div className="md:w-1/3">
                  <span className={`inline-block rounded-full border px-3 py-1 text-xs font-semibold ${tagColors[ex.tag]}`}>
                    {ex.tag}
                  </span>
                  <h3 className="heading-md mt-3 text-text">{ex.title}</h3>
                  <p className="body-md mt-2 text-text-secondary"><span className="font-semibold text-text">The problem:&ensp;</span>{ex.problem}</p>
                </div>

                <div className="md:flex-1">
                  <p className="body-md text-text-secondary">
                    <span className="font-semibold text-text">The custom system:&ensp;</span>
                    {ex.solution}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
