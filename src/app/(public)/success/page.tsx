"use client";

// REACTS
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

// Antd Components
import { Spin } from "antd";
import { BiCheckCircle } from "react-icons/bi";
import { IoHome } from "react-icons/io5";
import { RiPrinterFill } from "react-icons/ri";

// Services
import { orderHeaderService } from "@/api/services/orders/serviceHeader";

// CODE
export default function SuccessPage() {
  // STATE
  const router = useRouter();
  const params = useSearchParams();
  const orderId = params.get("orderId");

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  console.log(orderId);

  // Handle Print
  const handlePrint = () => {
    router.push(`/invoice/${orderId}`);
  };

  // Use effects
  useEffect(() => {
    if (orderId) {
      fetchData(orderId);
    }
  }, [orderId]);

  // Fetch Data
  const fetchData = async (value: any) => {
    setLoading(true);

    try {
      const res = await orderHeaderService.getById(value);

      console.log("Res: ", res);
      setData(res);
    } catch (error) {
      setData(null);
      //
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 750);
    }
  };

  if (loading) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-gray-900/40 backdrop-blur-sm rounded-lg">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white px-6">
      <div className="flex flex-col justify-center items-center m-auto p-4 bg-white w-3/4 h-full rounded-2xl">
        {/* Animated success icon */}
        <div
          className="text-green-500"
          // initial={{ scale: 0 }}
          // animate={{ scale: 1 }}
          // transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
        >
          <BiCheckCircle className="text-green-500 w-24 h-24 mb-6" />
        </div>

        {/* Success message */}
        <h1
          // initial={{ opacity: 0, y: 20 }}
          // animate={{ opacity: 1, y: 0 }}
          // transition={{ delay: 0.2 }}
          className="text-3xl font-bold mb-2 text-green-500"
        >
          Transaction Successful!
        </h1>

        <p
          // initial={{ opacity: 0, y: 20 }}
          // animate={{ opacity: 1, y: 0 }}
          // transition={{ delay: 0.4 }}
          className="text-gray-800 mb-8 text-center max-w-md"
        >
          Thank you for your purchase! Your order with ID ={" "}
          {data?.order_number || "#######"} is created and will be processed
          immediately after we have confirm your payment.
        </p>

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            onClick={handlePrint}
            className="flex justify-center align-baseline bg-green-600 hover:bg-green-500 px-6 py-3 gap-3 rounded-lg font-semibold transition cursor-pointer"
          >
            <RiPrinterFill size={24} /> Print Invoice
          </button>

          <button
            onClick={() => router.push("/")}
            className="flex justify-center align-baseline bg-blue-600 hover:bg-blue-500 px-6 py-3 gap-3 rounded-lg font-semibold transition cursor-pointer"
          >
            <IoHome size={20} /> Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
