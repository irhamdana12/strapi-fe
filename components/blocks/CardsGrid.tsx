type CardGridProps = {
  block: LandingPageBlockCardGrid;
  variant?: "default" | "why-sakti";
};

export function CardGrid({ block, variant = "default" }: CardGridProps) {
  const palette = ["#2563EB", "#22C55E", "#7C3AED"];

  return (
    <section className="relative bg-[#0f1b2d] py-12 md:py-20 text-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {block.cards?.map((card, idx) => {
            const isColorful = variant === "why-sakti";

            const CardContent = (
              <article
                className="h-full rounded-xl p-6 shadow-sm hover:shadow-lg transition"
                style={
                  isColorful
                    ? {
                        background: palette[idx % palette.length],
                        border: "1px solid rgba(255,255,255,0.12)",
                      }
                    : {
                        background: "#121f38",
                        border: "1px solid #334155",
                      }
                }
              >
                {/* icon */}
                {/* heading */}
                {/* text */}
              </article>
            );

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
