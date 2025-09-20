"use client";

import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/utils/function/price";

export default function ServiceCard({ item }: { item: any }) {
  return (
    <Link href={`/services/${item.id}`} className="block text-center group">
      <div key={item.id} className="text-center">
        <div className="aspect-square relative mb-4 overflow-hidden">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform"
          />
        </div>

        <h3 className="text-xl font-semibold text-black mb-2 cursor-pointer hover:text-blue-600 transition-colors">
          {item.name}
        </h3>

        <div className="text-gray-500">
          {item.prefix && (
            <span className="text-blue-500 mr-2">{item.prefix}</span>
          )}
          <span className="font-semibold">{formatPrice(item.price)}</span>
        </div>
      </div>
    </Link>
  );
}
