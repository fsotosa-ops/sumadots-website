import Hero from '../components/Hero';
import ServicesBento from '../components/ServicesBento';
import SectionWrapper from '../components/SectionWrapper';

export default function HomePage() {
  return (
    <>
      <Hero />
      <SectionWrapper>
        <div id="services">
          <ServicesBento />
        </div>
      </SectionWrapper>
    </>
  );
}