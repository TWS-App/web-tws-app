import Image from "next/image";
import Link from "next/link";

const HeroBanner = () => {
  return (
    <section
    // className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white py-20 px-6"
    >
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 items-center gap-10">
        {/* Text Section */}
        <div>
          <h6 className="text-indigo-500 font-semibold mb-2">
            Liberty NFT Market
          </h6>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Create, Sell &amp; Collect Top NFT’s.
          </h2>
          <p className="text-gray-600 mb-6">
            Liberty NFT Market is a really cool and professional design for your
            NFT websites. This HTML CSS template is based on Bootstrap v5 and it
            is designed for NFT related web portals. Liberty can be freely
            downloaded from TemplateMo's free css templates.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/explore"
              className="border border-indigo-500 text-white px-6 py-2 rounded hover:bg-indigo-50 transition"
            >
              Explore Top NFTs
            </Link>
            <Link
              href="https://youtube.com/templatemo"
              target="_blank"
              className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition"
            >
              Watch Our Videos
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
