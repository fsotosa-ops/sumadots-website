import Hero from '../components/Hero';
import Clients from '../components/Clients';
import Partners from '../components/Partners';
import ServicesBento from '../components/ServicesBento';
import SectionWrapper from '../components/SectionWrapper';
import TableComparison from '../components/TableComparison';
import CTA from '@/components/ui/cta';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Clients />
      <SectionWrapper>
        <ServicesBento />
      </SectionWrapper>
      <TableComparison /> 
      <Partners />
      <CTA /> 
    </>
  );
}