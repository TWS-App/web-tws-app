"use client";

// REACTS Components
import { useEffect, useState } from "react";

// Page Components
import Navbar from "@/app/components/navbar/navbar-home";

// CODE
export default function ProductsClientLayout({
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
      {/* 
      <Sidebar open={open} setOpen={setOpen} />

      */}
      <div className="flex-1 flex flex-col">
        <Navbar />

        <main>{children}</main>
      </div>
    </div>
  );
}
