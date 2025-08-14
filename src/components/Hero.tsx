export function Hero() {
  return (
    <section className="hero-noise relative grid min-h-[100svh] place-items-center overflow-hidden bg-[#AC5B0F] font-montserrat">
      <div className="mx-auto w-full max-w-6xl px-4 text-center">
        <h1 className="text-balance text-6xl font-extrabold leading-[0.95] sm:text-7xl md:text-8xl text-[#dbff00] mx-auto" style={{ fontFamily: 'var(--font-montserrat)' }}>
          Invest as <br /> you imagine
        </h1>
        <p className="mt-6 mx-auto text-xl/7 text-white/90" style={{ fontFamily: 'var(--font-montserrat)' }}>
          Experts in{" "}
          <span className="font-semibold underline decoration-[#dbff00] underline-offset-4 text-white">
            Private Equity
          </span>
          {" "}fund investing. From matching to due diligence,
          <br className="hidden sm:block" />
          everything happens in minutes, not months.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#start-raising"
            className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:translate-y-0.5 hover:shadow"
            style={{ fontFamily: 'var(--font-montserrat)' }}
          >
            Start Raising
          </a>
          <a
            href="#learn"
            className="rounded-full border border-white/40 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/10"
            style={{ fontFamily: 'var(--font-montserrat)' }}
          >
            Learn more
          </a>
        </div>
      </div>
    </section>
  );
}