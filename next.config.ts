import createNextIntlPlugin from 'next-intl/plugin';
 
// Especificamos la ruta exacta para evitar confusiones en Next.js 16
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');
 
/** @type {import('next').NextConfig} */
const nextConfig = {
    // Tus otras configuraciones aquí
};
 
export default withNextIntl(nextConfig);