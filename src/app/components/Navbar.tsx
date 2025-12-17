import { Link } from '@/i18n/routing';
import LocaleSwitcher from './LocaleSwitcher';

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-4 border-b">
      <Link href="/" className="text-xl font-bold">
        SUMADOTS
      </Link>
      
      <div className="flex items-center gap-6">
        <Link href="/blog" className="hover:text-blue-600">Blog</Link>
        <LocaleSwitcher />
      </div>
    </nav>
  );
}