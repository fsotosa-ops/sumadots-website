import { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Navbar from '@/app/components/Navbar';
import "@/app/globals.css";

// Configuración de fuentes premium
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Configuración de SEO Regional
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}): Promise<Metadata> {
  const { locale } = await params;
  
  const titles: Record<string, string> = {
    'es-CL': "Sumadots | IA y Automatización en Chile",
    'en-US': "Sumadots | AI & Automation Solutions",
    'pt-BR': "Sumadots | IA e Automação no Brasil"
  };

  const descriptions: Record<string, string> = {
    'es-CL': "Optimizamos tus procesos con inteligencia artificial de vanguardia.",
    'en-US': "We optimize your business processes with cutting-edge AI technology.",
    'pt-BR': "Otimizamos seus processos de negócios com tecnologia de IA de ponta."
  };

  return {
    title: {
      default: titles[locale] || titles['es-CL'],
      template: `%s | Sumadots`
    },
    description: descriptions[locale] || descriptions['es-CL'],
    metadataBase: new URL('https://www.sumadots.com'),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'es-CL': '/es-CL',
        'en-US': '/en-US',
        'pt-BR': '/pt-BR',
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Validación de seguridad para el idioma
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Habilitar el renderizado estático
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning className="dark scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#050505] text-white selection:bg-blue-500/30`}>
        <NextIntlClientProvider messages={messages}>
          <div className="flex flex-col min-h-screen">
            {/* Navbar con el nuevo selector de banderas */}
            <Navbar />
            
            {/* Contenedor principal para la Home y Blog */}
            <main className="flex-grow pt-20">
              {children}
            </main>

            {/* Footer Minimalista */}
            <footer className="py-12 border-t border-white/5 bg-black/20 text-center text-xs text-zinc-500 tracking-widest">
              <p>© {new Date().getFullYear()} SUMADOTS. {locale === 'pt-BR' ? 'Todos os direitos reservados.' : locale === 'en-US' ? 'All rights reserved.' : 'Todos los derechos reservados.'}</p>
            </footer>
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}