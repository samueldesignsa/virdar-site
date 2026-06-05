import Reveal from './ui/Reveal'

export default function Bridge() {
  return (
    <section className="band" style={{ textAlign: 'center', borderTop: 0 }}>
      <div className="wrap">
        <Reveal as="p" className="eyebrow">
          The shift is already here
        </Reveal>
        <Reveal
          as="p"
          className="serif"
          d={1}
          style={{
            fontSize: 'clamp(1.8rem,4.2vw,3.3rem)',
            lineHeight: 1.16,
            letterSpacing: '-0.02em',
            maxWidth: '20ch',
            margin: '22px auto 0',
            color: 'var(--text)',
          }}
        >
          You don't have to feel it yet to be{' '}
          <em style={{ fontStyle: 'normal', color: 'var(--accent)' }}>falling behind</em>.
        </Reveal>
        <Reveal as="p" className="lead" d={2} style={{ margin: '20px auto 0', maxWidth: '40ch' }}>
          The numbers already show the gap.
        </Reveal>
      </div>
    </section>
  )
}
