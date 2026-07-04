export default function CareersSection() {
  return (
    <section id="roots" className="relative isolate h-dvh min-h-[640px] overflow-hidden bg-[#f4f4f4] text-ink dark:bg-black dark:text-cloud">
      <img
        src="/map.png"
        alt="Map of India showing Rudhram locations in Surat, Mumbai, and Delhi"
        className="absolute inset-0 size-full object-cover object-[34%_center] md:object-center"
      />

      <div className="careers-card-wrap absolute inset-x-0 bottom-0 z-10 px-4 pb-16 sm:px-10 lg:px-14 lg:pb-24">
        <div className="mx-auto max-w-[1040px] rounded-[28px] border border-white/70 bg-white/80 p-5 backdrop-blur-2xl dark:border-white/20 dark:bg-black/75 sm:p-6">
          <div className="flex items-center justify-between gap-4 font-mono text-[10px] text-coral sm:text-xs">
            <span>OUR ROOTS</span>
            <span className="text-ink/50 dark:text-cloud/50">MUMBAI · SURAT · DELHI</span>
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-[.7fr_1.3fr] md:items-end md:gap-8">
            <h2 className="text-[28px] font-semibold leading-9">From uncertainty to direction.</h2>
            <p className="text-[15px] leading-6 text-ink/75 dark:text-cloud/75 md:hidden">
              Rudhram&apos;s journey took shape in Mumbai in 2021. Today, Mumbai anchors our registered office, Surat our operational office, and Delhi our next chapter.
            </p>
            <p className="hidden text-[15px] leading-6 text-ink/75 dark:text-cloud/75 md:block">
              In 2021, Shivang Vir and Mukund Barrdoliwala came to Mumbai to study cinema and discovered that ideas need systems to survive. Today, Mumbai anchors our registered office, Surat our operational and signing office, and Delhi the next chapter - turning belief into structure and ideas into brands.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
