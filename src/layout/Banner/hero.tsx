import Image from "next/image";
import Link from "next/link";

const HeroBanner = () => {
  return (
    <section
      // className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white py-20 px-6"
      // <div
      className="bg-cover bg-center m-auto py-60 px-96 text-white w-full h-full"
      style={{
        backgroundImage: "url('/images/assets/MainImages.png')",
        width: "100%",
        height: "100%",
      }}
    >
      {/* > */}
      <div className="container mx-auto py-4 px-4 grid grid-cols-1 md:grid-cols-2 items-center gap-10">
        <div className="absolute bottom-80 left-45 flex gap-4 z-10">
          <Link
            href="/explore"
            className="border-2 border-blue-400 text-white px-8 py-3 rounded-full hover:bg-blue-600 transition"
          >
            Service TWS
          </Link>

          <Link
            href="https://youtube.com/"
            target="_blank"
            className="bg-indigo-600 text-white px-8 py-3 rounded-full hover:bg-amber-300 hover:text-blue-800 transition"
          >
            Sparepart TWS
          </Link>
        </div>

        {/* <div className="flex gap-8">
          <Link
            href="/explore"
            className="border border-indigo-500 text-white px-6 py-2 hover:bg-blue-600 transition rounded-4xl z-40"
            style={{
              cursor: "pointer",
              backgroundImage: "url('/images/assets/D:\next\tws-app\public\images\assets\CTA_SERVICE_TWS.png')",
              width: "100%",
              height: "100%",
            }}
          >
            Service TWS
          </Link>

          <Link
            href="https://youtube.com/"
            target="_blank"
            className="bg-indigo-600 text-white px-6 py-2 hover:bg-amber-50 hover:text-blue-500 transition rounded-4xl z-40"
            style={{
              cursor: "pointer",
              backgroundImage: "url('/images/assets/CTA_belisparepart.png')",
              width: "100%",
              height: "100%",
            }}
          >
            Sparepart TWS
          </Link>
        </div> */}

        {/* Image Carousel (static for now) */}
        {/* <div className="relative w-full h-72 md:h-96">
          <div className="absolute inset-0 animate-slide">
            <Image
              src="/images/banner-01.png"
              alt="NFT Banner 1"
              fill
              className="object-contain"
            />
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default HeroBanner;
