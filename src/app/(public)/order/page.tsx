"use client";

// REACT
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/stores";
import { formatPrice } from "@/utils/function/price";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const router = useRouter();
  const cart = useSelector((state: RootState) => state.cart.items);
  const [formData, setFormData] = useState({
    email: "",
    fullname: "",
    address: "",
    phone_number: "",
    payment: "",
  });

  // State collapse
  const [open, setOpen] = useState({
    email: true,
    delivery: false,
    payment: false,
    review: false,
  });
  const [step, setStep] = useState(1);
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // TOGGLE
  const toggle = (key: keyof typeof open) => {
    setOpen((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // const handleChange = (
  //   e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  // ) => {
  //   const { name, value } = e.target;
  //   setFormData({ ...formData, [name]: value });
  // };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateFields = (fields: string[]) => {
    const newErrors: { [key: string]: string } = {};
    fields.forEach((f) => {
      if (!formData[f as keyof typeof formData]) {
        newErrors[f] = "This field is required";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = (fields: string[], nextStep: number) => {
    if (validateFields(fields)) {
      setStep(nextStep);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    console.log("submit:", e);
    console.log("✅ Checkout Data:", formData);
    e.preventDefault();

    const allFields = Object.keys(formData);
    if (!validateFields(allFields)) return;

    sessionStorage.setItem("checkoutData", JSON.stringify(formData));
    const generatedOrderId = "INV25100001";

    console.log("🧾 Order ID:", generatedOrderId);

    router.push(`/success?orderId=${generatedOrderId}`);
  };

  return (
    <div className="min-h-screen bg-white grid grid-cols-1 lg:grid-cols-2 gap-10 p-6">
      {/* Left: Form */}
      <div className="space-y-6">
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className=" bg-gray-800 rounded-lg shadow-xl">
            <div
              className="flex justify-between items-center px-6 py-4 border-b border-gray-700 cursor-pointer"
              onClick={() => toggle("email")}
            >
              <h2 className="text-lg font-semibold">Buyers Data</h2>
              {open.email ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            {/* <h2 className="text-lg text-white  font-semibold mb-4">Your Email</h2> */}

            {open.email && (
              <div className="p-6 space-y-4">
                <label className="block mb-1 text-sm font-medium">
                  Email Address:
                </label>
                <input
                  name="email"
                  type="email"
                  placeholder="Email address"
                  required
                  onChange={handleChange}
                  className={`w-full border p-2 rounded ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}

                <label className="block mb-1 text-sm font-medium mt-4">
                  Full Name:
                </label>
                <input
                  type="text"
                  name="fullname"
                  placeholder="Full Name"
                  onChange={handleChange}
                  className={`w-full border p-2 rounded ${
                    errors.fullname ? "border-red-500" : "border-gray-300"
                  }`}
                  required
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.fullname}</p>
                )}

                <label className="block mb-1 text-sm font-medium mt-4">
                  Phone Number:
                </label>
                <input
                  placeholder="Phone Number"
                  name="phone_number"
                  onChange={handleChange}
                  className={`w-full border p-2 rounded ${
                    errors.phone_number ? "border-red-500" : "border-gray-300"
                  }`}
                  required
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.phone_number}</p>
                )}

                {/* <button className="w-full ring rounded bg-green-500 text-white hover:bg-emerald-500 py-2 mt-4 transition cursor-pointer">
                  Continue
                </button> */}
              </div>
            )}
          </div>
          {/* <div className="grid grid-cols-2 gap-4 mt-4"> */}
          {/* <label className="block mb-1 text-sm font-medium">Last Name:</label> */}
          {/* </div> */}

          {/* <div className="grid grid-cols-2 gap-4 mt-1"> */}
          {/* <input type="text" placeholder="Last Name" className="border p-2" /> */}
          {/* </div> */}

          <div className="bg-gray-800 rounded-lg shadow-xl">
            <div
              className="flex justify-between items-center px-6 py-4 border-b border-gray-700 cursor-pointer"
              onClick={() => toggle("delivery")}
            >
              <h2 className="text-lg font-semibold">Delivery Address</h2>
              {open.delivery ? <FaChevronUp /> : <FaChevronDown />}
            </div>

            {open.delivery && (
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <label className="block mb-1 text-sm font-medium">
                    Full Address:
                  </label>
                  <textarea
                    placeholder="Full Address"
                    name="address"
                    onChange={handleChange}
                    className={`w-full border p-2 rounded ${
                      errors.address ? "border-red-500" : "border-gray-300"
                    }`}
                    required
                  />

                  {errors.address && (
                    <p className="text-red-500 text-sm">{errors.address}</p>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="bg-gray-800 rounded-lg shadow-xl">
            <div
              className="flex justify-between items-center px-6 py-4 border-b border-gray-700 cursor-pointer"
              onClick={() => toggle("payment")}
            >
              <h2 className="text-lg font-semibold">Payment</h2>
              {open.payment ? <FaChevronUp /> : <FaChevronDown />}
            </div>

            {open.payment && (
              <div className="relative w-full max-w-md p-6 space-y-4">
                <select
                  name="payment"
                  value={formData.payment}
                  onChange={handleChange}
                  required
                  className={`w-full bg-gray-700 border ${
                    errors.payment ? "border-red-500" : "border-gray-300"
                  } rounded px-4 py-2 focus:outline-none focus:ring focus:ring-blue-500 truncate`}
                >
                  <option value="">Select Payment Method</option>
                  <option value="credit-card">Credit Card</option>
                  <option value="bank">Bank Transfer</option>
                  <option value="gopay">GoPay</option>
                  <option value="ovo">OVO</option>
                  <option value="cash">Cash on Delivery</option>
                </select>

                {errors.payment && (
                  <p className="text-red-500 text-sm">{errors.payment}</p>
                )}
              </div>
            )}
          </div>

          <div className="bg-gray-800 rounded-lg shadow-xl">
            <div
              className="flex justify-between items-center px-6 py-4 border-b border-gray-700 cursor-pointer"
              onClick={() => toggle("review")}
            >
              <h2 className="text-lg font-semibold">Review & Purchase</h2>
              {open.review ? <FaChevronUp /> : <FaChevronDown />}
            </div>

            {open.review && (
              <div className="p-6 space-y-4">
                <p className="text-gray-300 text-sm">
                  Please review your order before proceeding to payment.
                </p>

                {/* <Link href="/success" className="hover:underline"> */}
                <button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 py-3 rounded-lg font-semibold cursor-pointer"
                >
                  Confirm Purchase
                </button>
                {/* </Link> */}
              </div>
            )}
          </div>
        </form>
      </div>

      {/* Right: Order Summary */}
      <div className="border border-blue-600 bg-gray-800 p-6 rounded-lg lg:sticky lg:top-20 self-start h-fit">
        <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
        <div className="space-y-4">
          {cart.map((item) => (
            <div key={item.name} className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <img
                  src={item?.image || ""}
                  alt={item?.name || ""}
                  className="w-14 h-14 object-cover"
                />
                <div>
                  <p>
                    {item.name} / {item.variant}
                  </p>
                  <p className="text-sm text-gray-500">Qty {item.quantity}</p>
                </div>
              </div>
              <p>{formatPrice(item.price * item.quantity)}</p>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-700 my-4" />

        <div className="mt-6 space-y-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>

          <div className="border-t border-gray-700 my-4" />

          {/* <div className="flex justify-between">
            <span>Tax</span>
            <span>$0.00</span>
          </div> */}

          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>{formatPrice(subtotal)}</span>
          </div>

          <div className="border-t border-gray-700 my-4" />
        </div>
      </div>
    </div>
  );
}
