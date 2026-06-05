import Reveal from './ui/Reveal'

const ITEMS = [
  {
    k: '01 / No upfront risk',
    h: 'We build first',
    p: 'We do the work to prove the fit before you commit. The risk is ours to carry, not yours.',
  },
  {
    k: '02 / Proof, not promises',
    h: 'You see it live',
    p: 'Real automation, running on your real workflow. You judge it with your own eyes, not a sales deck.',
  },
  {
    k: '03 / Honest scope',
    h: 'We say no',
    p: "If AI isn't the right answer for a problem, we'll tell you. We'd rather keep the relationship than force a sale.",
  },
]

export default function WhyVirdar() {
  return (
    <section className="band offer">
      <div className="wrap">
        <Reveal as="p" className="eyebrow">
          The deal
        </Reveal>
        <Reveal as="h2" className="big" d={1} style={{ marginTop: 18 }}>
          You don't pay until you've <em>seen it work</em> on your own business.
        </Reveal>
        <div className="three">
          {ITEMS.map((it, i) => (
            <Reveal className="it" d={i} key={it.h}>
              <div className="k">{it.k}</div>
              <h4>{it.h}</h4>
              <p>{it.p}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
