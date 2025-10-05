"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { BiCheckCircle } from "react-icons/bi";

export default function SuccessPage() {
  const router = useRouter();
  const params = useSearchParams();
  const orderId = params.get("orderId");

  console.log(orderId)

  const handlePrint = () => {
    router.push(`/invoice/${orderId}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white px-6">
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
        className="text-3xl font-bold mb-2"
      >
        Transaction Successful!
      </h1>

      <p
        // initial={{ opacity: 0, y: 20 }}
        // animate={{ opacity: 1, y: 0 }}
        // transition={{ delay: 0.4 }}
        className="text-gray-400 mb-8 text-center max-w-md"
      >
        Thank you for your purchase! Your order with ID = {orderId || "ORD250900001"} is
        created and will be processed immediately.
      </p>

      {/* Buttons */}
      <div className="flex gap-4">
        <button
          onClick={handlePrint}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition cursor-pointer"
        >
          Print Invoice
        </button>

        <button
          onClick={() => router.push("/")}
          className="bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-lg font-semibold transition cursor-pointer"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
