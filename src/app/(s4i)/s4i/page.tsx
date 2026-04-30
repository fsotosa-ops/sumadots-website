export const dynamic = 'force-static';

import Nav from './components/Nav';
import Hero from './components/Hero';
import Flywheel from './components/Flywheel';
import ParaQuien from './components/ParaQuien';
import DiagnosticoRapido from './components/DiagnosticoRapido';
import Clients from './components/Clients';
import Founders from './components/Founders';
import Booking from './components/Booking';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';

export default function S4iPage() {
  return (
    <div id="top">
      <div className="bg-grid"></div>
      <div className="bg-vignette"></div>

      <Nav />

      <main className="max-w-6xl mx-auto px-6 md:px-10">
        <Hero />
        <Flywheel />
        <ParaQuien />
        <DiagnosticoRapido />
        <Clients />
        <Founders />

        <Booking />
        <FAQ />
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
