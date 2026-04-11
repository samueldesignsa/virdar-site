import { Button } from './Button'
import { ChevronRight } from 'lucide-react'

interface GetStartedButtonProps {
  children: React.ReactNode
  href: string
  external?: boolean
}

export function GetStartedButton({ children, href, external }: GetStartedButtonProps) {
  return (
    <Button className="group relative overflow-hidden" size="lg" asChild>
      <a
        href={href}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        className="no-underline"
      >
        <span className="mr-8 transition-opacity duration-500 group-hover:opacity-0">
          {children}
        </span>
        <i className="absolute right-1 top-1 bottom-1 rounded-lg z-10 grid w-1/4 place-items-center transition-all duration-500 bg-bg/15 group-hover:w-[calc(100%-0.5rem)] group-active:scale-95 not-italic">
          <ChevronRight size={16} strokeWidth={2} aria-hidden="true" />
        </i>
      </a>
    </Button>
  )
}
