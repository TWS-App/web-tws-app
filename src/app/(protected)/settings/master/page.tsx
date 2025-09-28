"use client";

import Breadcrumb from "@/app/components/breadcrumb/breadcrumb";

import Link from "next/link";
import { FaBox, FaTags } from "react-icons/fa";
import { BsLayersFill } from "react-icons/bs";

const masterItems = [
  {
    name: "Product Categories",
    href: "/category-product",
    icon: <FaBox size={22} />,
  },
  {
    name: "Service Categories",
    href: "/category-service",
    icon: <FaTags size={22} />,
  },
];

export default function DashboardPage() {
  return (
    <section className="p-6">
      <Breadcrumb items={["Settings", "Master Data"]} />

      <h1 className="text-2xl flex items-center gap-3 font-semibold border rounded-lg  p-6 mb-6 text-gray-800 dark:text-gray-100 dark:bg-gray-800">
        <div className="text-blue-500 dark:text-blue-500 ">
          <BsLayersFill />
        </div>
        <span className="font-medium text-gray-700 dark:text-gray-200">
          MASTER DATA
        </span>
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {masterItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="flex items-center gap-3 border rounded-lg p-4 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md hover:bg-blue-400 hover:border-amber-400 transition cursor-pointer hover:scale-105"
          >
            <div className="text-blue-500 dark:text-white ">{item.icon}</div>
            <span className="font-medium text-gray-700 dark:text-gray-200">
              {item.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
