import { Mail, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-bg border-t border-border py-12 md:py-16">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <a href="#" className="font-heading text-2xl text-text no-underline">
              Virdar
            </a>
            <p className="mt-3 max-w-[320px] text-sm text-text-secondary">
              AI that runs the back office — so you can run the business.
            </p>
          </div>

          <div className="space-y-3">
            <a
              href="mailto:info@virdar.co"
              className="flex items-center gap-2 text-sm text-text-secondary no-underline hover:text-text transition-colors"
            >
              <Mail size={16} aria-hidden="true" />
              info@virdar.co
            </a>
            <p className="flex items-center gap-2 text-sm text-text-secondary">
              <MapPin size={16} aria-hidden="true" />
              Dallas, TX
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <a
              href="https://calendly.com/virdar-info/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-text-secondary no-underline hover:text-text transition-colors"
            >
              Book a Strategy Call
            </a>
            <a href="#how-it-works" className="text-sm text-text-secondary no-underline hover:text-text transition-colors">
              How It Works
            </a>
            <a href="#pricing" className="text-sm text-text-secondary no-underline hover:text-text transition-colors">
              Pricing
            </a>
            <a href="#faq" className="text-sm text-text-secondary no-underline hover:text-text transition-colors">
              FAQ
            </a>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-center text-xs text-text-tertiary">
          &copy; {new Date().getFullYear()} Virdar. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
