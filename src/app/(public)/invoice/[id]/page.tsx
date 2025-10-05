"use client";

import { useRouter, useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/stores";
import { useEffect, useState } from "react";
import { formatPrice } from "@/utils/function/price";
import { BiHome, BiPrinter } from "react-icons/bi";

export default function InvoicePage() {
  const { id } = useParams(); // misal: INV20251005-001
  const cart = useSelector((state: RootState) => state.cart.items);
  const [checkoutData, setCheckoutData] = useState<any>(null);

  useEffect(() => {
    // Ambil data checkout dari sessionStorage
    const savedData = sessionStorage.getItem("checkoutData");
    if (savedData) setCheckoutData(JSON.parse(savedData));
  }, []);

  if (!checkoutData)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        Loading Invoice...
      </div>
    );

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="bg-white text-black min-h-screen py-10 px-20">
      <div className="max-w-4xl mx-auto border border-gray-300 p-10 rounded-lg shadow-md">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Yusan Store</h1>
          <div className="text-right">
            <p className="text-lg font-semibold">Invoice #{id}</p>
            <p className="text-gray-500">
              {new Date().toLocaleDateString("id-ID")}
            </p>
          </div>
        </div>

        {/* Buyer Info */}
        <div className="mb-6">
          <h2 className="font-semibold mb-2">Buyer Information</h2>
          <p>{checkoutData.email}</p>
          <p>{checkoutData.fullname}</p>
          <p>{checkoutData.address}</p>

          <p>Payment: {checkoutData.payment}</p>
        </div>

        {/* Divider */}
        <hr className="border-gray-300 my-6" />

        {/* Product Table */}
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-300">
              <th className="py-2">Product</th>
              <th className="py-2 text-center">Qty</th>
              <th className="py-2 text-right">Price</th>
              <th className="py-2 text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, index) => (
              <tr key={index} className="border-b border-gray-200">
                <td className="py-2">
                  {item.name} / {item.variant}
                </td>
                <td className="py-2 text-center">{item.quantity}</td>
                <td className="py-2 text-right">{formatPrice(item.price)}</td>
                <td className="py-2 text-right">
                  {formatPrice(item.price * item.quantity)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Summary */}
        <div className="text-right mt-6">
          <p className="font-semibold">Subtotal: Rp {formatPrice(subtotal)}</p>
          <p className="font-bold text-lg mt-2">
            Total: Rp {formatPrice(subtotal)}
          </p>
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-center gap-4 mt-10 print:hidden">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold cursor-pointer"
          >
            <BiPrinter />  Print Invoice
          </button>

          <button
            onClick={() => (window.location.href = "/")}
            className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold cursor-pointer"
          >
            <BiHome /> Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
