"use client";

import { formatPrice } from "@/utils/function/price";
import Image from "next/image";
import Link from "next/link";
import { useState, use } from "react";

interface Service {
  id: number;
  name: string;
  price: number;
  oldPrice?: number | null;
  description: string;
  details: string[];
  images: string[];
  category: string;
  prefix: string;
}

const services: Service[] = [
  {
    id: 1,
    name: "Adobe Photoshop",
    details: ["Edit Picture", "Create Posters"],
    price: 15000,
    images: ["/images/photoshop.jpg"],
    category: "Editing",
    prefix: "Start from",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 2,
    details: ["Service", "Earphone"],
    name: "Service Earphone",
    price: 75000,
    images: ["/images/soundcore_02.png"],
    category: "Service Headphone",
    prefix: "Start from",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 3,
    name: "Video Editing",
    price: 500000,
    images: ["/images/premiere.jpg"],
    category: "Editing",
    prefix: "Start from",
    details: ["Create Video Wedding", "Video Anniversary"],
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 4,
    name: "Maintenance Earphone",
    price: 100000,
    images: ["/images/airpods.png"],
    category: "Maintenance",
    prefix: "Start from",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    details: ["Bass Boost", "Mic Clear Voice", "Change Parts"],
  },
];

export default function ProductDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // PROPS
  const { id } = use(params);

  const service = services.find((p) => p.id.toString() === id);

  // Data
  const [mainImage, setMainImage] = useState(service?.images[0]);

  if (!service) {
    return <p className="text-center mt-20">Product not found.</p>;
  }

  return (
    <section className="min-h-screen bg-white py-12 px-6">
      {/* Breadcrumb */}
      <div className="mb-6 text-sm text-gray-500">
        <Link href="/services" className="hover:underline">
          Shop
        </Link>
        &gt; <span className="text-black">{service.name}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Thumbnails */}
        <div className="flex md:flex-col gap-4 col-span-2">
          {service.images.map((img, i) => (
            <div
              key={i}
              className="relative w-20 h-20 border rounded-md"
              onClick={() => setMainImage(img)}
            >
              <Image
                src={img}
                alt={service.name}
                fill
                className="object-cover rounded-md cursor-pointer"
              />
            </div>
          ))}
        </div>

        {/* Main Image */}
        <div className="relative col-span-6 aspect-square border rounded-md">
          <Image
            src={mainImage || service?.images[0]}
            alt={service.name}
            fill
            className="object-contain"
          />
        </div>

        {/* Info */}
        <div className="col-span-4">
          <h1 className="text-3xl font-bold text-black mb-4">{service.name}</h1>
          <div className="text-gray-500 mb-6">
            {service.prefix && (
              <span className="text-blue-500 mr-2">{service.prefix}</span>
            )}
            <span className="text-2xl font-semibold text-black">
              {formatPrice(service.price)}
            </span>
          </div>

          <h3 className="text-black font-semibold mb-2">DESCRIPTION</h3>
          <p className="text-black mb-6">{service.description}</p>

          <h3 className="text-black font-semibold mb-2">DETAILS</h3>
          <ul className="list-disc list-inside text-gray-600 space-y-1 mb-6">
            {service.details.map((d, i) => (
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
