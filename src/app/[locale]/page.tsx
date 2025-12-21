import Hero from '../components/Hero';
import Clients from '../components/Clients';
import Partners from '../components/Partners';
import ServicesBento from '../components/ServicesBento';
import SectionWrapper from '../components/SectionWrapper';
import TableComparison from '../components/TableComparison';
import ReadyToGrow from '../components/ReadyToGrow'; 
import ContactForm from '../components/ContactForm';
import FAQ from '../components/FAQ';

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