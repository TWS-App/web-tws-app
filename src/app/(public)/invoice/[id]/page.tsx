"use client";

// REACTS
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/stores";

// Antd Components
import { BiHome, BiPrinter } from "react-icons/bi";

// Service
import { orderDetailsService } from "@/api/services/orders/serviceDetails";
import {
  OrderHeader,
  orderHeaderService,
} from "@/api/services/orders/serviceHeader";

// Utils
import { formatPrice } from "@/utils/function/price";

export default function InvoicePage() {
  // ID
  const { id } = useParams();
  const cart = useSelector((state: RootState) => state.cart.items);

  // STATE
  const [checkoutData, setCheckoutData] = useState<any>(null);

  const [data, setData] = useState<OrderHeader>();
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(false);

  // Use Effects
  useEffect(() => {
    // Ambil data checkout dari sessionStorage
    const savedData = sessionStorage.getItem("checkoutData");
    if (savedData) setCheckoutData(JSON.parse(savedData));
  }, []);

  useEffect(() => {
    if (id) {
      fetchData(id);
    }
  }, [id]);

  // Fetch Data
  const fetchData = async (value: any) => {
    setLoading(true);
    try {
      const res = await orderHeaderService.getById(value);

      console.log("Res: ", res);
      setData(res);

      if (res.id) {
        try {
          const result = await orderDetailsService.getAll();

          const filter = result.filter((items: any) => {
            return items.header_id == res.id;
          });

          setDetails(filter);
        } catch (error) {
          //
        }
      }
    } catch (error) {
      //
    } finally {
      setLoading(false);
    }
  };

  if (loading)
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
          <p>{data?.email || " - "}</p>
          <p>{data?.customer_name}</p>
          <p>{data?.address}</p>

          <p>Payment: {data?.payment_type || " - "}</p>
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
            {details.map((item: any, index: number) => (
              <tr key={index} className="border-b border-gray-200">
                <td className="py-2">
                  {item.name} / {item.colors}
                </td>
                <td className="py-2 text-center">{item.qty}</td>
                <td className="py-2 text-right">{formatPrice(item.price)}</td>
                <td className="py-2 text-right">{formatPrice(item.total)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Summary */}
        <div className="text-right mt-6">
          <p className="font-semibold">
            Subtotal: Rp {formatPrice(Number(data?.total_harga))}
          </p>
          <p className="font-bold text-lg mt-2">
            Total: Rp {formatPrice(Number(data?.total_harga))}
          </p>
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-center gap-4 mt-10 print:hidden">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold cursor-pointer"
          >
            <BiPrinter size={20} /> Print Invoice
          </button>

          <button
            onClick={() => (window.location.href = "/")}
            className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold cursor-pointer"
          >
            <BiHome size={20} /> Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
