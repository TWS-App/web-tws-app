"use client";

export default function BrandLogos() {
  const logos = [
    { src: "/images/logo/soundcore.jpg", alt: "Soundcore" },
    { src: "/images/logo/soundpeats.png", alt: "Soundpeats" },
    { src: "/images/logo/xiaomi.png", alt: "Mi Redmi" },
    { src: "/images/logo/tozo.png", alt: "Tozo" },
    { src: "/images/logo/earfun.png", alt: "Earfun" },
    { src: "/images/logo/jbl.png", alt: "JBL" },
    { src: "/images/logo/audiot.jpg", alt: "Audio Technica" },
    { src: "/images/logo/mixio.png", alt: "Mixio" },
    { src: "/images/logo/airpods.png", alt: "AirPods" },
    { src: "/images/logo/sony.png", alt: "Sony" },
    { src: "/images/logo/samsung.png", alt: "Samsung" },
    { src: "/images/logo/sennheiser.png", alt: "Sennheiser" },
    { src: "/images/logo/jabra.png", alt: "Jabra" },
  ];

  return (
    <section className="w-full bg-white py-12">
      <div className="max-w-6xl mx-auto px-6 border-t-2 border-black">
        {/* Container */}
        <div className="mt-10 flex flex-wrap justify-center items-center gap-x-10 gap-y-8">
          {logos.map((logo, index) => (
            <img
              key={index}
              src={logo.src}
              alt={logo.alt}
              className="h-8 sm:h-10 md:h-12 transition duration-300 cursor-pointer"
            />
          ))}
        </div>

        <div className="max-w-6xl mx-auto px-6  mt-10 border-t-2 border-black" />
      </div>
    </section>
  );
}
