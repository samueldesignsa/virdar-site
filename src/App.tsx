import SmoothScroll from './components/SmoothScroll'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import BlockScene from './components/BlockScene'
import Bridge from './components/Bridge'
import GapChart from './components/GapChart'
import Comparison from './components/Comparison'
import Examples from './components/Examples'
import HowItWorks from './components/HowItWorks'
import WhyVirdar from './components/WhyVirdar'
import Pricing from './components/Pricing'
import Industries from './components/Industries'
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
        <BlockScene />
        <Bridge />
        <GapChart />
        <Comparison />
        <Examples />
        <HowItWorks />
        <WhyVirdar />
        <Pricing />
        <Industries />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}
