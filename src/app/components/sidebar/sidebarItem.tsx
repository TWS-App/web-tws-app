"use client";

import { useState } from "react";
import Link from "next/link";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";

type MenuItem = {
  label: string;
  icon?: React.ReactNode;
  href?: string;
  children?: MenuItem[];
};

export default function SidebarItem({ item }: { item: MenuItem }) {
  const [open, setOpen] = useState(false);

  if (item.children) {
    return (
      <div>
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center justify-between w-full px-3 py-2 rounded-lg hover:bg-gray-700 transition cursor-pointer"
        >
          <div className="flex items-center gap-2">
            {item.icon && <span>{item.icon}</span>}
            <span>{item.label}</span>
          </div>
          {open ? <FiChevronDown /> : <FiChevronRight />}
        </button>

        {open && (
          <div className="ml-6 mt-1 space-y-1">
            {item.children.map((child, idx) => (
              <Link
                key={idx}
                href={child.href || "#"}
                className="block px-3 py-1.5 rounded-lg text-sm text-gray-300 hover:bg-gray-700 hover:text-white cursor-pointer transition"
              >
                {child.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      href={item.href || "#"}
      className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-700 transition cursor-pointer"
    >
      {item.icon && <span>{item.icon}</span>}
      <span>{item.label}</span>
    </Link>
  );
}
