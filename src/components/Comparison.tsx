import Reveal from './ui/Reveal'

const ROWS: [string, string][] = [
  [
    '"We use ChatGPT now and then"',
    'Every missed call gets an instant text back that books the appointment, before they try your competitor',
  ],
  [
    '"There\'s a chatbot on our website"',
    'An AI receptionist answers the phone 24/7 in your voice, screens the caller, and routes the real ones to your team',
  ],
  [
    '"Someone drafts emails with AI sometimes"',
    'Every inbound email read, sorted, and answered with a ready draft, and the hot leads flagged before you open your inbox',
  ],
  [
    '"We tried an AI tool once"',
    'Every quote followed up automatically, up to three times, until they reply. Nothing slips through',
  ],
  [
    '"We\'re using AI," but can\'t say how',
    'Sales calls transcribe themselves and update your CRM. Nobody types a note again',
  ],
  [
    '"It\'s on our list to look into"',
    'One dashboard each morning: calls answered, leads saved, and revenue recovered overnight',
  ],
]

export default function Comparison() {
  return (
    <section className="band">
      <div className="wrap">
        <div className="sec-head">
          <Reveal as="p" className="eyebrow">
            Doing it right
          </Reveal>
          <Reveal as="h2" className="h-xl" d={1}>
            Most businesses aren't using AI. They're dabbling with it.
          </Reveal>
          <Reveal as="p" className="lead" d={2} style={{ marginTop: 18 }}>
            Asking ChatGPT a question now and then isn't using AI. It's barely scratching the surface. Even
            the businesses that think they're ahead usually aren't close to its potential. Here's the
            difference.
          </Reveal>
        </div>

        <Reveal className="cmp" d={1}>
          <div className="cmp-row cmp-header">
            <div className="cmp-head cmp-head-bad">Dabbling with AI</div>
            <div className="cmp-head cmp-head-good">AI built into your business</div>
          </div>
          {ROWS.map(([bad, good], i) => (
            <div className="cmp-row" key={i}>
              <div className="cmp-cell bad">
                <span className="mk x">×</span>
                {bad}
              </div>
              <div className="cmp-cell good">
                <span className="mk c">✓</span>
                {good}
              </div>
            </div>
          ))}
        </Reveal>

        <Reveal
          as="p"
          className="small"
          style={{ textAlign: 'center', margin: '26px auto 0', maxWidth: '54ch', color: 'var(--text-tertiary)' }}
        >
          If the left column sounds familiar, you're not behind for lack of trying. You just haven't had it
          built the right way yet.
        </Reveal>
      </div>
    </section>
  )
}
