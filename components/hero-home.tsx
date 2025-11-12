import Link from "next/link";

<section className="relative min-h-screen flex items-center" style={{ backgroundColor: '#0a1628' }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="py-24 md:py-32">
        <div className="mx-auto max-w-5xl text-center">
                       <h1 className="mb-6 font-extrabold leading-[1.05] tracking-tight text-4xl md:text-5xl lg:text-6xl">
              {/* Data dari Strapi */}
              <span className="block text-white">
                {data.heading_line1}
              </span>
		        <span className="block" style={{ color: '#0a1628' }}>
                {data?.heading_line2}
              </span>
            </h1>

            <p className="mb-12 text-lg text-white/80 md:text-xl max-w-3xl mx-auto leading-relaxed">
              {data.subheading}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4" data-aos="fade-up" data-aos-delay="200">
              <a
                href="#0"
                className="btn px-8 py-3.5 text-white rounded-full hover:opacity-90 transition-opacity font-semibold shadow-lg text-base"
                style={{ backgroundColor: '#ec4899' }}
              >
                Book a Demo
              </a>
              <a
                href="#0"
                className="btn px-8 py-3.5 bg-transparent text-white border-2 border-white/30 rounded-full hover:bg-white/10 hover:border-white/50 transition-all font-semibold text-base"
              >
                Take a Tour
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>