import { useState, useEffect, type ComponentProps, type ReactNode, type FormEvent } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Mail, MapPin, ExternalLink, X } from 'lucide-react'
import { CheckboxGroup, CheckboxItem } from './CheckboxGroup'

interface FooterLink {
  title: string
  href: string
  icon?: React.ComponentType<{ className?: string }>
  external?: boolean
}

interface FooterSection {
  label: string
  links: FooterLink[]
}

const footerLinks: FooterSection[] = [
  {
    label: 'Navigate',
    links: [
      { title: 'How It Works', href: '#how-it-works' },
      { title: 'Examples', href: '#examples' },
      { title: 'Pricing', href: '#pricing' },
      { title: 'FAQ', href: '#faq' },
    ],
  },
  {
    label: 'Services',
    links: [
      { title: 'AI Strategy Call', href: 'https://calendly.com/virdar-info/30min', external: true },
      { title: 'Custom AI Systems', href: '#examples' },
      { title: 'Ongoing Optimization', href: '#pricing' },
    ],
  },
  {
    label: 'Contact',
    links: [
      { title: 'info@virdar.co', href: 'mailto:info@virdar.co', icon: Mail },
      { title: 'Dallas, TX', href: '#', icon: MapPin },
      { title: 'LinkedIn', href: '#', icon: ExternalLink },
    ],
  },
]

type ViewAnimationProps = {
  delay?: number
  className?: ComponentProps<typeof motion.div>['className']
  children: ReactNode
}

