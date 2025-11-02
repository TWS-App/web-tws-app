"use client";

// REACT
import Link from "next/link";
import { RootState } from "@/stores";
import { useSelector } from "react-redux";

// Antd Components
import { Image } from "antd";
import { FaBars, FaShoppingCart } from "react-icons/fa";

// Interface
interface NavbarProps {
  onToggleSidebar: () => void;
}

// CODE
export default function Navbar({ onToggleSidebar }: NavbarProps) {
  // STATE
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
      <Link href="/" className="flex justify-center self-center-safe cursor-pointer">
        <Image
          src="/images/assets/MainLogo.png"
          alt="Logo"
          preview={false}
          width={30}
          height={30}
        />
        <h1 className="font-bold text-lg">Yhusan Store</h1>
      </Link>

      {/* Cart */}
      <Link
        href="/cart"
        className="flex justify-between items-center cursor-pointer hover:text-blue-400 transition"
      >
        <FaShoppingCart size={22} />

        {cartCount >= 0 && (
          <span className="text-lg px-2 py-0.5 rounded-full">{cartCount}</span>
        )}
      </Link>
    </header>
  );
}
