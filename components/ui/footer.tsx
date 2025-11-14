import Link from "next/link";
import Logo from "./logo";
import Image from "next/image";
import type { StrapiImage } from "@/lib/strapi";
import { getStrapiURL } from "@/lib/strapi";

type FooterNavItem = {
  id: number;
  href: string;
  label: string;
  isExternal?: boolean;
};

type FooterLogo = {
  id: string;
  href: string;
  isExternal?: boolean;
  label: string;
  text: string;
  image: StrapiImage ;
};

type FooterSocialLink = {
  id: number;
  href: string;
  label?: string | null;
  isExternal?: boolean;
  image: StrapiImage | null;
};

type FooterProps = {
  border: boolean;
  text: string;
  navItems: FooterNavItem[];
  socialLinks: FooterSocialLink[];
  logo: FooterLogo;
};

export default function Footer({ border = false, text, navItems, socialLinks, logo }: FooterProps) {
  const renderLogo = () => {
    // Jika ada logo dari Strapi, gunakan image dari Strapi
    if (logo?.image?.url) {
      const logoContent = (
        <span className="relative inline-block h-15 w-25 overflow-hidden">
          <Image
            src={
              logo.image.url.startsWith("/")
                ? `${getStrapiURL()}${logo.image.url}`
                : logo.image.url
            }
            alt={logo.image.alternativeText || logo.image || "Logo"}
            fill
            sizes="120px"
            className="object-contain"
          />
        </span>
      );

      // Jika logo memiliki link
      if (logo.href) {
        if (logo.isExternal) {
          return (
            <a
              href={logo.href}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-5"
            >
              {logoContent}
            </a>
          );
        }
        return (
          <Link href={logo.href} className="flex items-center gap-5">
            {logoContent}
          </Link>
        );
      }
      
      // Jika logo tidak memiliki link, return logo saja
      return logoContent;
    }

    // Fallback: Jika tidak ada logo dari Strapi, gunakan text label
    const fallbackContent = logo?.label ? (
      <span className="text-xl font-bold text-gray-900">{logo.label}</span>
    ) : (
      // Optional: Fallback ke component Logo jika benar-benar tidak ada data
      <Logo />
    );

    // Handle link untuk fallback content juga
    if (logo?.href) {
      if (logo.isExternal) {
        return (
          <a
            href={logo.href}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-5"
          >
            {fallbackContent}
          </a>
        );
      }
      return (
        <Link href={logo.href} className="flex items-center gap-5">
          {fallbackContent}
        </Link>
      );
    }

    return fallbackContent;
  };

  const renderSocialLinkContent = (link: FooterSocialLink) => {
    if (link.image?.url) {
      return (
        <span className="flex items-center gap-2">
          <span className="relative inline-block h-6 w-6 overflow-hidden">
            <Image
              src={
                link.image.url.startsWith("/")
                  ? `${getStrapiURL()}${link.image.url}`
                  : link.image.url
              }
              alt={link.image.alternativeText || link.label || "Social link"}
              fill
              sizes="24px"
              className="object-contain"
            />
          </span>
          {link.label ? <span>{link.label}</span> : null}
        </span>
      );
    }
    return <span>{link.label || link.href}</span>;
  }; // ✅ DIPERBAIKI: tambah closing brace dan semicolon

  return (
    <footer>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Top area: Blocks */}
        <div
          className={`grid gap-10 py-8 sm:grid-cols-12 md:py-12 ${border ? "border-t [border-image:linear-gradient(to_right,transparent,var(--color-slate-200),transparent)1]" : ""}`}
        >
          {/* 1st block */}
          <div className="space-y-2 sm:col-span-12 lg:col-span-4">
            {renderLogo()}
            <div></div>
           <div className="text-sm text-gray-600">
  {text || logo?.text }
</div>

          </div>

          {/* Links from Strapi (single column) */}
          {Array.isArray(navItems) && navItems.length > 0 ? (
            <div className="space-y-2 sm:col-span-6 md:col-span-3 lg:col-span-4">
              <h3 className="text-sm font-medium">Product</h3>
              <ul className="space-y-2 text-sm">
                {navItems
                  .filter((item) => typeof item?.href === "string" && item.href.trim().length > 0)
                  .map((item) => (
                    <li key={item.id}>
                      {item.isExternal ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noreferrer"
                          className="text-gray-600 transition hover:text-gray-900"
                        >
                          {item.label}
                        </a>
                      ) : (
                        <Link
                          href={item.href}
                          className="text-gray-600 transition hover:text-gray-900"
                        >
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
              <ul className="flex gap-5 text-sm">
                {socialLinks
                  .filter((s) => typeof s?.href === "string" && s.href.trim().length > 0)
                  .map((s) => (
                    <li key={s.id}>
                      {s.isExternal ? (
                        <a
                          className="text-gray-600 transition hover:text-gray-900"
                          href={s.href}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {renderSocialLinkContent(s)}
                        </a>
                      ) : (
                        <Link
                          className="flex items-center gap-2 text-gray-600 transition hover:text-gray-900"
                          href={s.href}
                        >
                          {renderSocialLinkContent(s)}
                        </Link>
                      )}
                    </li>
                  ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    </footer>
  );
}