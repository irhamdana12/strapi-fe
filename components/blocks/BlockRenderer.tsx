import Image from "next/image";
import Link from "next/link";
import { getStrapiURL } from "@/lib/strapi";
import type {
  LandingPageBlockCardGrid,
  LandingPageBlockHero,
  LandingPageBlockSectionHeading,
  LandingPageBlockSolutions,
} from "@/lib/strapi";

type Block =
  | LandingPageBlockHero
  | LandingPageBlockSectionHeading
  | LandingPageBlockCardGrid
  | LandingPageBlockSolutions;
  // | LandingPageBlockFaq;

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
                  <div className="py-24 md:py-32 text-center">
                 <h1 className="mb-6 font-extrabold leading-[1.05] tracking-tight text-6xl md:text-6xl lg:text-7xl">
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
                            alt={b.image.alternativeText || "Hero image"}
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
                    <p className="mb-2 text-sm font-semibold uppercase text-blue-400">
                      {b.subHeading}
                    </p>
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

            const isWhySakti = 
            lastSectionHeading &&
            lastSectionHeading.toLowerCase().includes("mengapa sakti");

            const strokePalette = ["#4F12C1", "#45692D", "#6E357E"]; 

        return (
              <section
                key={`cardgrid-${b.id}`}
                className="relative bg-[#0f1b2d] py-12 md:py-20 text-white"
              >
                <div className="mx-auto max-w-6xl px-4 sm:px-6">
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {b.cards?.map((card, idx) => {
                       const strokeColor = strokePalette[idx % strokePalette.length];
                   
                       const CardContent = (
                        <article
                          className={
                          "h-full rounded-xl p-6 shadow-sm hover:shadow-lg transition"
                          
                          }
                                          style={
                  isWhySakti
                    ? {
                        background: "#111a2d", // sama semua
                        border: `2px solid ${strokeColor}`,
                      }
                    : {
                        background: "#121f38",
                        border: "1px solid #334155",
                      }
                }
              >
                         {/* ICON */}
                {card.icon?.url && (
                  <div className="mb-4">
                    <div
                      className="relative h-12 w-12 overflow-hidden rounded-lg bg-white/0"
                      style={isWhySakti ? { color: strokeColor } : {}}
                    >
                      <Image
                        src={
                          card.icon.url.startsWith("/")
                            ? `${getStrapiURL()}${card.icon.url}`
                            : card.icon.url
                        }
                        alt={card.icon.alternativeText || "Icon"}
                        fill
                        sizes="48px"
                        className="object-contain p-1"
                      />
                    </div>
                  </div>
                )}

                {/* HEADING */}
                {card.heading && (
                  <h3
                    className="mb-2 text-lg font-semibold"
                    style={isWhySakti ? { color: "#fff" } : {}}
                  >
                    {card.heading}
                  </h3>
                )}

                {/* TEXT */}
                {card.text && (
                  <p className={isWhySakti ? "text-white/75" : "text-white/70"}>
                    {card.text}
                  </p>
                )}
              </article>
            );

                      // Wrap with link if exists
                      if (card.link?.href) {
                        return card.link.isExternal ? (
                          <a
                            key={card.id}
                            href={card.link.href}
                            target="_blank"
                            rel="noreferrer"
                            className="block h-full"
                          >
                            {CardContent}
                          </a>
                        ) : (
                          <Link key={card.id} href={card.link.href} className="block h-full">
                            {CardContent}
                          </Link>
                        );
                      }

                      return (
                        <div key={card.id} className="h-full">
                          {CardContent}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>
            );
          }


case "blocks.solution-tabs": {
  
  const b = block as LandingPageBlockSolutions;
  const [activeTab, setActiveTab] = useState(b.tabs?.[0]?.key ?? ""); //buat nyimpen tab mana yang lagi aktif (“Smart Government” atau “Growing Business”).

  const current = b.tabs?.find((t) => t.key === activeTab) ?? b.tabs?.[0];

  return (
    <section className="bg-slate-50 py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-4">
        {b.title && (
          <h2 className="text-center text-2xl font-bold mb-8">
            {b.title}
          </h2>
        )}

        {/* tabs */}
        <div className="flex gap-4 justify-center mb-10">
          {b.tabs?.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-8 py-3 rounded-xl text-sm font-semibold transition ${
                activeTab === tab.key
                  ? "bg-white border-2 border-blue-400 text-slate-900"
                  : "bg-slate-900 text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* body */}
        {current && (
          <div className="grid gap-8 md:grid-cols-[280px,1fr] items-start">
            {/* left image */}
            <div className="bg-gradient-to-br from-blue-500 to-blue-800 rounded-2xl min-h-[220px] flex items-center justify-center">
              {/* pakai current.illustration */}
            </div>

            {/* right content */}
            <div>
              <p className="text-slate-700 mb-4">{current.text}</p>

              <ul className="space-y-2 mb-4">
                {current.bullets.map((item: string) => (
                  <li key={item} className="flex gap-2 items-start">
                    <span className="mt-1 h-4 w-4 rounded-full border border-purple-500 text-purple-500 flex items-center justify-center text-[10px]">
                      ✓
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {current.result_title && (
                <p className="font-semibold mb-1">{current.result_title}</p>
              )}
              <ul className="text-sm text-slate-700">
                {current.results.map((r: string) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}




          default:
            return null;
        }
      })}
    </>
  );
}

