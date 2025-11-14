"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { getStrapiURL } from "@/lib/strapi";
import type { LandingPageBlockProduct, NavItem} from "@/lib/strapi";
import AOS from "aos";

export function Product({block}: {block: LandingPageBlockProduct}) {
    const cards = block.card ?? [];

    useEffect(() => {
        AOS.init({
            duration:800,
            once:true,
            offset: 100,
        });
    }, []);

    const renderLink = (link:NavItem) => {
      if (!link.href || link.href.trim() === "") {
        return null;
      }
      const baseClasses = "inline-flex items-center gap-2 font-semibold transition-all duration-300";
      const buttonStyles = link.isButtonLink
      link.type === "PRIMARY"
      "rounded-full border-2 border-[#0A2463] px-8 py-3.5 text-white hover:bg-[#3E92CC] hover:border-[#3E92CC] hover:shadow-lg"
      link.type === "SECONDARY"
      "rounded-full border-2 border-[#0A2463] bg-transparent px-8 py-3.5 text-[#0A2463] hover:bg-[#0A2463] hover:text-white"
      "rounded-full border-2 border-[#0A2463] bg-transparent px-8 py-3.5 text-[#0A2463] hover:bg-[#0A2463] hover:text-white"
      "text-[#3E92CC] hover:gap-3 hover:text-[#0A2463]";

      const classes = `${baseClasses} ${buttonStyles}`;

     const content = (
      <>
        <span className="relative inline-flex items-center">
                      {link.label}
                      <span className="ml-1 tracking-normal text-blue-300 transition-transform group-hover:translate-x-0.5">
                        -&gt;
                      </span>
                    </span>
      </>
    );

    
    return (
      <Link
        key={link.id}
        href={link.href}
        className="btn group mb-4 w-full bg-linear-to-t from-blue-600 to-blue-500 bg-[length:100%_100%] bg-[bottom] text-white shadow-sm hover:bg-[length:100%_150%] sm:mb-0 sm:w-auto"
      >
        {content}
      </Link>
    );
  };

    return (
    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-12">

        {/* Product Cards */}
        <div className="space-y-24 md:space-y-32">
          {cards.map((card, index) => {
            const isEven = index % 2 === 0;
            const imageUrl = card.image?.url
              ? card.image.url.startsWith("/")
                ? `${getStrapiURL()}${card.image.url}`
                : card.image.url
              : null;

            return (
              <div
                key={card.id}
                className={`grid items-center gap-12 md:grid-cols-2 md:gap-16 ${
                  isEven ? "" : "md:grid-flow-dense"
                }`}
              >
                {/* Image/Visual Side */}
                <div
                  className={`${isEven ? "" : "md:col-start-2"}`}
                  data-aos={isEven ? "fade-right" : "fade-left"}
                  data-aos-delay="100"
                >
                  <div className="overflow-hidden rounded-2xl border-2 border-[#E2E8F0] bg-slate-50 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
                    {imageUrl ? (
                      <div className="relative aspect-[4/3] w-full">
                        <Image
                          src={imageUrl}
                          alt={card.image?.alternativeText || card.heading || "Product"}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="flex aspect-[4/3] items-center justify-center text-6xl text-slate-400">
                  
                      </div>
                    )}
                  </div>
                </div>

                {/* Content Side */}
                <div
                  className={`${isEven ? "" : "md:col-start-1 md:row-start-1"}`}
                  data-aos={isEven ? "fade-left" : "fade-right"}
                  data-aos-delay="200"
                >
                  <h3 className="mb-6 text-3xl font-bold text-[#0A2463] md:text-4xl">
                    {card.heading}
                  </h3>

                  <p className="mb-6 text-lg leading-relaxed text-slate-700">
                    {card.text}
                  </p>

               
                {/* cta */}
                {card.link &&  (
                  <div className="flex flex-wrap gap-4 pt-2">
                    {card.link.map(link => renderLink(link))}
                    </div>
                )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
    
};