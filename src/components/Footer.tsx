import VMark from './ui/VMark'

export default function Footer() {
  return (
    <footer className="site-foot">
      <div className="wrap">
        <div className="foot-top">
          <div style={{ maxWidth: 300 }}>
            <a
              className="brand"
              href="#top"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}
            >
              <VMark size={22} />
              <span
                className="name"
                style={{ fontFamily: "'DM Serif Display', serif", fontSize: 21, color: 'var(--text)' }}
              >
                Virdar
              </span>
            </a>
            <p className="small" style={{ marginTop: 16 }}>
              Custom AI systems for operations-heavy businesses. We build it. You see it working. Then you
              pay.
            </p>
          </div>
          <div className="foot-cols">
            <div className="foot-col">
              <h5>Company</h5>
              <a href="#what">What we build</a>
              <a href="#how">How it works</a>
              <a href="#pricing">Pricing</a>
            </div>
            <div className="foot-col">
              <h5>Connect</h5>
              <a href="#book">Book a call</a>
              <a href="mailto:info@virdar.co">Email</a>
              <a href="https://www.linkedin.com/company/virdar" target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
        <div className="foot-bottom">
          <span className="small">© 2026 Virdar · Dallas, TX</span>
          <span className="small">
            <a href="/privacy.html">Privacy</a> · <a href="/terms.html">Terms</a>
          </span>
        </div>
      </div>
    </footer>
  )
}
