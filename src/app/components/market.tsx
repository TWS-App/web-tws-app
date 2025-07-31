"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const items = [
  {
    title: "Music Art Super Item",
    category: "Music Art",
    image: "/images/market-01.jpg",
    bid: "2.03 ETH",
    usd: "$8,240.50",
    ends: "4D 08H 15M 42S",
    endsDate: "July 24th, 2022",
  },
  {
    title: "Digital Crypto Artwork",
    category: "Digital Art",
    image: "/images/market-01.jpg",
    bid: "2.03 ETH",
    usd: "$7,200.50",
    ends: "2D 06H 30M 25S",
    endsDate: "July 26th, 2022",
  },
  {
    title: "Blockchain Item One",
    category: "Blockchain",
    image: "/images/market-01.jpg",
    bid: "3.64 ETH",
    usd: "$6,600.00",
    ends: "6D 05H 40M 50S",
    endsDate: "July 28th, 2022",
  },
  {
    title: "Virtual Currency Art",
    category: "Virtual",
    image: "/images/market-01.jpg",
    bid: "2.44 ETH",
    usd: "$8,800.50",
    ends: "3D 05H 20M 58S",
    endsDate: "July 14th, 2022",
  },
];

const filters = [
  "All Items",
  "Music Art",
  "Digital Art",
  "Blockchain",
  "Virtual",
];

const MarketSection = () => {
  const [activeFilter, setActiveFilter] = useState("All Items");

  const filteredItems =
    activeFilter === "All Items"
      ? items
      : items.filter((item) => item.category === activeFilter);

  return (
    <section className="bg-gradient-to-b from-[#0e0b1d] to-[#1b1b2f] py-16 text-white w-full">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <div>
            <div className="w-12 h-1 bg-indigo-500 mb-4 rounded-full"></div>
            <h2 className="text-3xl font-bold">
              <em className="text-indigo-500 not-italic">Items</em> Currently In
              The Market.
            </h2>
          </div>

          {/* Filter (Static placeholder) */}
          <div className="mt-6 md:mt-0">
            <ul className="flex flex-wrap gap-4 text-sm">
              {filters.map((filter) => (
                <li
                  key={filter}
                  className={`cursor-pointer ${
                    activeFilter === filter
                      ? "text-indigo-400 font-semibold"
                      : "text-white hover:text-indigo-400"
                  }`}
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Market Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredItems.map((item, index) => (
            <div
              key={index}
              className="bg-[#1f1f3a] rounded-xl shadow p-4 flex gap-4 hover:shadow-lg transition"
            >
              {/* Left Image */}
              <div className="w-40 min-w-[160px] relative rounded-lg overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={195}
                  height={195}
                  className="object-cover rounded-lg"
                />
              </div>

              {/* Right Content */}
              <div className="flex-1">
                <h4 className="text-lg font-semibold mb-2 text-white">
                  {item.title}
                </h4>
                <div className="flex items-center gap-3 mb-3">
                  <Image
                    src="/images/author.jpg"
                    alt="Author"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div>
                    <h6 className="text-sm font-medium text-white">
                      Liberty Artist
                    </h6>
                    <a href="#" className="text-xs text-indigo-400">
                      @libertyart
                    </a>
                  </div>
                </div>

                <div className="border-t border-gray-600 my-3"></div>

                <div className="flex justify-between text-sm">
                  <div>
                    <p className="text-gray-400">Current Bid</p>
                    <p className="font-semibold text-white">{item.bid}</p>
                    <p className="text-xs text-gray-500">{item.usd}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Ends In</p>
                    <p className="font-semibold text-white">{item.ends}</p>
                    <p className="text-xs text-gray-500">{item.endsDate}</p>
                  </div>
                </div>

                <div className="mt-4">
                  <Link
                    href="/details"
                    className="text-indigo-400 hover:text-indigo-300 text-sm font-medium"
                  >
                    View Item Details &rarr;
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MarketSection;
