"use client";

import Link from "next/link";
import { AiOutlineProduct } from "react-icons/ai";
import { FaClipboard, FaGear } from "react-icons/fa6";
import { IoBarChart, IoHome } from "react-icons/io5";

const menuItems = [
  { name: "Dashboard", icon: <IoHome size={20} />, href: "/dashboard" },
  {
    name: "Items",
    icon: <AiOutlineProduct size={20} />,
    href: "/dashboard/items",
  },
  {
    name: "Reports",
    icon: <FaClipboard size={20} />,
    href: "/dashboard/reports",
  },
  {
    name: "Analytics",
    icon: <IoBarChart size={20} />,
    href: "/dashboard/analytics",
  },
  {
    name: "Settings",
    icon: <FaGear size={20} />,
    href: "/dashboard/settings",
  },
];

export default function Sidebar() {
  return (
    <aside className="bg-gray-900 text-gray-100 w-64 min-h-screen flex flex-col">
      <div className="p-6 font-bold text-lg">My Admin</div>
      <nav className="flex-1">
        <ul>
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className="flex items-center gap-3 px-6 py-3 hover:bg-gray-800 transition"
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-6 text-sm text-gray-400">© 2025 MyApp</div>
    </aside>
  );
}
