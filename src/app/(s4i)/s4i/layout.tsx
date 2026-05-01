import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './s4i.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Sumadots for Impact | Ingeniería para el Impacto Social',
  description:
    'Ingeniería corporativa y estrategia operativa para ONGs que buscan escalar su impacto social sin deuda técnica. Partners técnicos en LatAm y EE.UU.',
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
  openGraph: {
    title: 'Sumadots for Impact | System Match',
    description:
      'Operamos como partners técnicos para organizaciones de impacto social. Escala tus operaciones sin deuda técnica.',
    type: 'website',
  },
};

export default function S4iRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`dark ${inter.variable} ${jetbrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
