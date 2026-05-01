import Hero from '@/app/components/Hero';
import ServicesBento from '@/app/components/ServicesBento';
import ImpactProof from '@/app/components/ImpactProof';
import TrinidadBridge from '@/app/components/TrinidadBridge';
import Partners from '@/app/components/Partners';
import FAQ from '@/app/components/FAQ';
import FinalCTA from '@/app/components/FinalCTA';

export default function HomePage() {
  return (
    <>
      <div className="boutique-bg-grid" aria-hidden />
      <div className="boutique-bg-vignette" aria-hidden />
      <Hero />
      <ServicesBento />
      <ImpactProof />
      <TrinidadBridge />
      <Partners />
      <FAQ />
      <FinalCTA />
    </>
  );
}
