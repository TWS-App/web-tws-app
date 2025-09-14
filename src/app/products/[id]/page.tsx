"use client";

import { formatPrice } from "@/utils/function/price";
import Image from "next/image";
import Link from "next/link";
import { use, useState } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice?: number | null;
  description?: string;
  details: string[];
  images: string[];
  category?: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Tozo Aerosound 3",
    price: 295000,
    oldPrice: null,
    description: "Earphone premium dengan kualitas suara jernih.",
    details: ["Bluetooth 5.3", "Noise Cancelling", "Battery 24 jam"],
    images: [
      "/images/tozo_01.png",
      "/images/tozo_02.png",
      "/images/tozo_03.png",
    ],
  },
  {
    id: 2,
    name: "Soundcore",
    price: 299000,
    oldPrice: null,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    details: ["Bass Boost", "Mic Clear Voice", "USB-C Fast Charging"],
    images: ["/images/soundcore_01.png", "/images/soundcore_02.png"],
  },
  {
    id: 3,
    name: "Airpods",
    price: 5000000,
    oldPrice: 6000000,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    images: [
      "/images/airpods_02.jpg",
      "/images/airpods_03.png",
      "/images/airpods.png",
    ],
    category: "Earphone",
    details: ["Bass Boost", "Mic Clear Voice", "USB-C Fast Charging"],
  },
];

export default function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  // PROPS
  const { id } = use(params);

  const product = products.find((p: any) => p.id.toString() === id);
  //   const product = products.find((p) => p.id.toString() === params?.id);

  // Data
  const [mainImage, setMainImage] = useState(product?.images[0]);

  if (!product) {
    return <p className="text-center mt-20">Product not found.</p>;
  }

  return (
    <section className="min-h-screen bg-white py-12 px-6">
      {/* Breadcrumb */}
      <div className="mb-6 text-sm text-gray-500">
        <Link href="/products" className="hover:underline">
          Shop
        </Link>
        &gt; <span className="text-black">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Thumbnails */}
        <div className="flex md:flex-col gap-4 col-span-2">
          {product.images.map((img, i) => (
            <div
              key={i}
              className="relative w-20 h-20 border rounded-md"
              onClick={() => setMainImage(img)}
            >
              <Image
                src={img}
                alt={product.name}
                fill
                className="object-cover rounded-md cursor-pointer"
              />
            </div>
          ))}
        </div>

        {/* Main Image */}
        <div className="relative col-span-6 aspect-square border rounded-md">
          <Image
            src={mainImage || product?.images[0]}
            alt={product.name}
            fill
            className="object-contain"
          />
        </div>

        {/* Info */}
        <div className="col-span-4">
          <h1 className="text-3xl font-bold text-black mb-4">{product.name}</h1>
          <div className="text-gray-500 mb-6">
            {product.oldPrice && (
              <span className="line-through mr-3">
                {formatPrice(product.oldPrice)}
              </span>
            )}
            <span className="text-2xl font-semibold text-black">
              {formatPrice(product.price)}
            </span>
          </div>

          <h3 className="text-black font-semibold mb-2">DESCRIPTION</h3>
          <p className="text-black mb-6">{product.description}</p>

          <h3 className="text-black font-semibold mb-2">DETAILS</h3>
          <ul className="list-disc list-inside text-gray-600 space-y-1 mb-6">
            {product.details.map((d, i) => (
              <li key={i}>{d}</li>
            ))}
          </ul>

          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition cursor-pointer">
            Add to Cart
          </button>
        </div>
      </div>
    </section>
  );
}
