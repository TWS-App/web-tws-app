"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setOpen(!open);
  };

  return (
    <header
      className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ${
        scrolled
          ? "-top-0 w-full bg-white shadow rounded-none px-6"
          : "bg-white/90 backdrop-blur-xl shadow-lg rounded-full w-[90%] px-8"
      }`}
    >
      <nav className="hidden md:flex gap-8 text-sm items-center justify-between h-16">
        {/* Logo */}
        <Link href="/">
          <Image src="/logo.jpeg" alt="Logo" width={50} height={40} />
        </Link>

        {/* Menu */}
        <ul className="hidden md:flex gap-6 text-sm font-medium text-gray-700">
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
        </ul>
      </nav>

      <button
        onClick={toggleMenu}
        className="md:hidden text-2xl text-gray-700 self-center"
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
            className="text-xl hover:text-red-500 transition-colors duration-200"
          >
            <FiX
              style={{
                cursor: "pointer",
              }}
            />
          </button>
        </div>
        <nav className="flex flex-col p-4 text-blue-500 bg-amber-50 font-medium space-y-4">
          <Link
            href="#"
            className="text-custom-blue hover:text-purple-600 transition-colors duration-200"
          >
            Home
          </Link>
          <Link
            href="#"
            className="text-custom-blue hover:text-purple-600 transition-colors duration-200"
          >
            Product
          </Link>
          <Link
            href="#"
            className="text-custom-blue hover:text-purple-600 transition-colors duration-200"
          >
            Services
          </Link>
          <Link
            href="#"
            className="text-custom-blue hover:text-purple-600 transition-colors duration-200"
          >
            Collaborations
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
};

export default Navbar;
