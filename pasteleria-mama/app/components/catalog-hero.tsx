export function CatalogHero() {
  return (
    <section className="relative h-56 overflow-hidden sm:h-64 md:h-[22rem]">
      {/* Dark warm bakery background */}
      <div
        className="absolute inset-0"
        style={{
          background: [
            "radial-gradient(ellipse at 50% 70%, rgba(255,140,40,0.22) 0%, transparent 50%)",
            "radial-gradient(circle at 6% 35%, rgba(190,50,90,0.09) 0%, transparent 22%)",
            "radial-gradient(circle at 15% 25%, rgba(120,80,200,0.07) 0%, transparent 18%)",
            "radial-gradient(circle at 94% 35%, rgba(190,50,90,0.07) 0%, transparent 20%)",
            "radial-gradient(circle at 85% 50%, rgba(200,170,130,0.08) 0%, transparent 22%)",
            "radial-gradient(ellipse at center, transparent 30%, rgba(10,5,0,0.5) 100%)",
            "linear-gradient(to bottom, #2c1810, #3d2518 45%, #2a1508)",
          ].join(","),
        }}
      />
      {/* Subtle shelf lines */}
      <div className="absolute left-0 right-0 top-[52%] h-[1px] bg-gradient-to-r from-transparent via-[#5a3a25]/30 to-transparent" />
      <div className="absolute left-0 right-0 top-[78%] h-[1px] bg-gradient-to-r from-transparent via-[#5a3a25]/20 to-transparent" />

      {/* Centered vintage sign */}
      <div className="absolute inset-0 flex items-center justify-center px-4">
        {/* Warm lamp glow */}
        <div className="absolute left-1/2 top-[8%] -translate-x-1/2 sm:top-[10%]">
          <div className="h-2.5 w-2.5 rounded-full bg-amber-200/80 shadow-[0_0_18px_8px_rgba(255,200,100,0.35)] sm:h-3.5 sm:w-3.5" />
        </div>

        <div className="relative rounded-lg border-[2.5px] border-[#B09050]/50 bg-[#FEF5E0]/[0.97] px-7 py-5 text-center shadow-[0_10px_50px_rgba(0,0,0,0.35)] sm:px-12 sm:py-7 md:px-16 md:py-9">
          {/* Inner decorative border */}
          <div className="absolute inset-[5px] rounded-md border-[1.5px] border-[#B09050]/20" />

          {/* Oak-leaf SVG decoration — top */}
          <svg
            aria-hidden="true"
            className="absolute -top-[10px] left-1/2 w-32 -translate-x-1/2 sm:w-44"
            viewBox="0 0 160 20"
            fill="none"
          >
            <path d="M80 18C72 12 60 7 48 5c4 4 10 8 18 11C58 10 46 6 34 3c6 5 16 9 26 13" fill="#6B803C" fillOpacity=".55" />
            <path d="M80 18c8-6 20-11 32-13-4 4-10 8-18 11 8-6 20-10 32-13-6 5-16 9-26 13" fill="#6B803C" fillOpacity=".55" />
            <circle cx="80" cy="3" r="3" fill="#8B6B2A" fillOpacity=".45" />
            <circle cx="74" cy="5" r="2" fill="#8B6B2A" fillOpacity=".35" />
            <circle cx="86" cy="5" r="2" fill="#8B6B2A" fillOpacity=".35" />
          </svg>

          {/* Oak-leaf SVG decoration — bottom */}
          <svg
            aria-hidden="true"
            className="absolute -bottom-[10px] left-1/2 w-32 -translate-x-1/2 rotate-180 sm:w-44"
            viewBox="0 0 160 20"
            fill="none"
          >
            <path d="M80 18C72 12 60 7 48 5c4 4 10 8 18 11C58 10 46 6 34 3c6 5 16 9 26 13" fill="#6B803C" fillOpacity=".55" />
            <path d="M80 18c8-6 20-11 32-13-4 4-10 8-18 11 8-6 20-10 32-13-6 5-16 9-26 13" fill="#6B803C" fillOpacity=".55" />
            <circle cx="80" cy="3" r="3" fill="#8B6B2A" fillOpacity=".45" />
            <circle cx="74" cy="5" r="2" fill="#8B6B2A" fillOpacity=".35" />
            <circle cx="86" cy="5" r="2" fill="#8B6B2A" fillOpacity=".35" />
          </svg>

          {/* Left leaf accent */}
          <svg
            aria-hidden="true"
            className="absolute -left-[8px] top-1/2 h-16 w-4 -translate-y-1/2 sm:h-20 sm:w-5"
            viewBox="0 0 16 80"
            fill="#6B803C"
            fillOpacity=".45"
          >
            <path d="M8 10C4 18 2 28 1 40c1-8 4-16 7-22C5 26 3 36 2 48c2-8 4-16 6-22C5 34 3 44 2 56c2-8 5-16 6-20" />
          </svg>

          {/* Right leaf accent */}
          <svg
            aria-hidden="true"
            className="absolute -right-[8px] top-1/2 h-16 w-4 -translate-y-1/2 scale-x-[-1] sm:h-20 sm:w-5"
            viewBox="0 0 16 80"
            fill="#6B803C"
            fillOpacity=".45"
          >
            <path d="M8 10C4 18 2 28 1 40c1-8 4-16 7-22C5 26 3 36 2 48c2-8 4-16 6-22C5 34 3 44 2 56c2-8 5-16 6-20" />
          </svg>

          <h2
            className="relative text-xl font-bold uppercase tracking-[0.08em] text-[#7B1D1D] sm:text-3xl md:text-[2.5rem] md:leading-tight"
            style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
          >
            Selección Encina
          </h2>
          <p
            className="relative mt-1.5 text-[11px] leading-relaxed text-[#5a3a28]/80 sm:mt-3 sm:text-sm md:text-[0.95rem]"
            style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
          >
            Nuestra artesanía dulce, donde
            <br />
            la magia del sabor cobra vida
          </p>
        </div>
      </div>
    </section>
  );
}
