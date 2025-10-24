'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './logo';

type Item = { label: string; href: string; startsWith?: boolean };

const NAV: Item[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Solutions', href: '/solutions', startsWith: true },
  { label: 'Pricing', href: '/price' },
  { label: 'Contact', href: '/contact'},
];

export default function Header() {
  const pathname = usePathname();
  const isActive = (item: Item) =>
    item.startsWith ? pathname.startsWith(item.href) : pathname === item.href;

  return (
    <header className="fixed top-2 z-30 w-full md:top-6">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative flex h-14 items-center justify-between gap-3 rounded-2xl bg-white/90 px-3 shadow-lg shadow-black/[0.03] backdrop-blur-sm before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(var(--color-gray-100),var(--color-gray-200))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)]">
          
          {/* Logo */}
          <div className="flex items-center">
            <Logo />
          </div>

          {/* Center Navigation */}
          <nav
            aria-label="Primary"
            className="hidden md:flex items-center gap-1 rounded-xl bg-white-50/50 p-1"
          >
            {NAV.map((item) => {
              const active = isActive(item);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className="group relative inline-flex select-none items-center rounded-lg px-4 py-2 text-sm font-medium outline-none transition-all duration-200"
                >

                  {/* Text */}
                  <span
                    className={[
                      'relative z-10 transition-colors duration-200',
                      active 
                        ? 'text-indigo-600' 
                        : 'text-gray-600 group-hover:text-gray-900',
                    ].join(' ')}
                  >
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <Link
              href="/signin"
              className="hidden md:inline-flex items-center rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="inline-flex items-center rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:bg-gray-800 hover:shadow-md"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}