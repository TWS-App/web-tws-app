import ReviewSection from "@/layout/Review/review";
import CategoriesSection from "../components/olds/category";
import HotCollections from "../components/olds/collections";
import CreateSection from "../components/olds/create";
import HomeFooter from "../components/footer/footer";
import MarketSection from "../components/olds/market";
import Navbar from "../components/navbar/navbar-home";
import ServiceTWS from "@/layout/Banner/bannerService";
import SparepartTWS from "@/layout/Sparepart/Sparepart";
import HeroBanner from "@/layout/Banner/hero";
import CategorySelection from "@/layout/Category/category";
import BrandLogos from "@/layout/Banner/logobanner";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center h-full w-full pb-1 gap-1 sm:pt-20">
      <main className="flex flex-col row-start-2 items-center sm:items-start bg-white m-auto">
        <Navbar />

        <HeroBanner />

        <CategorySelection />
        {/* <CategoriesSection /> */}

        {/* <HotCollections /> */}

        <BrandLogos />

        <SparepartTWS />
        {/* <CreateSection /> */}

        <ServiceTWS />

        {/* <div className="border-b border-gray-950 m-12" /> */}

        {/* <MarketSection /> */}

        <ReviewSection />
      </main>
    </div>
  );
}
