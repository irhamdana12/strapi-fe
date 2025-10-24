'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import type { NavigationItem } from '@/lib/strapi';

type NavClientProps = {
  navItems: NavigationItem[];
};

export default function NavClient({ navItems }: NavClientProps) {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const isActive = (item: NavigationItem) => {
    // Skip if no href
    if (!item.href) {
      // Check if any dropdown item is active
      if (item.dropdown && item.dropdown.length > 0) {
        return item.dropdown.some(sub => pathname.startsWith(sub.href));
      }
      return false;
    }

    return item.startsWith 
      ? pathname.startsWith(item.href) 
      : pathname === item.href;
  };

  const handleMouseEnter = (itemLabel: string) => {
    // Clear any existing timeout
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    
    // Set dropdown after a small delay
    hoverTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(itemLabel);
    }, 150); // 150ms delay
  };

  const handleMouseLeave = () => {
    // Clear any existing timeout
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    
    // Hide dropdown after a delay
    hoverTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 200); // 200ms delay to allow moving to dropdown
  };

  const handleClick = (itemLabel: string) => {
    // Toggle dropdown on click
    setOpenDropdown(openDropdown === itemLabel ? null : itemLabel);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  if (navItems.length === 0) {
    return (
      <nav className="hidden md:flex items-center gap-1 rounded-xl bg-gray-50/50 p-1">
        <div className="px-4 py-2 text-sm text-red-500">
          Failed to load menu
        </div>
      </nav>
    );
  }

  return (
    <nav
      aria-label="Primary"
      className="hidden md:flex items-center gap-1 rounded-xl bg-gray-50/50 p-1"
    >
      {navItems.map((item) => {
        const active = isActive(item);
        
        // Dropdown menu (has dropdown items)
        if (item.dropdown && item.dropdown.length > 0) {
          return (
            <div 
              key={item.id}
              className="relative"
              onMouseEnter={() => handleMouseEnter(item.label)}
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={() => handleClick(item.label)}
                className="group relative inline-flex select-none items-center gap-1 rounded-lg px-4 py-2 text-sm font-normal outline-none transition-all duration-200"
              >

                {/* Text */}
                <span
                  className={[
                    'relative z-10 transition-colors duration-200',
                    active 
                     ?'text-indigo-600' //   ? 'text-white font-medium'
                      : 'text-gray-600 group-hover:text-gray-900',
                  ].join(' ')}
                >
                  {item.label}
                </span>
                
                {/* Dropdown arrow */}
                <svg
                  className={[
                    'relative z-10 w-4 h-4 transition-all duration-200',
                    active 
                    ? 'text-indigo-600' 
                     : 'text-gray-600 group-hover:text-gray-900',
                    openDropdown === item.label ? 'rotate-180' : ''
                  ].join(' ')}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown content */}
              {openDropdown === item.label && (
                <div 
                  className="absolute left-0 top-full mt-2 w-64 rounded-xl bg-white p-2 shadow-xl ring-1 ring-black/5"
                  onMouseEnter={() => handleMouseEnter(item.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  {item.dropdown.map((subItem) => (
                    <Link
                      key={subItem.id}
                      href={subItem.href}
                      className="block rounded-lg px-4 py-3 transition-colors hover:bg-gray-50"
                    >
                       <div className="mt-1 text-sm text-gray-500">{subItem.label}</div>
                      {subItem.description && (
                        <div className="mt-1 text-sm text-gray-500">{subItem.description}</div>
                      )}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        }

        // Regular link (no dropdown)
        // Skip if no href (shouldn't happen after filter, but just in case)
        if (!item.href) return null;

        return (
          <Link
            key={item.id}
            href={item.href}
            aria-current={active ? 'page' : undefined}
            className="group relative inline-flex select-none items-center rounded-lg px-4 py-2 text-sm font-normal outline-none transition-all duration-200"
          >
  
            {/* Text */}
            <span
              className={[
                'relative z-10 transition-colors duration-200',
                active 
                  ? 'text-indigo-600 font-medium'
                  : 'text-gray-600 group-hover:text-gray-900',
              ].join(' ')}
            >
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}