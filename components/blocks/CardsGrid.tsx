"use client";

import { useEffect } from "react";
import Image from "next/image";
import { getStrapiURL } from "@/lib/strapi";
import type { LandingPageBlockCardGrid } from "@/lib/strapi";
import AOS from "aos";

export function CardGrid({ block }: { block: LandingPageBlockCardGrid }) {
    const b = block ?? [];


    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
            offset: 100,
        });
    }, []);

    const isWhySakti = (b.subHeading || "")
        .toLowerCase()
        .includes("mengapa sakti");
    const strokePalette = ["#4F12C1", "#45692D", "#6E357E"];

    return (
        <section
            key={`cardgrid-${b.id}`}
            className="relative bg-[#0f1b2d] py-12 md:py-20 text-white"
            data-aos="fade-up"
        >
            <div className="mx-auto max-w-6xl px-4 sm:px-6 text-center">
                {b.subHeading && (
                    <h3 className="mb-6 text-3xl font-bold text-[#3b82f6] md:text-4xl">
                        {b.subHeading}
                    </h3>
                )}
            </div>
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {b.card?.map((card, idx) => {
                        const strokeColor = strokePalette[idx % strokePalette.length];

                        const CardContent = (
                            <article
                                className={
                                    "h-full rounded-xl p-6 shadow-sm hover:shadow-lg transition"

                                }
                                data-aos="fade-up"
                                data-aos-delay={idx * 100}
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
                                {card.image?.url && (
                                    <div className="mb-4">
                                        <div
                                            className="relative h-12 w-12 overflow-hidden rounded-lg bg-white/0"
                                            style={isWhySakti ? { color: strokeColor } : {}}
                                        >
                                            <Image
                                                src={
                                                    card.image.url.startsWith("/")
                                                        ? `${getStrapiURL()}${card.image.url}`
                                                        : card.image.url
                                                }
                                                alt={card.image.alternativeText || "image"}
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

