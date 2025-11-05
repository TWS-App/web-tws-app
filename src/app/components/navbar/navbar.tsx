"use client";

// Reacts
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

// Context
import { useTheme } from "@/context/themes/ThemeContext";

// ICONS
import { BiBell, BiSearch } from "react-icons/bi";
import { FaCog, FaSignOutAlt } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { FiMoon, FiSun } from "react-icons/fi";

// CODE
export default function Navbar() {
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();

  // STATE
  const [dark, setDark] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  // close menu kalau klik di luar
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn"); // flag dummy login kita hapus
    setShowLogoutModal(false);
    router.push("/login"); // redirect ke login
  };

  return (
    <header className="flex items-center h-16 justify-between bg-gray-800 text-white px-6 shadow transition-all duration-300">
      <div className="hidden lg:flex items-center rounded px-3 py-2 w-1/3 sm:w-1/2 md:w-1/3">
        <BiSearch size={18} className="text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Search..."
          className="border border-gray-500 rounded-full py-3 px-6 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Tombol search (tampil hanya di mobile) 
      <button className="lg:hidden p-2 rounded-full hover:bg-gray-700 transition cursor-pointer">
        <BiSearch size={20} />
      </button>
      */}

      <div className="flex items-center gap-4 ml-auto">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-gray-700 transition cursor-pointer"
        >
          {theme === "dark" ? <FiSun size={20} /> : <FiMoon size={20} />}
        </button>
        <button className="p-2 rounded-full hover:bg-gray-700 transition cursor-pointer">
          <BiBell size={20} />
        </button>

        <button
          className="cursor-pointer"
          onClick={() => setOpenMenu(!openMenu)}
        >
          <img
            src="https://i.pravatar.cc/40"
            alt="User"
            className="w-9 h-9 rounded-full border-2 border-gray-600 hover:border-blue-500 transition cursor-pointer"
          />
        </button>
      </div>

      {openMenu && (
        <div className="absolute right-0 top-14 bg-gray-900 text-white rounded-lg shadow-lg w-48 py-2 z-50">
          <a
            href="#"
            className="flex items-center px-4 py-2 hover:bg-gray-700 cursor-pointer"
          >
            <FaUser className="mr-2" /> Profile
          </a>
          <a
            href="#"
            className="flex items-center px-4 py-2 hover:bg-gray-700 cursor-pointer"
          >
            <FaCog className="mr-2" /> Settings
          </a>
          <button
            onClick={() => setShowLogoutModal(true)}
            className="flex w-full items-center px-4 py-2 hover:bg-gray-700 cursor-pointer text-left"
          >
            <FaSignOutAlt className="mr-2" /> Log out
          </button>
        </div>
      )}

      {showLogoutModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white opacity-100 rounded-lg shadow-lg p-6 w-96 text-center">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Are you sure you want to log out?
            </h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition cursor-pointer"
              >
                Log out
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
