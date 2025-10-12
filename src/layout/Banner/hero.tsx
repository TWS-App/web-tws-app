import Image from "next/image";
import Link from "next/link";

const HeroBanner = () => {
  return (
    <section
      // className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white py-20 px-6"
      // <div
      className="bg-cover bg-center py-20 px-4 text-white w-full"
      style={{ backgroundImage: "url('/images/banner-bg.jpg')" }}
    >
      {/* > */}
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 items-center gap-10">
        <div>
          <h6 className="text-indigo-500 font-semibold mb-2">
            YHUSAN DIGITAL
          </h6>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            {`TWS AUDIO SPECIALIST`}
          </h2>
          <p className="text-white mb-6">
            {`Memperbaiki TWS yang Rusak untuk di-service dengan part original.`}
          </p>

          <p className="text-white mb-6">
            {`PENJUALAN UNIT TWS (REPLACMENT)`}
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/explore"
              className="border border-indigo-500 text-white px-6 py-2 hover:bg-blue-600 transition rounded-4xl z-40"
              style={{
                cursor: "pointer",
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
              }}
            >
              Sparepart TWS
            </Link>
          </div>
        </div>

        {/* Image Carousel (static for now) */}
        <div className="relative w-full h-72 md:h-96">
          <div className="absolute inset-0 animate-slide">
            <Image
              src="/images/banner-01.png"
              alt="NFT Banner 1"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
