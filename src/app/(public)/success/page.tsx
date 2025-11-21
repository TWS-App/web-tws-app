"use client";

// REACTS
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

// Antd Components
import { Button, Result, Spin, Typography } from "antd";
import { BiCheckCircle, BiCheckDouble, BiXCircle } from "react-icons/bi";
import { IoHome } from "react-icons/io5";
import { RiPrinterFill } from "react-icons/ri";

// Services
import { orderHeaderService } from "@/api/services/orders/serviceHeader";
import {
  masterPaymentServices,
  PaymentMaster,
} from "@/api/services/master/payment";

// UTILS
import { formatPrice } from "@/utils/function/price";

// CODE
export default function SuccessPage() {
  // STATE
  const router = useRouter();
  const params = useSearchParams();
  const encoded = params.get("d");
  const orderId = params.get("orderId");

  const [data, setData] = useState<any>(null);
  const [payment, setPayment] = useState<PaymentMaster>({
    payment_name: null,
    payment_number: null,
    description: null,
    id: 0,
  });
  const [loading, setLoading] = useState(false);

  // Handle Print
  const handlePrint = () => {
    router.push(`/invoice/id?d=${encoded}`);
  };

  // Use effects
  useEffect(() => {
    if (encoded) {
      try {
        let _data = JSON.parse(atob(encoded));
        const _id = String(_data?.id);
        console.log("Params: ", _data);

        fetchData(_id ?? 0);
      } catch (e) {
        fetchData(orderId);
        console.error("Failed to decode:", e);
      }
    }
  }, [encoded]);

  // Fetch Data
  const fetchData = async (value: any) => {
    setLoading(true);

    try {
      const res = await orderHeaderService.getById(value);

      console.log("Res data: ", res);

      if (res?.payment_type > 0) {
        setData(res);

        const pay = await masterPaymentServices.getById(res?.payment_type);

        console.log("Payment Masters: ", pay);
        setPayment(pay);
      } else {
        setData(null);
        setPayment({
          payment_name: null,
          payment_number: null,
          description: null,
          id: 0,
        });
      }
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
        <Result
          status={data !== null ? "success" : "error"}
          title={
            data !== null ? `Transaction Successful!` : `Submission Failed!`
          }
          subTitle={
            data !== null ? (
              <div className="text-gray-600 font-semibold">
                {`Thank you for your purchase! Your order with ID = ${
                  data?.order_number || "#######"
                } is created successfully and will be processed immediately
                  after we have confirm your payment.`}
              </div>
            ) : (
              <div className="text-gray-700 font-semibold">
                {`Your Transaction is cannot be proceed because of some error. Please, try again later!`}
              </div>
            )
          }
          extra={[
            <Button
              type="primary"
              key="console"
              onClick={handlePrint}
              icon={<RiPrinterFill size={20} />}
            >
              Print Invoice
            </Button>,
            <Button
              icon={<IoHome size={20} />}
              key="home"
              onClick={() => router.push("/")}
            >
              Back to Home
            </Button>,
          ]}
          style={{
            color: "#000000",
          }}
        >
          <div className="flex flex-col justify-center">
            <div>
              {data !== null
                ? `Please, Follow this step to help us keep your transaction on point: `
                : `The content you submitted has the following error: `}
            </div>

            {data !== null ? (
              <div className="flex gap-2">
                <BiCheckDouble className="text-green-500" size={20} />
                {`Please, do transfer to the account of ${
                  data?.payment_name || "####"
                } 
                with number: ${payment.payment_number || "###"} 
                with amount of Rp ${formatPrice(data?.total_harga ?? 0)}.`}
              </div>
            ) : (
              <div className="flex gap-2">
                <BiXCircle className="text-red-500" size={20} />
                {`The Products is maybe out of stocks, so it cannot be processed.`}
              </div>
            )}

            {data !== null ? (
              <div className="flex gap-2">
                <BiCheckDouble className="text-green-500" size={20} />
                {`Send the Bank Receipt to our admin via Whatsapp.`}
              </div>
            ) : (
              <div className="flex gap-2">
                <BiXCircle className="text-red-500" size={20} />
                {`Your internet maybe out of service.`}
              </div>
            )}

            {data !== null ? (
              <div className="flex gap-2">
                <BiCheckDouble className="text-green-500" size={20} />
                {`You can check your transaction status via Tracking Order menu.`}
              </div>
            ) : (
              <div className="flex gap-2">
                <BiXCircle className="text-red-500" size={20} />
                {`Our systems is probably having an error.`}
              </div>
            )}

            {data !== null ? (
              <div className="flex gap-2">
                <BiCheckDouble className="text-green-500" size={20} />
                {`Please, download this invoice to keep your transaction information for next usages!`}
              </div>
            ) : (
              <div className="flex gap-2">
                <BiXCircle className="text-red-500" size={20} />
                {`There are some error with internet services.`}
              </div>
            )}
          </div>
        </Result>
        {/* <div
          className="text-green-500"
          // initial={{ scale: 0 }}
          // animate={{ scale: 1 }}
          // transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
        >
          <BiCheckCircle className="text-green-500 w-24 h-24 mb-6" />
        </div>

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
        </div> */}
      </div>
    </div>
  );
}
