"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/stores";
import { removeFromCart, updateQuantity } from "@/stores/cart/cart";
import { formatPrice } from "@/utils/function/price";
import { BiMinus, BiPlus } from "react-icons/bi";
import { CgClose } from "react-icons/cg";
import { FaMinusCircle, FaPlusCircle, FaShoppingCart } from "react-icons/fa";
import Link from "next/link";
import { FaCartShopping } from "react-icons/fa6";
import { IoAddCircle, IoCloseCircle, IoRemoveCircle } from "react-icons/io5";

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
                <img
                  src={item?.image || "/images/placeholder.png"}
                  alt={item?.name || item.id.toString()}
                  className="w-24 h-24 object-cover rounded"
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
