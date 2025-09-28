"use client";

import { useCartStore } from "@/stores/cart/cart";

export default function OrderPage() {
  const { items, removeFromCart, clearCart } = useCartStore();
  const total = items.reduce((sum: any, i: any) => sum + i.price * i.qty, 0);

  if (items.length === 0) {
    return <p className="p-6">Your cart is empty.</p>;
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
              <td className="p-3">${item.price * item.qty}</td>
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
        <h2 className="text-xl font-bold">Total: ${total}</h2>
        <div className="flex gap-4">
          <button
            onClick={clearCart}
            className="px-4 py-2 bg-gray-500 rounded text-white hover:bg-gray-600 cursor-pointer"
          >
            Clear
          </button>
          <button className="px-4 py-2 bg-blue-600 rounded text-white hover:bg-blue-700 cursor-pointer">
            Checkout
          </button>
        </div>
      </div>
    </section>
  );
}
