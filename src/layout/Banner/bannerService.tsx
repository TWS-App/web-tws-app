"use client";

import { FaHeadphones, FaBatteryFull, FaTools } from "react-icons/fa";

// Arrays
const services = [
  {
    id: 1,
    title: "SERVICE TWS GANTI SPEAKER",
    desc: "Untuk yang TWS nya masih terdeteksi pada device tetapi tidak ada suara kemungkinan untuk di ganti driver pada speaker.",
    icon: <FaHeadphones className="text-yellow-400 text-4xl mb-4" />,
    link: "#",
    logo: "PRODUK_BOXChargerOnly.png",
  },
  {
    id: 2,
    title: "SERVICE TWS GANTI BATERAI",
    desc: "Untuk yang TWS nya masih terdeteksi pada device tetapi tidak ada suara kemungkinan untuk di ganti driver pada speaker.",
    icon: <FaBatteryFull className="text-yellow-400 text-4xl mb-4" />,
    link: "#",
    logo: "PRODUK_BOXChargerOnly.png",
  },
  {
    id: 3,
    title: "SERVICE TWS MATI TOTAL",
    desc: "Untuk yang TWS nya masih terdeteksi pada device tetapi tidak ada suara kemungkinan untuk di ganti driver pada speaker.",
    icon: <FaTools className="text-yellow-400 text-4xl mb-4" />,
    link: "#",
    logo: "PRODUK_BOXChargerOnly.png",
  },
];

export default function ServiceTWS() {
  return (
    <section className="w-full bg-white">
      <div className="max-w-6xl mx-auto mt-3 px-6 text-center border-t-2 border-black">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-600 mt-10 mb-12">
          SERVICE TWS
        </h2>

        <div className="bg-blue-100 p-4 shadow-xl/30 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 cursor-pointer">
           {services.map((srv) => (
            <div
              key={srv.id}
              className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8 flex flex-col items-center transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              {srv.icon}
              <h3 className="text-blue-700 font-bold text-md mb-2 text-center">
                {srv.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm text-center mb-4">
                {srv.desc}
              </p>
              <a
                href={srv.link}
                className="text-sm font-semibold text-yellow-500 hover:underline flex items-center gap-2"
              >
                Klik Disini <span className="text-lg">➜</span>
              </a>
            </div>
          ))} 
        </div>
      </div>
    </section>
  );
}
