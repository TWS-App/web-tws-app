"use client";

// REACTS
import { useEffect, useState } from "react";

// Page Components
import Navbar from "@/app/components/navbar/cartbar";
import Sidebar from "@/app/components/sidebar";

// CODE
export default function ServicesClientLayout({
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
