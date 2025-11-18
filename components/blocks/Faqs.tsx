"use client";

import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import type { LandingPageBlockFAQs } from "@/lib/strapi";

export function FAQs({ block }: { block: LandingPageBlockFAQs }) {
  const faqs = block.faqs ?? [];
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    AOS.init({ duration: 600, once: true, offset: 50 });
  }, []);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="bg-white py-20 md:py-28" id="faq">
      <div className="mx-auto max-w-4xl px-6 md:px-12">
        <div className="mb-12 text-center" data-aos="fade-up">
          <h2 className="mb-6 text-3xl font-bold text-[#0A2463] md:text-4xl">
            {block.heading || "FAQ Singkat"}
          </h2>
          <div className="mx-auto mt-6 h-1 w-20 bg-[#3E92CC]" />
        </div>

        <div className="space-y-4" data-aos="fade-up" data-aos-delay="100">
          {faqs.map((faqs, index) => {
            const isActive = activeIndex === index;

            return (
              <div
                key={faqs.id ?? index}
                className={`overflow-hidden rounded-xl border-2 transition-all duration-300 ${
                  isActive
                    ? "border-[#3E92CC] bg-white shadow-lg"
                    : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="flex w-full items-center justify-between gap-3 px-6 py-5 text-left transition-colors md:px-8 md:py-6"
                  aria-expanded={isActive}
                  aria-controls={`faq-answer-${faqs.id ?? index}`}
                >
                  <span
                    className={`text-lg font-semibold transition-colors md:text-xl ${
                      isActive ? "text-[#3E92CC]" : "text-[#0A2463]"
                    }`}
                  >
                    {faqs.heading}
                  </span>

                  <div
                    className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                      isActive
                        ? "rotate-45 bg-[#3E92CC] text-white"
                        : "bg-slate-100 text-[#0A2463]"
                    }`}
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v12m6-6H6"
                      />
                    </svg>
                  </div>
                </button>

                <div
                  id={`faq-answer-${faqs.id ?? index}`}
                  className={`transition-all duration-300 ease-in-out ${
                    isActive ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="border-t border-slate-200 px-6 py-5 md:px-8 md:py-6">
                    <p className="text-base leading-relaxed text-slate-700 md:text-lg">
                      {faqs.text}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
