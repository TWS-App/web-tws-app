import CategoriesSection from "../components/category";
import HotCollections from "../components/collections";
import CreateSection from "../components/create";
import HeroBanner from "../components/hero";
import MarketSection from "../components/market";
import Navbar from "../components/navbar";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Navbar />

        <HeroBanner />

        <CategoriesSection />

        <HotCollections />
        <CreateSection />

        <MarketSection />
      </main>
    </div>
  );
}
