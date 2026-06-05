import { type ComponentType } from 'react'
import { PhoneOutgoing, Bot, Inbox, FileText, Star, BarChart3 } from 'lucide-react'
import Reveal from './ui/Reveal'
import { useCursorGlow } from '../lib/useCursorGlow'

type Cap = {
  icon: ComponentType<{ size?: number; strokeWidth?: number }>
  title: string
  body: string
}

const CAPS: Cap[] = [
  {
    icon: PhoneOutgoing,
    title: 'Missed-call recovery',
    body: 'Every unanswered call gets an instant text back, books the appointment, and logs the lead, before they call your competitor.',
  },
  {
    icon: Bot,
    title: 'AI receptionist',
    body: 'Answers calls and questions 24/7 in your voice, screens for fit, and routes the real opportunities straight to your team.',
  },
  {
    icon: Inbox,
    title: 'Inbox & lead triage',
    body: 'Sorts, tags, and drafts replies to every inquiry, so nothing sits unanswered and your team only touches what matters.',
  },
  {
    icon: FileText,
    title: 'Quote & proposal automation',
    body: 'Turns an intake form or a call transcript into a branded, ready-to-send quote in minutes, not the next business day.',
  },
  {
    icon: Star,
    title: 'Reviews & reputation',
    body: 'Asks happy customers for reviews at the right moment, flags unhappy ones before they post, and keeps your rating climbing.',
  },
  {
    icon: BarChart3,
    title: "Owner's dashboard",
    body: 'One screen showing what the systems handled overnight: calls, leads, revenue recovered. The first thing you check each morning.',
  },
]

function CapCard({ cap }: { cap: Cap }) {
  const ref = useCursorGlow<HTMLDivElement>()
  const Icon = cap.icon
  return (
    <div className="cap" ref={ref}>
      <div className="glow" />
      <div className="ic">
        <Icon size={18} strokeWidth={1.8} />
      </div>
      <h3>{cap.title}</h3>
      <p>{cap.body}</p>
    </div>
  )
}

export default function Examples() {
  return (
    <section className="band" id="what">
      <div className="wrap">
        <div className="head-row">
          <div className="sec-head">
            <Reveal as="p" className="eyebrow">
              What we build
            </Reveal>
            <Reveal as="h2" className="h-xl" d={1}>
              We build one thing: the custom system your business needs.
            </Reveal>
          </div>
          <Reveal as="p" className="lead" d={2}>
            No off-the-shelf product, no template. Every system is designed from scratch around how your
            business actually runs, then wired into your real tools. These are a few of the builds we're
            asked for most:
          </Reveal>
        </div>

        <Reveal className="cap-grid" d={1} style={{ marginTop: 56 }}>
          {CAPS.map((cap) => (
            <CapCard key={cap.title} cap={cap} />
          ))}
        </Reveal>

        <Reveal
          as="p"
          className="small"
          style={{ textAlign: 'center', margin: '36px auto 0', maxWidth: '60ch', color: 'var(--text-tertiary)' }}
        >
          Whatever is slowing your business down, that's what a custom build is for. If your bottleneck
          isn't on this list, it's still exactly what we do.
        </Reveal>
      </div>
    </section>
  )
}
