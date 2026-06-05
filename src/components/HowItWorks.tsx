import Reveal from './ui/Reveal'

const STEPS = [
  {
    num: '01',
    title: 'Map',
    body: 'We sit with you and trace how your business actually runs: where time leaks, where leads slip, where the busywork hides. No tech talk.',
  },
  {
    num: '02',
    title: 'Build',
    body: 'We build the system on your real workflow and tools, then show it working on your actual data. Not a demo, not a slideshow.',
  },
  {
    num: '03',
    title: 'Prove',
    body: "You watch it run for yourself before a dollar changes hands. If it doesn't do what we promised, you don't pay. Simple as that.",
  },
]

export default function HowItWorks() {
  return (
    <section className="band" id="how">
      <div className="wrap">
        <div className="sec-head">
          <Reveal as="p" className="eyebrow">
            How it works
          </Reveal>
          <Reveal as="h2" className="h-xl" d={1}>
            We start with your operations, not the technology.
          </Reveal>
        </div>
        <Reveal className="steps" d={1}>
          {STEPS.map((s) => (
            <div className="step" key={s.num}>
              <div className="num">{s.num}</div>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
