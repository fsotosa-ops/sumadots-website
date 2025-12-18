import { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider, useTranslations } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Navbar from '@/app/components/Navbar';
import WhatsAppWidget from '@/app/components/WhatsAppWidget';
import { ThemeProvider } from "@/components/ui/theme-provider";
import "@/app/globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

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
          {/* CORRECCIÓN: Se añade el prop locale aquí */}
          <NextIntlClientProvider messages={messages} locale={locale}>
            <div className="flex flex-col min-h-screen bg-background text-foreground transition-colors duration-300">
              <Navbar />
              <main className="flex-grow">{children}</main>
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
    <footer className="py-12 border-t border-border bg-muted/20 text-center text-[10px] text-muted-foreground tracking-[0.2em] uppercase transition-colors duration-500">
      <p>© {new Date().getFullYear()} {t('rights')}</p>
    </footer>
  );
}