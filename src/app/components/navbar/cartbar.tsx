"use client";

import { RootState } from "@/stores";
import Link from "next/link";
import { FaBars, FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";

interface NavbarProps {
  onToggleSidebar: () => void;
}

export default function Navbar({ onToggleSidebar }: NavbarProps) {
  const cartCount = useSelector((state: RootState) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0)
  );

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between bg-gray-800 text-white px-6 py-4 shadow">
      {/* Hamburger */}
      <button
        onClick={onToggleSidebar}
        className="cursor-pointer hover:text-blue-400 transition"
      >
        <FaBars size={20} />
      </button>

      {/* Title */}
      <h1 className="font-bold text-lg">Yushan Store</h1>

      {/* Cart */}
      <Link
        href="/cart"
        className="flex justify-between items-center cursor-pointer hover:text-blue-400 transition"
      >
        <FaShoppingCart size={22} />

        {cartCount >= 0 && (
          <span className="text-lg px-2 py-0.5 rounded-full">
            {cartCount}
          </span>
        )}
      </Link>
    </header>
  );
}
