import Hero from '../components/Hero';
import Clients from '../components/Clients';
import Partners from '../components/Partners';
import ServicesBento from '../components/ServicesBento';
import SectionWrapper from '../components/SectionWrapper';
import TableComparison from '../components/TableComparison';
import ReadyToGrow from '../components/ReadyToGrow'; // Nueva sección (Texto + Carrusel)
import ContactForm from '../components/ContactForm'; // Nueva sección (Solo Formulario)

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
    </>
  );
}