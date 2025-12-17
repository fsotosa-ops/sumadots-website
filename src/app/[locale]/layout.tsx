import { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider, useTranslations } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Navbar from '@/app/components/Navbar';
import WhatsAppWidget from '@/app/components/WhatsAppWidget'; // Widget con diseño mockup y Roboto
import { ThemeProvider } from "@/components/ui/theme-provider";
import "@/app/globals.css";

// 1. Configuración de fuentes premium Geist
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 2. SEO Regionalizado según el idioma seleccionado
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
    'es-CL': "Optimizamos tus procesos con inteligencia artificial de vanguardia para escalar tu negocio.",
    'en-US': "We optimize your business processes with cutting-edge AI technology to scale your business.",
    'pt-BR': "Otimizamos seus processos de negócios com tecnologia de IA de ponta para expandir seus negócios."
  };

  return {
    title: {
      default: titles[locale] || titles['en-US'],
      template: `%s | Sumadots`
    },
    description: descriptions[locale] || descriptions['en-US'],
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

// 3. Layout Maestro
export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Validación de seguridad para idiomas soportados
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Habilitar renderizado estático
  setRequestLocale(locale);

  // Cargar diccionarios JSON correspondientes
  const messages = await getMessages();

  return (
    // suppressHydrationWarning es necesario para el cambio de tema de next-themes
    <html lang={locale} suppressHydrationWarning className="scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-blue-500/30`}>
        {/* Provider para cambio de modo Claro/Oscuro */}
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {/* IMPORTANTE: NextIntlClientProvider debe envolver a cualquier componente 
              que use 'useTranslations' para evitar errores de contexto.
          */}
          <NextIntlClientProvider messages={messages}>
            <div className="flex flex-col min-h-screen bg-background text-foreground transition-colors duration-300">
              <Navbar />
              
              <main className="flex-grow">
                {children}
              </main>

              {/* Widget de contacto persistente (WhatsApp de Pipe). 
                  Se coloca aquí para que no desaparezca al navegar entre páginas.
              */}
              <WhatsAppWidget />

              {/* Footer con traducciones dinámicas */}
              <FooterSection />
            </div>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

// Sub-componente para manejar las traducciones del Footer dentro de la jerarquía del layout
function FooterSection() {
  const t = useTranslations('Footer');
  return (
    <footer className="py-12 border-t border-border bg-muted/20 text-center text-[10px] text-muted-foreground tracking-[0.2em] uppercase transition-colors duration-500">
      <p>© {new Date().getFullYear()} {t('rights')}</p>
    </footer>
  );
}