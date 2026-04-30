import Hero from '@/app/components/Hero';
import Clients from '@/app/components/Clients';
import Partners from '@/app/components/Partners';
import ServicesBento from '@/app/components/ServicesBento';
import SectionWrapper from '@/app/components/SectionWrapper';
import TableComparison from '@/app/components/TableComparison';
import ReadyToGrow from '@/app/components/ReadyToGrow';
import ContactForm from '@/app/components/ContactForm';
import FAQ from '@/app/components/FAQ';

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
      <ReadyToGrow /> 
      <ContactForm /> 
      <FAQ />
    </>
  );
}