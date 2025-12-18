import Hero from '../components/Hero';
import Clients from '../components/Clients';
import Partners from '../components/Partners';
import ServicesBento from '../components/ServicesBento';
import SectionWrapper from '../components/SectionWrapper';
import CTA from '@/components/ui/cta'; // Alias correcto

export default function HomePage() {
  return (
    <>
      <Hero />
      <Clients />
      <SectionWrapper>
        <div id="services">
          <ServicesBento />
        </div>
      </SectionWrapper>
      <Partners />
      <CTA /> 
    </>
  );
}