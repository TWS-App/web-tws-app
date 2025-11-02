"use client";

// REACTS
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

// ANTD Components
import { FiMenu, FiX, FiXCircle } from "react-icons/fi";
import {
  FaCogs,
  FaComments,
  FaHome,
  FaMapMarkerAlt,
  FaQuestionCircle,
  FaTools,
  FaWhatsapp,
} from "react-icons/fa";
import { PiMapPinAreaFill } from "react-icons/pi";

// Menus
const menu = [
  { icon: <FaHome />, label: "HOME", href: "/" },
  { icon: <FaCogs />, label: "PRODUCT", href: "/products" },
  { icon: <FaTools />, label: "SERVICES TWS", href: "/services" },
  // { icon: <FaQuestionCircle />, label: "Tutorial Pairing", href: "/tutorial" },
  { icon: <FaWhatsapp />, label: "CONTACT", href: "/contact" },
  { icon: <PiMapPinAreaFill />, label: "LOCATION", href: "/location" },
];

// CODE
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // USE EFFECTS
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Toogle Menu
  const toggleMenu = () => {
    setOpen(!open);
  };

  return (
    <header
      className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ${
        scrolled
          ? "-top-0 w-full bg-[#03a9f4] shadow rounded-none px-6"
          : "bg-[#03a9f4] backdrop-blur-xl shadow-lg rounded-full w-[90%] px-8"
      }`}
    >
      <nav className="hidden md:flex gap-8 text-sm items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex justify-center items-center gap-3">
          <Image
            src="/images/assets/MainLogo.png"
            alt="Logo"
            width={50}
            height={40}
          />

          <p className="text-[clamp(0.9rem,2vw,1.3rem)] max-w-md mx-auto md:mx-0">
            YHUSAN DIGITAL
          </p>
        </Link>

        {/* Menu */}
        {/* <ul className="hidden md:flex gap-6 text-sm font-medium text-gray-700">
          <li>
            <Link
              href="/"
              className="text-blue-600 hover:text-purple-600 transition-colors duration-200"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/products"
              className="text-blue-600 hover:text-purple-600 transition-colors duration-200"
            >
              Product
            </Link>
          </li>
          <li>
            <Link
              href="/services"
              className="text-blue-600 hover:text-purple-600 transition-colors duration-200"
            >
              Services
            </Link>
          </li>
          <li>
            <Link
              href="/collaborations"
              className="text-blue-600 hover:text-purple-600 transition-colors duration-200"
            >
              Collaborations
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="text-blue-600 hover:text-purple-600 transition-colors duration-200"
            >
              About
            </Link>
          </li>
        </ul> */}
        <ul className="hidden md:flex items-center gap-6 text-sm font-medium">
          {menu.map((item, index) => (
            <li key={index}>
              <a
                href={item.href}
                className="flex items-center gap-2 px-3 py-2 hover:bg-yellow-400 rounded-full transition hover:scale-105 cursor-pointer"
              >
                {item.icon}
                <span>{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <button
        onClick={toggleMenu}
        className="md:hidden text-2xl text-white self-center"
        aria-label="Toggle Menu"
      >
        <FiMenu
          style={{
            cursor: "pointer",
          }}
        />
      </button>

      {open && (
        <div
          className="text-xl hover:text-red-500 transition-colors duration-200"
          onClick={() => setOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 z-50 bg-white text-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out md:hidden
          ${!scrolled ? "hidden" : ""}
          ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between bg-amber-50 px-4 py-4 border-b">
          <span className="text-xl font-bold text-primary ">Menu</span>
          <button
            onClick={() => setOpen(false)}
            className="text-xl text-red-600 hover:text-red-300 transition-colors duration-200"
          >
            <FiXCircle
              style={{
                cursor: "pointer",
              }}
            />
          </button>
        </div>

        <nav className="flex flex-col p-4 h-[100rem] text-blue-500 bg-amber-50 font-medium space-y-4">
          <Link
            href="#"
            className="text-custom-blue hover:text-purple-600 transition-colors duration-200"
          >
            Home
          </Link>
          <Link
            href="/products"
            className="text-custom-blue hover:text-purple-600 transition-colors duration-200"
          >
            Product
          </Link>
          <Link
            href="/services"
            className="text-custom-blue hover:text-purple-600 transition-colors duration-200"
          >
            Services
          </Link>
          <Link
            href="#"
            className="text-custom-blue hover:text-purple-600 transition-colors duration-200"
          >
            Location
          </Link>
          <Link
            href="#"
            className="text-custom-blue hover:text-purple-600 transition-colors duration-200"
          >
            About
          </Link>
        </nav>
      </aside>
    </header>
  );
}

// <nav className="w-full bg-[#1e40af] text-white shadow-md py-3">
//   <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8">
//     {/* Logo */}
//     <div className="flex items-center gap-2">
//       <Image
//         src="/logo-yhusan.png"
//         alt="Yhusan Digital"
//         width={160}
//         height={40}
//         priority
//       />
//     </div>

//     {/* Menu */}

//     {/* Mobile menu (hamburger) */}
//     <div className="md:hidden">
//       <button className="p-2 rounded-md hover:bg-blue-700 transition">
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           viewBox="0 0 24 24"
//           strokeWidth={1.5}
//           stroke="currentColor"
//           className="w-6 h-6"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             d="M3.75 5.25h16.5M3.75 12h16.5m-16.5 6.75h16.5"
//           />
//         </svg>
//       </button>
//     </div>
//   </div>
// </nav>