function AnimatedContainer({ className, delay = 0.1, children }: ViewAnimationProps) {
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      initial={{ filter: 'blur(4px)', translateY: -8, opacity: 0 }}
      whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function ConditionalField({ show, children }: { show: boolean; children: ReactNode }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeInOut' as const }}
          className="overflow-hidden"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function YesNo({ label, value, onChange, name }: { label: string; value: boolean | null; onChange: (v: boolean) => void; name: string }) {
  return (
    <div>
      <p className="block text-xs font-medium text-text-secondary mb-2">{label}</p>
      <input type="hidden" name={name} value={value === null ? '' : value ? 'Yes' : 'No'} />
      <div className="flex gap-2">
        {[true, false].map((v) => (
          <button
            key={String(v)}
            type="button"
            onClick={() => onChange(v)}
            className={`rounded-lg px-5 py-2 text-sm font-medium border transition-colors cursor-pointer ${
              value === v
                ? 'bg-accent/10 border-accent text-accent'
                : 'bg-transparent border-border text-text-secondary hover:border-border-hover'
            }`}
          >
            {v ? 'Yes' : 'No'}
          </button>
        ))}
      </div>
    </div>
  )
}

const INPUT = 'w-full rounded-lg border border-border bg-bg px-4 py-2.5 text-sm text-text placeholder:text-text-tertiary focus:border-accent focus:outline-none transition-colors'

function CareersModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  // Stop Lenis smooth scroll when modal is open so the form can scroll natively
  useEffect(() => {
    if (!open) return
    document.documentElement.classList.add('lenis-stopped')
    return () => { document.documentElement.classList.remove('lenis-stopped') }
  }, [open])

  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [roles, setRoles] = useState<Set<number>>(new Set())
  const [hasUniversity, setHasUniversity] = useState<boolean | null>(null)
  const [hasPortfolio, setHasPortfolio] = useState<boolean | null>(null)
  const [hasPriorAI, setHasPriorAI] = useState<boolean | null>(null)

  const roleLabels = [
    'AI / ML Engineering',
    'Full-Stack Development',
    'Backend / Infrastructure',
    'Operations & Strategy',
    'Sales & Business Development',
    'Design & Creative',
  ]

  const toggleRole = (i: number) => {
    setRoles((prev) => {
      const next = new Set(prev)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      return next
    })
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)
    const form = e.currentTarget
    const formData = new FormData(form)
    formData.set('roles', [...roles].map(i => roleLabels[i]).join(', '))
    await fetch('https://formspree.io/f/xeelnjwd', {
      method: 'POST',
      body: formData,
      headers: { Accept: 'application/json' },
    })
    setSubmitting(false)
    setSubmitted(true)
  }

  function handleClose() {
    setSubmitted(false)
    setRoles(new Set())
    setHasUniversity(null)
    setHasPortfolio(null)
    setHasPriorAI(null)
    onClose()
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-start justify-center bg-bg/80 backdrop-blur-sm px-6 py-8 overflow-y-auto overscroll-contain"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.25, ease: 'easeOut' as const }}
            className="relative w-full max-w-lg rounded-2xl border border-border bg-surface p-8 my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-transparent border-none text-text-secondary hover:text-text cursor-pointer transition-colors"
              aria-label="Close"
            >
              <X size={18} />
            </button>

            {submitted ? (
              <div className="text-center py-12">
                <p className="heading-md text-text">Application received</p>
                <p className="body-md mt-3 text-text-secondary">Thank you for your interest in Virdar. We'll review your submission and reach out if there's a fit.</p>
              </div>
            ) : (
              <>
                <h3 className="heading-md text-text">Join Virdar</h3>
                <p className="body-md mt-2 text-text-secondary">
                  We're building AI systems for operations-heavy businesses. Tell us about yourself.
                </p>

                <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                  <input type="hidden" name="_subject" value="Career Inquiry — Virdar.co" />

                  {/* Basic info */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="c-name" className="block text-xs font-medium text-text-secondary mb-1.5">Full name *</label>
                      <input id="c-name" name="name" type="text" required className={INPUT} placeholder="Jane Smith" />
                    </div>
                    <div>
                      <label htmlFor="c-email" className="block text-xs font-medium text-text-secondary mb-1.5">Email *</label>
                      <input id="c-email" name="email" type="email" required className={INPUT} placeholder="jane@email.com" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="c-location" className="block text-xs font-medium text-text-secondary mb-1.5">Location</label>
                    <input id="c-location" name="location" type="text" className={INPUT} placeholder="City, State (or Remote)" />
                  </div>

                  {/* Roles */}
                  <div>
                    <p className="block text-xs font-medium text-text-secondary mb-2">Areas of interest *</p>
                    <CheckboxGroup checkedIndices={roles}>
                      {roleLabels.map((label, i) => (
                        <CheckboxItem key={label} label={label} index={i} checked={roles.has(i)} onToggle={() => toggleRole(i)} />
                      ))}
                    </CheckboxGroup>
                  </div>

                  {/* Experience level */}
                  <div>
                    <label htmlFor="c-experience" className="block text-xs font-medium text-text-secondary mb-1.5">Years of experience *</label>
                    <select id="c-experience" name="experience" required className={`${INPUT} appearance-none cursor-pointer`} defaultValue="">
                      <option value="" disabled>Select one</option>
                      <option value="Student / Entry Level">Student / Entry Level</option>
                      <option value="1-3 Years">1–3 Years</option>
                      <option value="3-5 Years">3–5 Years</option>
                      <option value="5-10 Years">5–10 Years</option>
                      <option value="10+ Years">10+ Years</option>
                    </select>
                  </div>

                  {/* Conditional: University */}
                  <YesNo
                    label="Have you attended or are you attending a university?"
                    value={hasUniversity}
                    onChange={setHasUniversity}
                    name="has_university"
                  />
                  <ConditionalField show={hasUniversity === true}>
                    <div className="space-y-3 pt-1">
                      <div>
                        <label htmlFor="c-university" className="block text-xs font-medium text-text-secondary mb-1.5">University</label>
                        <input id="c-university" name="university" type="text" className={INPUT} placeholder="University name" />
                      </div>
                      <div>
                        <label htmlFor="c-field" className="block text-xs font-medium text-text-secondary mb-1.5">Field of study</label>
                        <input id="c-field" name="field_of_study" type="text" className={INPUT} placeholder="e.g. Computer Science, Business" />
                      </div>
                    </div>
                  </ConditionalField>

                  {/* Conditional: Prior AI experience */}
                  <YesNo
                    label="Do you have experience working with AI or automation tools?"
                    value={hasPriorAI}
                    onChange={setHasPriorAI}
                    name="has_ai_experience"
                  />
                  <ConditionalField show={hasPriorAI === true}>
                    <div className="pt-1">
                      <label htmlFor="c-ai-detail" className="block text-xs font-medium text-text-secondary mb-1.5">Brief description</label>
                      <textarea id="c-ai-detail" name="ai_experience_detail" rows={2} className={`${INPUT} resize-none`} placeholder="Tools, frameworks, or projects you've worked with" />
                    </div>
                  </ConditionalField>

                  {/* Conditional: Portfolio */}
                  <YesNo
                    label="Do you have a portfolio, GitHub, or previous work to share?"
                    value={hasPortfolio}
                    onChange={setHasPortfolio}
                    name="has_portfolio"
                  />
                  <ConditionalField show={hasPortfolio === true}>
                    <div className="pt-1">
                      <label htmlFor="c-portfolio" className="block text-xs font-medium text-text-secondary mb-1.5">Link</label>
                      <input id="c-portfolio" name="portfolio_url" type="url" className={INPUT} placeholder="https://" />
                    </div>
                  </ConditionalField>

                  {/* Availability */}
                  <div>
                    <label htmlFor="c-availability" className="block text-xs font-medium text-text-secondary mb-1.5">Availability</label>
                    <select id="c-availability" name="availability" className={`${INPUT} appearance-none cursor-pointer`} defaultValue="">
                      <option value="" disabled>Select one</option>
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time / Contract">Part-time / Contract</option>
                      <option value="Freelance / Project-based">Freelance / Project-based</option>
                      <option value="Open to discuss">Open to discuss</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="c-message" className="block text-xs font-medium text-text-secondary mb-1.5">Anything else?</label>
                    <textarea id="c-message" name="message" rows={2} className={`${INPUT} resize-none`} placeholder="Why Virdar interests you, or anything we should know" />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting || roles.size === 0}
                    className="w-full rounded-lg bg-accent py-3 text-sm font-semibold text-bg transition-colors hover:bg-accent-hover disabled:opacity-40 border-none cursor-pointer"
                  >
                    {submitting ? 'Submitting...' : 'Submit Application'}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function FooterSection() {
  const [careersOpen, setCareersOpen] = useState(false)
  return (
    <footer className="relative mx-auto w-full max-w-6xl rounded-t-3xl md:rounded-t-[3rem] border-t border-border bg-[radial-gradient(35%_128px_at_50%_0%,rgba(201,169,110,0.06),transparent)] px-6 py-12 lg:py-16">
      <div className="absolute top-0 right-1/2 left-1/2 h-px w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20 blur" />

      <div className="grid w-full gap-8 xl:grid-cols-3 xl:gap-8">
        {/* Brand */}
        <AnimatedContainer className="space-y-4">
          <a href="#" className="font-heading text-3xl text-text no-underline">
            Virdar
          </a>
          <p className="text-sm text-text-secondary leading-relaxed max-w-[280px]">
            AI that runs the back office — so you can run the business.
          </p>
          <p className="text-xs text-text-tertiary">
            &copy; {new Date().getFullYear()} Virdar. All rights reserved.
          </p>
        </AnimatedContainer>

        {/* Link columns */}
        <div className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-3 xl:col-span-2 xl:mt-0">
          {footerLinks.map((section, index) => (
            <AnimatedContainer key={section.label} delay={0.1 + index * 0.1}>
              <div className="mb-10 md:mb-0">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
                  {section.label}
                </h3>
                <ul className="mt-4 space-y-2.5 text-sm list-none p-0">
                  {section.links.map((link) => (
                    <li key={link.title}>
                      <a
                        href={link.href}
                        {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                        className="inline-flex items-center text-text-secondary no-underline transition-all duration-300 hover:text-text"
                      >
                        {link.icon && <link.icon className="mr-2 h-4 w-4" />}
                        {link.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedContainer>
          ))}
        </div>
      </div>

      {/* Careers line */}
      <AnimatedContainer delay={0.5} className="mt-12 border-t border-border pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <p className="text-xs text-text-tertiary">
          Interested in working with us?&ensp;
          <button
            onClick={() => setCareersOpen(true)}
            className="bg-transparent border-none p-0 text-xs text-text-secondary hover:text-accent transition-colors cursor-pointer"
          >
            We're always looking for great people&ensp;&rarr;
          </button>
        </p>
      </AnimatedContainer>

      <CareersModal open={careersOpen} onClose={() => setCareersOpen(false)} />
    </footer>
  )
}
