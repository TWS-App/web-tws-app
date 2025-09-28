"use client";

import Link from "next/link";
import { AiOutlineProduct } from "react-icons/ai";
import { FaClipboard, FaGear } from "react-icons/fa6";
import { IoBagCheck, IoBarChart, IoHome } from "react-icons/io5";
import { useState } from "react";
import { FiChevronDown, FiChevronRight, FiShoppingBag } from "react-icons/fi";
import { RiExchangeDollarLine } from "react-icons/ri";
import { FaSyncAlt, FaTools } from "react-icons/fa";
import { BsBagXFill, BsLayersFill } from "react-icons/bs";
import { GiCancel } from "react-icons/gi";

const menuItems = [
  { name: "Dashboard", icon: <IoHome size={20} />, href: "/dashboard" },
  {
    name: "Items",
    icon: <AiOutlineProduct size={20} />,
    href: "/items",
    children: [
      { href: "/items/products", name: "Products", icon: <FiShoppingBag /> },
      { href: "/items/services", name: "Services", icon: <FaTools /> },
    ],
  },
  {
    name: "Orders",
    icon: <RiExchangeDollarLine size={20} />,
    href: "/orders",
    children: [
      { href: "/orders/ongoing", name: "Ongoing", icon: <FaSyncAlt /> },
      { href: "/orders/finished", name: "Finished", icon: <IoBagCheck /> },
      { href: "/orders/cancelled", name: "Cancelled", icon: <GiCancel /> },
    ],
  },
  {
    name: "Reports",
    icon: <FaClipboard size={20} />,
    href: "/reports",
  },
  {
    name: "Analytics",
    icon: <IoBarChart size={20} />,
    href: "/analytics",
  },
  {
    name: "Settings",
    icon: <FaGear size={20} />,
    href: "/settings",
    children: [
      { href: "/settings/master", name: "Master Data", icon: <BsLayersFill /> },
    ],
  },
];

export default function Sidebar() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const toggleMenu = (name: string) => {
    setOpenMenu(openMenu === name ? null : name);
  };

  return (
    <aside className="bg-gray-900 text-gray-100 w-64 min-h-screen flex flex-col">
      {/* Header */}
      <div className="p-6 font-bold text-lg">My Admin</div>

      <nav className="flex-1">
        <ul>
          {menuItems.map((item) => (
            <li key={item.name}>
              {item.children ? (
                <>
                  <button
                    onClick={() => toggleMenu(item.name)}
                    className="flex items-center justify-between w-full px-6 py-3 text-white hover:bg-blue-400 rounded-2xl transition-all duration-200 cursor-pointer transform hover:scale-105"
                  >
                    <div className="flex items-center gap-3">
                      {item.icon}
                      <span>{item.name}</span>
                    </div>

                    {openMenu === item.name ? (
                      <FiChevronDown />
                    ) : (
                      <FiChevronRight />
                    )}
                  </button>

                  {openMenu === item.name && (
                    <ul className="ml-12 mt-1 space-y-1">
                      {item.children.map((child: any) => (
                        <li key={child.name}>
                          <Link
                            href={child.href}
                            className="block px-3 py-2 text-sm text-white hover:bg-blue-400 rounded-2xl transition-all duration-200 cursor-pointer transform hover:scale-105"
                          >
                            <div className="flex items-center gap-3">
                              {child.icon}
                              <span>{child.name}</span>
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <Link
                  href={item.href!}
                  className="flex items-center gap-3 px-6 py-3 text-white hover:bg-blue-400 rounded-2xl transition-all duration-200 cursor-pointer transform hover:scale-105"
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-6 text-sm text-gray-400">© 2025 Yusan Stores</div>
    </aside>
  );

  // return (
  //   <aside className="bg-gray-900 text-gray-100 w-64 min-h-screen flex flex-col">
  //     <div className="p-6 font-bold text-lg">My Admin</div>
  //     <nav className="flex-1">
  //       <ul>
  //         {menuItems.map((item) => (
  //           <li key={item.name}>
  //             <Link
  //               href={item.href}
  //               className="flex items-center gap-3 px-6 py-3 hover:bg-gray-800 transition"
  //             >
  //               {item.icon}
  //               <span>{item.name}</span>
  //             </Link>
  //           </li>
  //         ))}
  //       </ul>
  //     </nav>
  //     <div className="p-6 text-sm text-gray-400">© 2025 Yusan Stores</div>
  //   </aside>
  // );
}
