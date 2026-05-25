import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { MiniAudit } from './components/MiniAudit';
import { Features } from './components/Features';
import { BeforeAfter } from './components/BeforeAfter';
import { Benchmark } from './components/Benchmark';
import { Services } from './components/Services';
import { LeadMagnet } from './components/LeadMagnet';
import { Footer } from './components/Footer';

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <MiniAudit />
        <Features />
        <BeforeAfter />
        <Benchmark />
        <Services />
        <LeadMagnet />
      </main>
      <Footer />
    </>
  );
}

export default App;
