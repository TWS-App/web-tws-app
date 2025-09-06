import { formatPrice } from "@/utils/function/price";
import Image from "next/image";

const products = [
  {
    id: 1,
    name: "Tozo Aerosound 3",
    price: 295000,
    image: "/images/tozo_01.png",
    category: "Earphone",
  },
  {
    id: 2,
    name: "Soundcore",
    price: 299000,
    image: "/images/soundcore_01.png",
    category: "Earphone",
  },
  {
    id: 3,
    name: "Airpods",
    price: 5000000,
    oldPrice: 6000000,
    image: "/images/airpods_02.jpg",
    category: "Earphone",
  },
  // {
  //   id: 4,
  //   name: "Sonia Skirt",
  //   price: "$50.00",
  //   image: "/images/product-04.jpg",
  //   category: "Bottoms",
  // },
];

const categories = ["All", "Earphone", "Headphone", "Headset"];

export default function ProductsPage() {
  return (
    <>
      <section className="bg-white pt-28 pb-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-blue-600">Products</h1>
            <div className="w-16 h-1 bg-indigo-500 mx-auto mt-2 rounded-full"></div>
          </div>

          {/* Filter */}
          <div className="flex justify-center space-x-6 mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                className="text-gray-600 hover:text-purple-600 font-medium cursor-pointer transition-colors"
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
            {products.map((item) => (
              <div key={item.id} className="text-center">
                <div className="aspect-square relative mb-4">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-black mb-2 cursor-pointer hover:text-blue-600 transition-colors">
                  {item.name}
                </h3>
                <div className="text-gray-500">
                  {item.oldPrice && (
                    <span className="line-through mr-2">
                      {formatPrice(item.oldPrice)}
                    </span>
                  )}
                  <span className="font-semibold">
                    {formatPrice(item.price)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
