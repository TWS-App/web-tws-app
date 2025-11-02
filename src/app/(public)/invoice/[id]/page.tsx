"use client";

// REACTS
import { useEffect, useRef, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";
import { RootState } from "@/stores";

// Antd Components
import { Image } from "antd";
import { BiHome, BiPrinter } from "react-icons/bi";

// Service
import { orderDetailsService } from "@/api/services/orders/serviceDetails";
import {
  OrderHeader,
  orderHeaderService,
} from "@/api/services/orders/serviceHeader";

// Utils
import { formatPrice } from "@/utils/function/price";
import { formatTime } from "@/utils/function/time";

// CODE
export default function InvoicePage() {
  // Use Ref
  const printRef = useRef<HTMLDivElement>(null);

  // ID
  const { id } = useParams();
  const cart = useSelector((state: RootState) => state.cart.items);

  // STATE
  const [checkoutData, setCheckoutData] = useState<any>(null);
  const [discount, setDiscount] = useState(0);

  const [data, setData] = useState<OrderHeader>();
  const [details, setDetails] = useState<[]>([]);
  const [loading, setLoading] = useState(false);

  // Use Effects
  useEffect(() => {
    if (details.length > 0) {
      handleDiscount(details);
    }
  }, [details]);

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

  // Handle Print
  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `Invoice #${data?.order_number || data?.id}`,
  });

  // Handle Discount
  const handleDiscount = (value: []) => {
    const discount: Record<number, any> = value.reduce(
      (init: any, current: any) => {
        init = current?.discount > 0 ? current.discount : 0;

        return init;
      },
      0
    );

    console.log("Discount: ", discount);
    setDiscount(Number(discount));
  };

  // Loading
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
      <div
        ref={printRef}
        className="max-w-4xl mx-auto border border-gray-300 p-10 rounded-lg shadow-md"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex justify-center gap-2">
            <Image
              src="/images/assets/MainLogo.png"
              alt="Logo"
              preview={false}
              width={30}
              height={30}
              style={{
                background: "#03a9f4",
              }}
            />
            <h1 className="text-3xl font-bold">Yhusan Store</h1>
          </div>

          <div className="text-right">
            <p className="text-lg font-semibold">
              Invoice #{data?.order_number || id}
            </p>
            <p className="text-gray-500">
              {formatTime(
                data?.order_date || new Date().toLocaleDateString("id-ID")
              )}
            </p>
          </div>
        </div>

        {/* Buyer Info */}
        <div className="mb-6">
          <h2 className="font-semibold mb-2">Buyer Information</h2>
          <p>{`Name: ${data?.customer_name}`}</p>
          <p>{`Email: ${data?.email || " - "}`}</p>
          <p>{`Address: ${data?.address}`}</p>

          <p>Payment: {data?.payment_name || " - "}</p>
        </div>

        {/* Divider */}
        <hr className="border-gray-300 my-6" />

        {/* Product Table */}
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-300">
              <th className="py-2">Product</th>
              <th className="py-2">Detail</th>
              <th className="py-2 text-center">Qty</th>
              <th className="py-2 text-right">Price</th>
              <th className="py-2 text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {details.map((item: any, index: number) => (
              <tr key={index} className="border-b border-gray-200">
                <td className="py-2">
                  {item?.product_name} / {item.colors}
                </td>
                <td className="py-2">
                  {item?.variants} {item.versions}
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
          <div className="flex justify-between text-black text-lg font-semibold">
            <span>Subtotal</span>
            <span>Rp {formatPrice(Number(data?.total_harga))}</span>
          </div>

          <div className="flex justify-between text-black text-lg font-semibold">
            <span>Discount</span>
            <span>{formatPrice(discount)}</span>
          </div>

          <div className="border-t border-gray-700 my-4" />

          <div className="flex justify-between text-black text-lg font-semibold">
            <span>TOTAL</span>
            <span>{formatPrice(data?.total_harga || 0)}</span>
          </div>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="flex justify-center gap-4 mt-10 print:hidden">
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold cursor-pointer"
        >
          <BiPrinter size={20} /> Print Invoice
        </button>

        <button
          onClick={() => (window.location.href = "/")}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold cursor-pointer"
        >
          <BiHome size={20} /> Back to Home
        </button>
      </div>
    </div>
  );
}
