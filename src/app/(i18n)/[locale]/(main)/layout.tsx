import Navbar from '@/app/components/Navbar';
import WhatsAppWidget from '@/app/components/WhatsAppWidget';
import Footer from '@/app/components/Footer';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground transition-colors duration-300">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <WhatsAppWidget />
      <Footer />
    </div>
  );
}
