"use client";

// Reacts
import { useState } from "react";
import Link from "next/link";

// Icons Components
import { AiOutlineProduct } from "react-icons/ai";
import { FaClipboard, FaGear } from "react-icons/fa6";
import { IoBagCheck, IoBarChart, IoHome } from "react-icons/io5";
import { FiChevronDown, FiChevronRight, FiShoppingBag } from "react-icons/fi";
import { RiExchangeDollarLine } from "react-icons/ri";
import { FaSyncAlt, FaTools } from "react-icons/fa";
import { BsBagXFill, BsLayersFill } from "react-icons/bs";
import { GiCancel } from "react-icons/gi";
import { TiThMenuOutline } from "react-icons/ti";
import { PiXCircleFill } from "react-icons/pi";

// Menu Items
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

// CODE
export default function Sidebar() {
  // STATE
  const [isOpen, setIsOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const toggleMenu = (name: string) => {
    setOpenMenu(openMenu === name ? null : name);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-39 p-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition"
      >
        {!isOpen ? (
          <TiThMenuOutline
            size={24}
            className="text-white hover:text-cyan-300 transform transition-transform duration-300 cursor-pointer"
          />
        ) : null}
      </button>
      <aside
        // className="bg-gray-900 text-gray-100 w-64 min-h-screen flex flex-col"
        className={`
        fixed lg:static inset-y-0 left-0 z-40
        w-64 bg-gray-900 text-gray-100 flex flex-col min-h-screen
        transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0
      `}
      >
        {/* Header */}
        <div className="flex justify-between p-6 font-bold text-lg">
          My Admin
          <PiXCircleFill
            size={24}
            onClick={() => setIsOpen(!isOpen)}
            className={
              isOpen
                ? "text-white hover:text-cyan-300 transform transition-transform duration-300 cursor-pointer"
                : "hidden"
            }
          />
        </div>

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
      </aside>{" "}
    </>
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
