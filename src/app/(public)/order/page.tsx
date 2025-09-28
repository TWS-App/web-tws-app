"use client";

import { useCartStore } from "@/stores/cart/cart";
import { formatPrice } from "@/utils/function/price";
import { FaCartShopping } from "react-icons/fa6";

export default function OrderPage() {
  const { items, removeFromCart, clearCart } = useCartStore();
  const total = items.reduce((sum: any, i: any) => sum + i.price * i.qty, 0);

  if (items.length === 0) {
    return (
      <div className="flex justify-center items-center mt-28">
        <FaCartShopping size={75} />
        <p className="p-6">
          Your cart is empty. Please add a product or services.
        </p>
      </div>
    );
  }

  return (
    <section className="p-6">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-700 text-white">
            <th className="p-3 text-left">Product</th>
            <th className="p-3">Qty</th>
            <th className="p-3">Price</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item: any) => (
            <tr key={item.id} className="border-b border-gray-600">
              <td className="p-3">{item.name}</td>
              <td className="p-3 text-center">{item.qty}</td>
              <td className="p-3 text-center">
                {formatPrice(item.price * item.qty)}
              </td>
              <td className="p-3 text-center">
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="px-3 py-1 bg-red-600 rounded text-white hover:bg-red-700 cursor-pointer"
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-6 flex justify-between items-center">
        <h2 className="text-xl font-bold">Total: {formatPrice(total)}</h2>
        <div className="flex gap-4">
          <button
            onClick={clearCart}
            className="px-4 py-2 bg-red-500 rounded text-white hover:bg-red-600 cursor-pointer"
          >
            Clear
          </button>

          <button className="flex items-center gap-1 px-4 py-2 bg-blue-600 rounded text-white hover:bg-blue-700 cursor-pointer">
            <FaCartShopping /> Checkout
          </button>
        </div>
      </div>
    </section>
  );
}
