import type { ComponentProps, ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Mail, MapPin, ExternalLink } from 'lucide-react'

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

export function FooterSection() {
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
    </footer>
  )
}
