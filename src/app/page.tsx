import Image from "next/image";
import Navbar from "./components/navbar";
import HeroBanner from "./components/hero";
import CategoriesSection from "./components/category";
import HotCollections from "./components/collections";
import MarketSection from "./components/market";
import CreateSection from "./components/create";
import Footer from "./components/footer";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div
          className="bg-cover bg-center py-20 px-4 text-white"
          style={{ backgroundImage: "url('/images/banner-bg.jpg')" }}
        >
          <HeroBanner />
        </div>

        <CategoriesSection />

        <HotCollections />
        <CreateSection />

        <MarketSection />

        <div className="flex gap-4 items-center flex-col sm:flex-row"></div>
      </main>
    </div>
  );
}
