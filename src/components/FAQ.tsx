import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'

const faqs = [
  {
    q: 'Do I need to be technical to use any of this?',
    a: 'No. We build it, set it up, and make sure your team knows how to use it. If your staff can use email, they can use what we build.',
  },
  {
    q: 'How is this different from ChatGPT or buying some AI tool?',
    a: 'ChatGPT is a general-purpose chatbot. Off-the-shelf tools are built for everyone, which means they\u2019re optimized for no one. We build systems designed for your specific operations \u2014 integrated with your tools, trained on your business context, and handling your actual workflows.',
  },
  {
    q: 'What if it doesn\u2019t work for my business?',
    a: 'That\u2019s what the strategy call is for. We\u2019ll tell you honestly whether AI makes sense for your situation. If we don\u2019t see a clear ROI opportunity, we\u2019ll tell you \u2014 and we won\u2019t charge you for that honesty. And if we build something that doesn\u2019t deliver? You don\u2019t pay.',
  },
  {
    q: 'How long does a typical project take?',
    a: 'Most single-system builds are live within 2\u20134 weeks. More complex multi-system projects take 4\u20138 weeks. We\u2019ll give you an exact timeline during the strategy call.',
  },
  {
    q: 'Do I own the system you build?',
    a: 'Yes. Once you pay, it\u2019s yours. We\u2019ll document everything and train your team. If you want to part ways after the build, you can \u2014 no lock-in.',
  },
  {
    q: 'What does ongoing optimization actually include?',
    a: 'We monitor how your AI systems are performing, tune them based on real usage data, fix anything that breaks, expand capabilities as your needs grow, and send you a monthly report showing exactly what the systems are doing for your business \u2014 hours saved, leads captured, tasks automated.',
  },
  {
    q: 'I\u2019ve heard most AI projects fail. Why would this be different?',
    a: 'Most AI projects fail because they start with the technology and try to find a problem. We start with your operations and only build what solves a real, measurable problem. No science experiments. No \u201Clet\u2019s see what AI can do.\u201D We identify the specific bottleneck, build the specific system, and measure the specific result.',
  },
  {
    q: 'What kinds of businesses do you work with?',
    a: 'Operations-heavy businesses \u2014 restaurants, law firms, medical practices, property management, field services, logistics, contractors, salons. If your team is doing repetitive work that eats hours every week, we can probably automate it. If AI isn\u2019t the right fit, we\u2019ll tell you on the strategy call.',
  },
]

function FAQItem({ faq, index }: { faq: typeof faqs[0]; index: number }) {
  const [open, setOpen] = useState(false)
  const id = `faq-${index}`

  return (
    <div className="border-b border-border">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={`${id}-panel`}
        id={`${id}-trigger`}
        className="flex w-full items-center justify-between gap-4 py-6 text-left bg-transparent border-none cursor-pointer group"
      >
        <span className="text-base font-medium text-text group-hover:text-accent transition-colors md:text-lg">
          {faq.q}
        </span>
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border text-text-secondary transition-colors group-hover:border-accent group-hover:text-accent">
          {open ? <Minus size={16} aria-hidden="true" /> : <Plus size={16} aria-hidden="true" />}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`${id}-panel`}
            role="region"
            aria-labelledby={`${id}-trigger`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' as const }}
            className="overflow-hidden"
          >
            <p className="body-md pb-6 pr-12 text-text-secondary">{faq.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ() {
  return (
    <section id="faq" className="bg-bg py-20 md:py-28 lg:py-32 border-t border-border">
      <div className="mx-auto max-w-[800px] px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' as const }}
          className="heading-lg text-text"
        >
          Questions You Probably Have
        </motion.h2>

        <div className="mt-10">
          {faqs.map((faq, i) => (
            <FAQItem key={i} faq={faq} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
