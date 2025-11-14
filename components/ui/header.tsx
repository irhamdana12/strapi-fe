'use client';

import Link from "next/link";
import Image from "next/image";
import Logo from "./logo";
import { getStrapiURL } from "@/lib/strapi";
import { useState } from "react";

type HeaderProps = {
  logo?: {
    href?: string;
    label?: string;
    isExternal?: boolean;
    image?: { url: string; alternativeText?: string | null } | null;
  } | null;
  navItems?: Array<{ id: number; href: string; label: string; isExternal?: boolean }>;
  cta?: { href: string; label: string; isExternal?: boolean } | null;
  loginLink?: { href: string; label: string; isExternal?: boolean } | null;
};

export default function Header({ logo, navItems, cta, loginLink }: HeaderProps = {}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-5 z-50 w-full md:top-9">
      <div className="mx-auto max-w-6xl px-8 sm:px-5">
        <div className="relative flex h-18 items-center justify-between gap-3 rounded-2xl bg-white/90 px-3 shadow-lg shadow-black/[0.03] backdrop-blur-xs before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(var(--color-gray-100),var(--color-gray-200))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)]">
          {/* Left: Logo */}
          
              {logo?.href ? (
                <Link href={logo.href} className="flex items-center gap-5">
                  {logo.image?.url ? (
                    <span className="relative inline-block h-15 w-25 overflow-hidden">
                      <Image
                        src={logo.image.url.startsWith("/") ? `${getStrapiURL()}${logo.image.url}` : logo.image.url}
                        alt={logo.image.alternativeText || logo.label || "Logo"}
                        fill
                        sizes="20px"
                        className="object-contain"
                      />
                    </span>
                  ) : (
                    <Logo />
                  )}
                </Link>
              ) : (
                <Logo />
              )}
            
         

          {/* Center: Desktop Navigation */}
          {Array.isArray(navItems) && navItems.length > 0 ? (
            <div className="hidden lg:flex justify-center col-start-2">
              <nav className="flex items-center gap-9 lg:gap-9 xl:gap-8">
                <ul className="flex items-center gap-2">
                 {navItems
  .filter((item) => typeof item?.href === "string" && item.href.trim().length > 0)
  .map((item) => (
    <li key={item.id}>
      {item.isExternal ? (
        <a
          href={item.href}
          target="_blank"
          rel="noreferrer"
          className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200"
        >
          {item.label}
        </a>
      ) : (
        <Link
          href={item.href}
          className="px-4 py-2 text-sm font-medium text-gray-800 hover:text-blue-500 transition-colors duration-200"
        >
          {item.label}
        </Link>
      )}
    </li>
  ))}
                </ul>
              </nav>
            </div>
          ) : null}

          {/* Right: Search, Log in, CTA, Mobile Menu */}
          <div className="flex items-center gap-4 justify-end col-start-3">

     

            {/* CTA Button - Desktop */}
            {cta?.href && (
              <div className="hidden lg:block">
                {cta.isExternal ? (
                  <a
                    href={cta.href}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-full bg-pink-600 text-white shadow-sm hover:bg-pink-700 transition-colors"
                  >
                    {cta.label || "Book a Demo"}
                  </a>
                ) : (
                  <Link
                    href={cta.href}
                    className="px-4 py-2 rounded-full bg-pink-600 text-white shadow-sm hover:bg-pink-700 transition-colors"
                  >
                    {cta.label || "Book a Demo"}
                  </Link>
                )}
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              type="button"
              className="lg:hidden p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-md transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-white/10">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {/* Mobile Navigation Items */}
              {Array.isArray(navItems) && navItems.length > 0 && (
                <>
                  {navItems
                    .filter((item) => typeof item?.href === "string" && item.href.trim().length > 0)
                    .map((item) => (
                    <div key={item.id}>
                      {item.isExternal ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noreferrer"
                          className="block px-3 py-2 text-base font-medium text-white/80 hover:text-white hover:bg-white/10 rounded-md transition-colors"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.label}
                        </a>
                      ) : (
                        <Link
                          href={item.href}
                          className="block px-3 py-2 text-base font-medium text-white/80 hover:text-white hover:bg-white/10 rounded-md transition-colors"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.label}
                        </Link>
                      )}
                    </div>
                  ))}
                </>
              )}

              {/* Mobile Log in Link */}
              {loginLink?.href && (
                <div className="border-t border-white/10 pt-2 mt-2">
                  {loginLink.isExternal ? (
                    <a
                      href={loginLink.href}
                      target="_blank"
                      rel="noreferrer"
                      className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {loginLink.label || "Log in"}
                    </a>
                  ) : (
                    <Link
                      href={loginLink.href}
                      className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {loginLink.label || "Log in"}
                    </Link>
                  )}
                </div>
              )}

              {/* Mobile CTA Button */}
              {cta?.href && (
                <div className="border-t border-gray-200 pt-2 mt-2">
                  {cta.isExternal ? (
                    <a
                      href={cta.href}
                      target="_blank"
                      rel="noreferrer"
                      className="block w-full text-center px-4 py-2 text-base font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {cta.label || "Book a Demo"}
                    </a>
                  ) : (
                    <Link
                      href={cta.href}
                      className="block w-full text-center px-4 py-2 text-base font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {cta.label || "Book a Demo"}
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
