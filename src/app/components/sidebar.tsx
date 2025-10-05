"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { TiThMenu } from "react-icons/ti";
import { MdClose } from "react-icons/md";

export default function Sidebar({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (val: boolean) => void;
}) {
  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="p-4 text-gray-700 hover:text-blue-500 fixed top-4 left-4 z-50 cursor-pointer"
      >
        {open ? (<MdClose />) : (<TiThMenu />)}
      </button>

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black opacity-50 z-40 "
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-50 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 space-y-6">
          {/* <button
            onClick={() => setOpen(false)}
            className="p-8 top-4 right-4 text-gray-700 hover:text-blue-500 cursor-pointer"
          >
            <MdClose />
          </button> */}

          <nav className="flex flex-col space-y-4 mt-15">
            <Link href="/" className="text-black hover:text-blue-500">
              Home
            </Link>
            <Link href="/products" className="text-black hover:text-blue-500">
              Products
            </Link>
            <Link href="/services" className="text-black hover:text-blue-500">
              Services
            </Link>
            <Link href="/tracking" className="text-black hover:text-blue-500">
              Tracking Order
            </Link>
            <Link href="/contact" className="text-black hover:text-blue-500">
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
}
