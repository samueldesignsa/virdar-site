import { useState, type ComponentProps, type ReactNode, type FormEvent } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Mail, MapPin, ExternalLink, X } from 'lucide-react'

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

function CareersModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)
    const form = e.currentTarget
    await fetch('https://formspree.io/f/xeelnjwd', {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' },
    })
    setSubmitting(false)
    setSubmitted(true)
  }

  function handleClose() {
    setSubmitted(false)
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-bg/80 backdrop-blur-sm px-6"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.25, ease: 'easeOut' as const }}
            className="relative w-full max-w-md rounded-2xl border border-border bg-surface p-8"
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
              <div className="text-center py-8">
                <p className="heading-md text-text">Thanks for reaching out</p>
                <p className="body-md mt-2 text-text-secondary">We'll be in touch if there's a fit.</p>
              </div>
            ) : (
              <>
                <h3 className="heading-md text-text">Work with us</h3>
                <p className="body-md mt-2 text-text-secondary">
                  Tell us a bit about yourself and what you're interested in.
                </p>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <input type="hidden" name="_subject" value="Career Inquiry — Virdar.co" />

                  <div>
                    <label htmlFor="careers-name" className="block text-xs font-medium text-text-secondary mb-1.5">Name</label>
                    <input
                      id="careers-name"
                      name="name"
                      type="text"
                      required
                      className="w-full rounded-lg border border-border bg-bg px-4 py-2.5 text-sm text-text placeholder:text-text-tertiary focus:border-accent focus:outline-none transition-colors"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="careers-email" className="block text-xs font-medium text-text-secondary mb-1.5">Email</label>
                    <input
                      id="careers-email"
                      name="email"
                      type="email"
                      required
                      className="w-full rounded-lg border border-border bg-bg px-4 py-2.5 text-sm text-text placeholder:text-text-tertiary focus:border-accent focus:outline-none transition-colors"
                      placeholder="you@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="careers-skills" className="block text-xs font-medium text-text-secondary mb-1.5">Skills &amp; experience</label>
                    <textarea
                      id="careers-skills"
                      name="message"
                      rows={3}
                      required
                      className="w-full rounded-lg border border-border bg-bg px-4 py-2.5 text-sm text-text placeholder:text-text-tertiary focus:border-accent focus:outline-none transition-colors resize-none"
                      placeholder="What you're good at and what interests you about Virdar"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full rounded-lg bg-accent py-2.5 text-sm font-semibold text-bg transition-colors hover:bg-accent-hover disabled:opacity-50 border-none cursor-pointer"
                  >
                    {submitting ? 'Sending...' : 'Submit'}
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
