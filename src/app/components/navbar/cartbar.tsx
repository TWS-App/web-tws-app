"use client";
import { useCartStore } from "@/stores/cart/cart";
import Link from "next/link";
import { FaBars, FaShoppingCart } from "react-icons/fa";

interface NavbarProps {
  onToggleSidebar: () => void;
}

export default function Navbar({ onToggleSidebar }: NavbarProps) {
  const { items } = useCartStore();
  const totalQty = items.reduce((sum: any, i: any) => sum + i.qty, 0);

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
        href="/order"
        className="relative cursor-pointer hover:text-blue-400 transition"
      >
        <FaShoppingCart size={22} />
        {totalQty > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-xs px-2 py-0.5 rounded-full">
            {totalQty}
          </span>
        )}
      </Link>
    </header>
  );
}
