"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { getStrapiURL } from "@/lib/strapi";
import type { LandingPageBlockSolutions } from "@/lib/strapi";
import AOS from "aos";

export function SolutionsTab({ block }: { block: LandingPageBlockSolutions }) {
  const tabs = block.tabs ?? [];
  const initialKey = tabs[0]?.key ?? "";
  const [activeTab, setActiveTab] = useState<string>(initialKey);
  const currentKey = activeKey(activeTab, tabs);
  const current = tabs.find((t) => t.key === currentKey) ?? tabs[0];
  const desc = current?.text ?? "";
  const bullets = current?.bullets?.map((b) => b.text) ?? [];
  const result = current?.result?.map((r) => r.text) ?? [];

  const img = current?.image;
  const imgUrl = img?.url
    ? img.url.startsWith("/")
      ? `${getStrapiURL()}${img.url}`
      : img.url
    : undefined;

       useEffect(() => {
        AOS.init({
            duration:800,
            once:true,
            offset: 50,
        });
    }, []);

    useEffect(() => {
      AOS.refresh();
    }, [activeTab]);

  return (
    <section
      className="bg-slate-50 py-12 md:py-16"
      data-aos="fade-up"
      data-aos-duration="700"
    >

      {/* heading */}
      <div className="mx-auto max-w-6xl px-4 text-center">
        {block.title && (
          <h3 className="mb-6 text-3xl font-bold text-[#0A2463] md:text-4xl">
            {block.title}
            </h3>
        )}

        <div
          className="mb-10 flex justify-center gap-4"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}

              className={`relative flex items-center justify-center gap-3 rounded-lg px-12 py-4 text-lg font-semibold transition-all duration-300 ${
                activeTab === tab.key
                  ? "bg-[#0A2463] text-white shadow-lg"
                  : "border-2 border-slate-300 bg-transparent text-slate-700 hover:border-[#3E92CC] hover:bg-white"
              }`}
            >
                <span className="text-2xl">
                    {tab.key == "gov"? "🏛️" : "📈"}
                    </span>
                    {tab.label}
                    {activeTab === tab.key && (
                        <span className="absolute -bottom-1 left-0 right-0 h-1 bg-[#3E92CC]" />
                    )}
                    </button>
                ))}
                </div>

            
       {current && (
  <div
    className="grid items-start gap-10 md:grid-cols-2 md:gap-13"
    data-aos="fade-up"
    data-aos-delay="200"
  >
    {/* Visual Side */}
    <div
      className="overflow-hidden rounded-2xl border-2 border-[#E2E8F0] bg-slate-50 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
      data-aos="zoom-in"
    >
      {imgUrl && (
        <div className="relative h-[200px] w-full md:h-[300px]">
          <Image
            src={imgUrl}
            alt={img?.alternativeText || "Solution Image"}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-contain p-4"
          />
        </div>
      )}
    </div>

    {/* Content Side */}
    <div className="space-y-6" data-aos="fade-left" data-aos-delay="250">
      {desc && <p className="text-slate-700">{desc}</p>}
      
      {!!bullets.length && (
        <div>
          <ul className="space-y-2">
            {bullets.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-1 flex h-4 w-4 items-center justify-center rounded-full border border-purple-500 text-[10px] text-purple-500">
                  ✓
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {/* Results di dalam content side tapi full width */}
 {(current.result_title || !!result.length) && (
  <div className="mt-8 md:mt-12 w-full">
    {current.result_title && (
      <p className="mb-3 font-semibold text-center text-slate-800">
        {current.result_title}
      </p>
    )}
    {!!result.length && (
      <ul className="space-y-2 text-sm text-slate-700 max-w-2xl mx-auto">
        {result.map((r) => (
          <li key={r} className="flex items-start gap-2">
            <span className="mt-0.5 flex h-4 w-4 rounded-full bg-green-100 text-[10px] text-green-600">
              ✓
            </span>
            <span>{r}</span>
          </li>
        ))}
      </ul>
    )}
  </div>
)}
    </div>
  </div>
)}

      </div>
    </section>
  );
}
function activeKey(
  key: string,
  tabs: LandingPageBlockSolutions["tabs"]
): string {
  return tabs.some((t) => t.key === key) ? key : tabs[0]?.key ?? "";
}
