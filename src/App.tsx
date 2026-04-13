import Navbar from './components/Navbar'
import SmoothScroll from './components/SmoothScroll'
import Hero from './components/Hero'

import Problem from './components/Problem'
import WhyVirdar from './components/WhyVirdar'
import HowItWorks from './components/HowItWorks'
import Examples from './components/Examples'
import Stats from './components/Stats'
import Pricing from './components/Pricing'
import FAQ from './components/FAQ'
import FinalCTA from './components/FinalCTA'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <SmoothScroll />
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content">
        <Hero />
        <Problem />
        <WhyVirdar />
        <HowItWorks />
        <Examples />
        <Stats />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}
