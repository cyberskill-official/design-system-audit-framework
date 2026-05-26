import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Integrations } from './components/Integrations';
import { MiniAudit } from './components/MiniAudit';
import { HowItWorks } from './components/HowItWorks';
import { Features } from './components/Features';
import { SocialProof } from './components/SocialProof';
import { BeforeAfter } from './components/BeforeAfter';
import { Benchmark } from './components/Benchmark';
import { Services } from './components/Services';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Integrations />
        <MiniAudit />
        <HowItWorks />
        <Features />
        <SocialProof />
        <BeforeAfter />
        <Benchmark />
        <Services />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}

export default App;
