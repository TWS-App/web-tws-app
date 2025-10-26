"use client";

// REACTS
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";

// STORES
import { RootState } from "@/stores";
import { removeFromCart, updateQuantity } from "@/stores/cart/cart";

// Antd Components
import { Image } from "antd";
import { BiMinus, BiPlus } from "react-icons/bi";
import { CgClose } from "react-icons/cg";
import { FaMinusCircle, FaPlusCircle, FaShoppingCart } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { IoAddCircle, IoCloseCircle, IoRemoveCircle } from "react-icons/io5";

// UTILS
import { formatPrice } from "@/utils/function/price";

// CODE
export default function CartPage() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleQuantityChange = (
    id: number,
    variant: string,
    newQty: number
  ) => {
    if (newQty <= 0) return;
    dispatch(updateQuantity({ id, variant, quantity: newQty }));
  };

  return (
    <div className="min-h-screen bg-white mx-auto py-12 px-6">
      <h1 className="text-2xl font-bold mb-8 text-black">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="flex justify-center items-center mt-28">
          <FaCartShopping size={75} />

          <p className="p-6 text-black">
            Your cart is empty. Please add a product or services.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {cartItems.map((item) => (
            <div
              key={`${item.id}-${item.variant}`}
              className="flex items-center flex-row justify-evenly border-b pb-6 bg-gray-800 p-4 rounded-lg shadow-sm"
            >
              {/* Product Info */}
              <div className="flex items-center gap-6 basis-2/5">
                <Image
                  src={item?.image || "error"}
                  alt={item?.name || item.id.toString()}
                  className="w-24 h-24 object-cover rounded"
                  fallback="data:image/png;base64,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"
                  height={100}
                  preview={false}
                />
                <div>
                  <h2 className="font-semibold text-lg">{item.name}</h2>
                  {item.variant ? (
                    <p className="text-sm text-gray-500">
                      Variants: {item.variant}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-4 basis-1/5">
                <button
                  onClick={() =>
                    handleQuantityChange(
                      item.id,
                      item?.variant || "",
                      item.quantity - 1
                    )
                  }
                  className="text-white hover:text-amber-500 text-xl cursor-pointer"
                >
                  <IoRemoveCircle size={32} />
                </button>

                <input
                  type="number"
                  className="flex items-center border-2 rounded text-center text-xl focus:border-b-sky-500"
                  value={item.quantity}
                  onChange={() =>
                    handleQuantityChange(
                      item.id,
                      item?.variant || "",
                      item.quantity - 1
                    )
                  }
                />

                <button
                  onClick={() =>
                    handleQuantityChange(
                      item.id,
                      item?.variant || "",
                      item.quantity + 1
                    )
                  }
                  className="text-white hover:text-green-600 text-xl cursor-pointer"
                >
                  <IoAddCircle size={32} />
                </button>
              </div>

              {/* Price */}
              <div className="w-24 text-right font-bold basis-1/5">
                {formatPrice(item.price * item.quantity)}
              </div>

              {/* Remove */}
              <button
                onClick={() =>
                  dispatch(
                    removeFromCart({
                      id: item?.id,
                      variant: item?.variant || "",
                    })
                  )
                }
                className="flex justify-end text-white hover:text-red-500 basis-1/5 text-xl cursor-pointer"
              >
                <IoCloseCircle size={32} />
              </button>
            </div>
          ))}

          {/* Subtotal + Checkout */}
          <div className="flex justify-end mt-8">
            <div className="w-1/3 space-y-4">
              <div className="flex justify-between text-black text-lg font-semibold">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>

              <Link href="/order">
                <button className="w-full flex justify-center gap-2 items-center bg-green-500 text-white py-3 rounded hover:bg-green-700 font-bold transition cursor-pointer">
                  <FaShoppingCart size={24} /> CHECKOUT
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// "use client";

// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "@/stores";
// import { clearCart, removeFromCart } from "@/stores/cart/cart";
// import { FaCartShopping } from "react-icons/fa6";
// import { formatPrice } from "@/utils/function/price";

// // CODE
// export default function OrderPage() {
//   // Dispatch
//   const dispatch = useDispatch();
//   const { items } = useSelector((state: RootState) => state.cart);

//   const total = useSelector((state: RootState) =>
//     state.cart.items.reduce(
//       (total, item) => total + item?.price * item.quantity,
//       0
//     )
//   );

//   if (items.length === 0) {
//     return (
//       <div className="flex justify-center items-center mt-28">
//         <FaCartShopping size={75} />
//         <p className="p-6">
//           Your cart is empty. Please add a product or services.
//         </p>
//       </div>
//     );
//   }

//   return (
//     <section className="p-6">
//       <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

//       <table className="w-full border-collapse">
//         <thead>
//           <tr className="bg-gray-700 text-white">
//             <th className="p-3 text-left">Product</th>
//             <th className="p-3">Qty</th>
//             <th className="p-3">Price</th>
//             <th className="p-3">Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {items.map((item: any) => (
//             <tr key={item.id} className="border-b border-gray-600">
//               <td className="p-3">{item.name}</td>
//               <td className="p-3 text-center">{item.quantity}</td>
//               <td className="p-3 text-center">
//                 {formatPrice(item.price * item.quantity)}
//               </td>
//               <td className="p-3 text-center">
//                 <button
//                   onClick={() => removeFromCart(item.id)}
//                   className="px-3 py-1 bg-red-600 rounded text-white hover:bg-red-700 cursor-pointer"
//                 >
//                   Remove
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <div className="mt-6 flex justify-between items-center">
//         <h2 className="text-xl font-bold">Total: {formatPrice(total)}</h2>
//         <div className="flex gap-4">
//           <button
//             onClick={() => dispatch(clearCart())}
//             className="px-4 py-2 bg-red-500 rounded text-white hover:bg-red-600 cursor-pointer"
//           >
//             Clear
//           </button>

//           <button className="flex items-center gap-1 px-4 py-2 bg-blue-600 rounded text-white hover:bg-blue-700 cursor-pointer">
//             <FaCartShopping /> Checkout
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// }
