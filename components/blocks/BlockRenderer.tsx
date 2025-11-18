import Image from "next/image";
import Link from "next/link";
import { getStrapiURL } from "@/lib/strapi";
import { SolutionsTab } from "@/components/blocks/SolutionsTabs";
import { Product } from "@/components/blocks/Product";
import { CardGrid } from "@/components/blocks/CardsGrid";
import { FAQs } from "@/components/blocks/Faqs";
import { GetStarted } from "@/components/blocks/GetStarted";
import type {
  LandingPageBlockCardGrid,
  LandingPageBlockHero,
  LandingPageBlockSectionHeading,
  LandingPageBlockSolutions,
  LandingPageBlockProduct,
  LandingPageBlockFAQs,
  LandingPageBlockContact,
} from "@/lib/strapi";

type Block =
  | LandingPageBlockHero
  | LandingPageBlockSectionHeading
  | LandingPageBlockCardGrid
  | LandingPageBlockSolutions
  | LandingPageBlockProduct
  | LandingPageBlockFAQs
  | LandingPageBlockContact;

export default function BlockRenderer({ blocks }: { blocks: Block[] }) {
  let lastSectionHeading: string | null = null;
  return (
    <>
      {blocks?.map((block) => {
        switch (block.__component) {
          case "blocks.hero": {
            const b = block as LandingPageBlockHero;

            // Split heading into two lines using "|" as delimiter
            const [line1, line2] = (b.heading || "").split("|");

            const primaryButton =
              b.links?.find((l) => l.isButtonLink && l.type === "PRIMARY") ||
              b.links?.[0];
            const secondaryButton =
              b.links?.find((l) => l.isButtonLink && l.type === "SECONDARY") ||
              b.links?.[1];

            return (
              <section
                key={`hero-${b.id}`}
                className="relative min-h-screen flex items-center bg-[#0b1730] text-white"
              >
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
                  <div className="py-55 md:py-55 text-center">
                 <h1 className="mb-3 font-extrabold leading-[1.05] tracking-tight text-9xl md:text-5xl lg:text-7xl">
                      <span className="block text-white">{line1}</span>
                      {line2 && (
                        <span className="block text-[#3b82f6]">{line2}</span>
                      )}
                    </h1>

                    {/* Subheading */}
                    {b.text && (
                      <p className="mb-10 text-lg text-white/80 md:text-xl max-w-3xl mx-auto leading-relaxed">
                        {b.text}
                      </p>
                    )}

                    {/* CTA Buttons */}
                    {(primaryButton || secondaryButton) && (
                      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        {primaryButton?.href && (
                          primaryButton.isExternal ? (
                            <a
                              href={primaryButton.href}
                              className="rounded-full bg-pink-600 px-8 py-3 text-sm font-semibold text-white hover:bg-pink-700 transition"
                              target="_blank"
                              rel="noreferrer"
                            >
                              {primaryButton.label}
                            </a>
                          ) : (
                            <Link
                              href={primaryButton.href}
                              className="rounded-full bg-pink-600 px-8 py-3 text-sm font-semibold text-white hover:bg-pink-700 transition"
                            >
                              {primaryButton.label}
                            </Link>
                          )
                        )}
                        {secondaryButton?.href && (
                          secondaryButton.isExternal ? (
                            <a
                              href={secondaryButton.href}
                              className="rounded-full border border-white/30 bg-transparent px-8 py-3 text-sm font-semibold text-white hover:bg-white/10 transition"
                              target="_blank"
                              rel="noreferrer"
                            >
                              {secondaryButton.label}
                            </a>
                          ) : (
                            <Link
                              href={secondaryButton.href}
                              className="rounded-full border border-white/30 bg-transparent px-8 py-3 text-sm font-semibold text-white hover:bg-white/10 transition"
                            >
                              {secondaryButton.label}
                            </Link>
                          )
                        )}
                      </div>
                    )}

                    {/* Optional Hero Image */}
                    {b.image?.url && (
                      <div className="mt-16">
                        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl">
                          <Image
                            src={
                              b.image.url.startsWith("/")
                                ? `${getStrapiURL()}${b.image.url}`
                                : b.image.url
                            }
                            alt={b.image.alternativeText || "Logo"}
                            fill
                            sizes="100vw"
                            className="object-cover"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </section>
            );
          }
          case "blocks.section-heading": {
            const b = block as LandingPageBlockSectionHeading;

            lastSectionHeading = b.heading || b.subHeading || null;

            return (
              <section
                key={`heading-${b.id}`}
                className="relative bg-[#0e1a2b] text-white py-12 md:py-16"
              >
                <div className="mx-auto max-w-6xl px-4 sm:px-6 text-center">
                  {b.subHeading && (
                    <h3 className="mb-6 text-3xl font-bold text-[#3b82f6] md:text-4xl">
                      {b.subHeading}
                    </h3>
                  )}
                  {b.heading && (
                  <p
                      className="mb-10 text-lg text-white/80 md:text-xl max-w-3xl mx-auto leading-relaxed"
                    >
                      {b.heading}
                    </p>
                  )}
                </div>
              </section>
            );
          }



 case "blocks.card-grid": {
  const b = block as LandingPageBlockCardGrid;
  return <CardGrid key={b.id} block={b} />;
 }       

case "blocks.solution-tabs": {
  const b = block as LandingPageBlockSolutions;
  return <SolutionsTab key={b.id} block={b} />;
}

case "blocks.product": {
  const b = block as LandingPageBlockProduct;
  return <Product key={b.id} block={b} />;
}

case "blocks.faqs": {
  const b = block as LandingPageBlockFAQs;
  return <FAQs key={b.id} block={b} />;
}

case "blocks.contact": {
  const b = block as LandingPageBlockContact;
  return <GetStarted key={b.id} block={b} />;
}

          default:
            return null;
        }
      })}
    </>
  );
}

