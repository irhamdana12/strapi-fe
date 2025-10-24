import Link from 'next/link';
import Logo from './logo';
import { getGlobal } from '@/lib/strapi';
import NavClient from './nav';

export default async function Header() {
  console.log('Header component rendering');
  const { navigation } = await getGlobal();

  return (
    <header className="fixed top-2 z-30 w-full md:top-6">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative flex h-14 items-center justify-between gap-3 rounded-2xl bg-white/90 px-3 
        shadow-lg shadow-black/[0.03] backdrop-blur-sm before:pointer-events-none before:absolute before:inset-0 
        before:rounded-[inherit] before:border before:border-transparent 
        before:[background:linear-gradient(var(--color-gray-100),var(--color-gray-200))_border-box] 
        before:[mask-composite:exclude_!important] 
        before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)]">
          
          {/* Logo */}
          <div className="flex items-center">
            <Logo />
          </div>

          {/* Center Navigation - Dari Strapi */}
          <NavClient navItems={navigation} />

          {/* Right Actions - Hardcode */}
          <div className="flex items-center gap-2">
            <Link
              href="/signin"
              className="hidden md:inline-flex items-center rounded-lg px-4 py-2 text-sm font-normal text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="inline-flex items-center rounded-lg bg-gray-900 px-4 py-2 text-sm font-normal text-white shadow-sm transition-all duration-200 hover:bg-gray-800 hover:shadow-md"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}