import Link from "next/link";
import Logo from "./logo";

type FooterProps = {
  border?: boolean;
  text?: string;
  navItems?: Array<{ id: number; href: string; label: string; isExternal?: boolean }>;
  socialLinks?: Array<{ id: number; href: string; label?: string; isExternal?: boolean }>;
};

export default function Footer({ border = false, text, navItems, socialLinks }: FooterProps) {
  return (
    <footer>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Top area: Blocks */}
        <div
          className={`grid gap-10 py-8 sm:grid-cols-12 md:py-12 ${border ? "border-t [border-image:linear-gradient(to_right,transparent,var(--color-slate-200),transparent)1]" : ""}`}
        >
          {/* 1st block */}
          <div className="space-y-2 sm:col-span-12 lg:col-span-4">
            <div>
              <Logo />
            </div>
            <div className="text-sm text-gray-600">
              {text || "All rights reserved."}
            </div>
          </div>

          {/* Links from Strapi (single column) */}
          {Array.isArray(navItems) && navItems.length > 0 ? (
            <div className="space-y-2 sm:col-span-6 md:col-span-3 lg:col-span-4">
              <h3 className="text-sm font-medium">Links</h3>
              <ul className="space-y-2 text-sm">
                {navItems
                  .filter((item) => typeof item?.href === "string" && item.href.trim().length > 0)
                  .map((item) => (
                  <li key={item.id}>
                    {item.isExternal ? (
                      <a className="text-gray-600 transition hover:text-gray-900" href={item.href} target="_blank" rel="noreferrer">
                        {item.label}
                      </a>
                    ) : (
                      <Link className="text-gray-600 transition hover:text-gray-900" href={item.href}>
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {/* Social */}
          {Array.isArray(socialLinks) && socialLinks.length > 0 ? (
            <div className="space-y-2 sm:col-span-6 md:col-span-3 lg:col-span-2">
              <h3 className="text-sm font-medium">Social</h3>
              <ul className="space-y-2 text-sm">
                {socialLinks
                  .filter((s) => typeof s?.href === "string" && s.href.trim().length > 0)
                  .map((s) => (
                  <li key={s.id}>
                    {s.isExternal ? (
                      <a className="text-gray-600 transition hover:text-gray-900" href={s.href} target="_blank" rel="noreferrer">
                        {s.label || s.href}
                      </a>
                    ) : (
                      <Link className="text-gray-600 transition hover:text-gray-900" href={s.href}>
                        {s.label || s.href}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>

      {/* Big text */}
      <div className="relative -mt-16 h-60 w-full" aria-hidden="true">
        <div className="pointer-events-none absolute left-1/2 -z-10 -translate-x-1/2 text-center text-[348px] font-bold leading-none before:bg-linear-to-b before:from-gray-200 before:to-gray-100/30 before:to-80% before:bg-clip-text before:text-transparent before:content-['Simple'] after:absolute after:inset-0 after:bg-gray-300/70 after:bg-clip-text after:text-transparent after:mix-blend-darken after:content-['Simple'] after:[text-shadow:0_1px_0_white]"></div>
        {/* Glow */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-2/3"
          aria-hidden="true"
        >
          <div className="h-56 w-56 rounded-full border-[20px] border-blue-700 blur-[80px]"></div>
        </div>
      </div>
    </footer>
  );
}
