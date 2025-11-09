// Page Components
import ReviewSection from "@/layout/Review/review";
import CategoriesSection from "../components/olds/category";
import HotCollections from "../components/olds/collections";
import CreateSection from "../components/olds/create";
import HomeFooter from "../components/footer/footer";
import MarketSection from "../components/olds/market";
import ServiceTWS from "@/layout/Banner/bannerService";
import SparepartTWS from "@/layout/Sparepart/Sparepart";
import Navbar from "../components/navbar/navbar-home";
import HeroBanner from "@/layout/Banner/hero";
import CategorySelection from "@/layout/Category/category";
import BrandLogos from "@/layout/Banner/logobanner";

// CODE
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-white scroll-smooth">
      <main className="flex-1 flex flex-col items-center w-full overflow-x-hidden">
        <Navbar />

        <HeroBanner />

        <CategorySelection />
        {/* <CategoriesSection /> */}

        {/* <HotCollections /> */}

        <BrandLogos />

        <SparepartTWS />
        {/* <CreateSection /> */}

        {/* <ServiceTWS /> */}

        <div
          className="bg-cover bg-center m-auto  text-white w-full h-full "
          style={{
            // backgroundImage: "url('/images/assets/SEMENTARA.png')",
            width: "100%",
            height: "100%",
          }}
        >
          <a href="#/contact" id="contact">
            <img
              src={"/images/assets/SEMENTARA.png"}
              alt="contacts"
              style={{
                width: "100%",
                height: "100%",
              }}
            />
          </a>
        </div>

        {/* <MarketSection />

        <ReviewSection />
         */}
      </main>
    </div>
  );
}
