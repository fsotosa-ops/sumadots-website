// src/app/[locale]/manifest.webmanifest/route.ts
import { NextResponse } from 'next/server';
import { getTranslations } from 'next-intl/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ locale: string }> }
) {
  const { locale } = await params;
  
  // Cargamos las traducciones del namespace 'Manifest' que ya tienes en tus JSON
  const t = await getTranslations({ locale, namespace: 'Manifest' });

  const manifest = {
    name: t('name'),
    short_name: t('shortName'),
    description: t('description'),
    start_url: `/${locale}`,
    display: 'standalone',
    background_color: '#050505',
    theme_color: '#050505',
    icons: [
      {
        src: '/favicons/android-icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable'
      },
      {
        src: '/favicons/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png'
      }
    ]
  };

  return NextResponse.json(manifest, {
    headers: {
      'Content-Type': 'application/manifest+json',
    },
  });
}