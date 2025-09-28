"use client";

import Navbar from "@/app/components/navbar/cartbar";
import Sidebar from "@/app/components/sidebar";

import { useEffect, useState } from "react";

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    console.log(open);
  }, [open]);

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <Sidebar open={open} setOpen={setOpen} />

      {/* Konten utama */}
      <div className="flex-1 flex flex-col">
        <Navbar onToggleSidebar={() => setOpen(!open)} />

        <main>{children}</main>
      </div>
    </div>
  );
}
