"use client";

import { useState } from "react";
import { FaSearch, FaStar } from "react-icons/fa";
import { MdStar } from "react-icons/md";

export default function SparepartTWS() {
  const [query, setQuery] = useState("");

  const spareparts = [
    {
      id: 1,
      name: "SPAREPART TWS SOUNDCORE",
      description: "Case replacement untuk Soundcore R50i",
      rating: 5,
      price: "Rp 95.000",
      image: "/images/soundcore_02.png",
    },
    {
      id: 2,
      name: "SPAREPART TWS SOUNDCORE",
      description: "Charging dock untuk Soundcore Liberty",
      rating: 4,
      price: "Rp 120.000",
      image: "/images/soundcore_02.png",
    },
    {
      id: 3,
      name: "SPAREPART TWS SOUNDCORE",
      description: "Earpiece kanan replacement",
      rating: 5,
      price: "Rp 75.000",
      image: "/images/soundcore_02.png",
    },
    {
      id: 4,
      name: "SPAREPART TWS SOUNDCORE",
      description: "Earpiece kiri replacement",
      rating: 5,
      price: "Rp 75.000",
      image: "/images/soundcore_02.png",
    },
    {
      id: 5,
      name: "SPAREPART TWS SOUNDCORE",
      description: "Case dan earpiece komplit",
      rating: 5,
      price: "Rp 160.000",
      image: "/images/soundcore_02.png",
    },
  ];

  const filtered = spareparts.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <section className="w-full py-16 bg-blue-100">
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Title */}
        <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-700 mb-6">
          SPAREPART TWS
        </h2>

        {/* Search bar */}
        <div className="flex justify-center mb-4">
          <div className="relative w-full max-w-lg">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari Sparepart TWS disini..."
              className="w-full border border-gray-500 rounded-full py-3 px-6 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
            />
            <FaSearch className="absolute right-4 top-3.5 text-gray-500" />
          </div>
        </div>

        {/* Keyword info */}
        <p className="text-sm text-gray-700 mt-2">
          Contoh Keyword = “Merk + Type + Part Bagian + Warna”
        </p>
        <p className="text-md font-semibold text-gray-900 mt-1">
          Soundcore R50i Kiri Hitam
        </p>

        {/* Product Cards */}
        {/* <div className="flex justify-center items-center bg-blue-900 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-10 rounded"> */}
        <div className="bg-[#1E3A8A] rounded-2xl py-10 px-6 text-center">
          <h2 className="text-shadow-2xs text-3xl sm:text-4xl font-extrabold text-white mb-6">
            PART PENGGANTI YANG
          </h2>
          <h2 className="text-shadow-2xs text-3xl sm:text-4xl font-extrabold text-white mb-6">
            RUSAK ATAU HILANG
          </h2>

          <div className="grid grid-cols-5 justify-center gap-5">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="p-3 bg-blue-500 text-white rounded-2xl shadow-lg overflow-hidden flex flex-col items-center justify-between hover:scale-105 transition-transform duration-300  cursor-pointer"
              >
                <div className="p-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 mx-auto object-contain mb-4"
                  />
                  <h3 className="font-bold text-sm mb-2">{item.name}</h3>
                  <p className="text-xs text-blue-100 mb-3">
                    {item.description}
                  </p>
                  <p className="font-semibold text-lg mb-2">{item.price}</p>
                </div>

                <div className="flex justify-center items-center gap-0.5 mb-2">
                  Rating {item.rating || 0}/5
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={`${
                        i < item.rating
                          ? "text-yellow-400"
                          : "text-gray-300 opacity-70"
                      } text-xs`}
                    />
                  ))}
                </div>

                <button className=" bg-yellow-400 text-white hover:text-gray-200 font-semibold max-w-full min-w-full py-2 rounded hover:bg-yellow-500 transition cursor-pointer">
                  BELI PART
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
