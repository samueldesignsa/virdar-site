import Reveal from './ui/Reveal'

export default function Pricing() {
  return (
    <section className="band" id="pricing">
      <div className="wrap">
        <div className="sec-head">
          <Reveal as="p" className="eyebrow">
            Pricing
          </Reveal>
          <Reveal as="h2" className="h-xl" d={1}>
            Free to start. Custom from there.
          </Reveal>
          <Reveal as="p" className="lead" d={2} style={{ marginTop: 18 }}>
            There are no packages to pick from. Every system is built and priced around your specific
            business, and you don't pay until you've seen it work. It always starts with a free
            consultation.
          </Reveal>
        </div>

        <Reveal className="price-solo" d={1}>
          <div className="ps-row">
            <div className="ps-item">
              <div className="ps-n">$0</div>
              <div className="ps-l">The consultation is always free</div>
            </div>
            <div className="ps-item">
              <div className="ps-n">Custom</div>
              <div className="ps-l">
                Priced to your scope. Most builds land around $15K–$25K, but we work with businesses of
                every size.
              </div>
            </div>
            <div className="ps-item">
              <div className="ps-n">$0 upfront</div>
              <div className="ps-l">You don't pay until it's live and working</div>
            </div>
          </div>
          <a className="btn" href="#book">
            Book your free consultation
          </a>
          <p className="ps-note">
            Whatever your budget, it's worth a conversation. We'll find a starting point that fits your
            business, and we'll be straight about what's realistic. Every plan and every price starts with
            that free call.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
