"use client";

import {
  FaTools,
  FaStore,
  FaComments,
  FaVideo,
  FaCog,
  FaHeadphones,
} from "react-icons/fa";

// Category
const services = [
  {
    id: 1,
    icon: <FaVideo className="text-3xl text-[#2E4AA0]" />,
    background: "/images/assets/BUTTON_TutorialPairngTWS.png",
    title: "Tutorial Pairing TWS",
  },
  {
    id: 2,
    icon: <FaCog className="text-3xl text-[#2E4AA0]" />,
    title: "Service dari Luar Kota",
    background: "/images/assets/BUTTON_ServiceTWSRusak.png",
  },
  {
    id: 3,
    icon: <FaTools className="text-3xl text-[#2E4AA0]" />,
    title: "Produk Part Pengganti TWS",
    background: "/images/assets/BUTTON_ProdukPartPenggantiTWS.png",
  },
  {
    id: 4,
    icon: <FaStore className="text-3xl text-[#2E4AA0]" />,
    title: "Marketplace",
    background: "/images/assets/BUTTON_Marketplace.png",
  },
  {
    id: 5,
    icon: <FaHeadphones className="text-3xl text-[#2E4AA0]" />,
    title: "Sosial Media",
    background: "/images/assets/BUTTON_SosialMedia.png",
  },
  {
    id: 6,
    icon: <FaComments className="text-3xl text-[#2E4AA0]" />,
    title: "Konsultasi",
    background: "/images/assets/BUTTON_Konsultasi.png",
  },
];

export default function CategorySelection() {
  return (
    <section className="bg-white py-16 w-full">
      <div className="max-w-6xl mx-auto text-center px-4">
        {/* Title */}
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-10 text-[#000]">
          MAKE YOUR <span className="text-[#3C74FF]">AUDIO DEVICE</span> GREAT
          AGAIN
        </h2>

        {/* Cards Centered */}
        <div className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-0 justify-items-center">
            {services.map((item, index) => (
              <img
                key={index}
                src={item.background}
                alt={item.title}
                className="transition-transform hover:scale-110 duration-300 cursor-pointer"
              />
            ))}
          </div>

          {/* {services.map((item) => (
              <div
                key={item.id}
                className="bg-[#EAF1FF] rounded-2xl shadow-md hover:shadow-lg w-[150px] h-[150px] flex flex-col justify-center items-center transition-transform hover:scale-105 cursor-pointer"
                style={{
                  backgroundImage: item?.background,
                  width: "100%",
                  height: "100%",
                }}
              >
                {!item?.background ? (
                  <>
                    <div className="bg-white rounded-full p-4 mb-3 shadow-sm">
                      {item.icon}
                    </div>
                    <p className="text-sm font-semibold text-[#1B1B1B] leading-tight px-2">
                      {item.title}
                    </p>
                  </>
                ) : null}
              </div>
            ))} */}
        </div>
      </div>
    </section>
  );
}
