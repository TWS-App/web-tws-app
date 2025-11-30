"use client";

// REACT COMPONENTS
import { ThemeProvider } from "@/context/themes/ThemeContext";
import { useEffect, useState } from "react";

// Page Components
import Sidebar from "@/app/components/sidebar/sidebar";
import Navbar from "@/app/components/navbar/navbar";

// CODE
export default function OrderClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <ThemeProvider>
        <Sidebar />

        <div className="flex-1 flex flex-col">
          <Navbar />
          <main className="flex-1 p-6">{children}</main>
        </div>
      </ThemeProvider>
    </div>
  );
}
