import { Mail, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-bg-dark border-t border-border-dark py-12 md:py-16">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          {/* Brand */}
          <div>
            <a href="#" className="font-heading text-2xl text-text-light no-underline">
              Virdar
            </a>
            <p className="mt-3 max-w-[320px] text-sm text-text-light-secondary">
              AI that runs the back office — so you can run the business.
            </p>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <a
              href="mailto:info@virdar.co"
              className="flex items-center gap-2 text-sm text-text-light-secondary no-underline hover:text-text-light transition-colors"
            >
              <Mail size={16} aria-hidden="true" />
              info@virdar.co
            </a>
            <p className="flex items-center gap-2 text-sm text-text-light-secondary">
              <MapPin size={16} aria-hidden="true" />
              Dallas, TX
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-2">
            <a
              href="https://calendly.com/virdar-info/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-text-light-secondary no-underline hover:text-text-light transition-colors"
            >
              Book a Strategy Call
            </a>
            <a
              href="#how-it-works"
              className="text-sm text-text-light-secondary no-underline hover:text-text-light transition-colors"
            >
              How It Works
            </a>
            <a
              href="#pricing"
              className="text-sm text-text-light-secondary no-underline hover:text-text-light transition-colors"
            >
              Pricing
            </a>
            <a
              href="#faq"
              className="text-sm text-text-light-secondary no-underline hover:text-text-light transition-colors"
            >
              FAQ
            </a>
          </div>
        </div>

        <div className="mt-10 border-t border-border-dark pt-6 text-center text-xs text-text-light-secondary/50">
          &copy; {new Date().getFullYear()} Virdar. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
