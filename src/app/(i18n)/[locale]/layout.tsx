import { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider, useTranslations } from 'next-intl';
import { getMessages, setRequestLocale, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Navbar from '@/app/components/Navbar';
import WhatsAppWidget from '@/app/components/WhatsAppWidget';
import { ThemeProvider } from "@/components/ui/theme-provider";
import Image from 'next/image';
import "@/app/globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

/**
 * METADATOS DINÁMICOS (SEO y FAVICONS)
 * Ahora el título y la descripción también cambian según el idioma.
 */
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  
  // Cargamos las traducciones del namespace 'Manifest' para el título y descripción del sitio
  const t = await getTranslations({ locale, namespace: 'Manifest' });
  
  return {
    title: t('name'), // Ejemplo: "Sumadots | Expert Partner" en inglés
    description: t('description'),
    metadataBase: new URL('https://sumadots.com'),
    icons: {
      icon: [
        { url: '/favicons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        { url: '/favicons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      ],
      apple: [
        { url: '/favicons/apple-touch-icon-180x180.png', sizes: '180x180', type: 'image/png' },
      ],
    },
    // Vincula el manifiesto dinámico que ya verificamos que funciona
    manifest: `/${locale}/manifest.webmanifest`, 
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
  
  if (!routing.locales.includes(locale as any)) notFound();

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning className="scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <NextIntlClientProvider messages={messages} locale={locale}>
            <div className="flex flex-col min-h-screen bg-background text-foreground transition-colors duration-300">
              <Navbar />
              <main className="flex-grow">
                {children}
              </main>
              <WhatsAppWidget />
              <FooterSection />
            </div>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

function FooterSection() {
  const t = useTranslations('Footer');
  return (
    <footer className="py-16 border-t border-border bg-muted/20 flex flex-col items-center gap-6">
      <Image 
        src="/suma-icon.svg" 
        alt="Sumadots" 
        width={40} 
        height={40} 
        className="opacity-50 dark:invert"
      />
      <p className="text-[10px] text-muted-foreground tracking-[0.2em] uppercase">
        © {new Date().getFullYear()} {t('rights')}
      </p>
    </footer>
  );
}