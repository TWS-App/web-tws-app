"use client";

import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/utils/function/price";

export default function ProductCard({ item }: { item: any }) {
  return (
    <Link href={`/products/${item.id}`} className="block text-center group">
      <div className="aspect-square relative mb-4 overflow-hidden">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform"
        />
      </div>
      <h3 className="text-xl font-semibold text-black mb-2 group-hover:text-blue-600 transition-colors">
        {item.name}
      </h3>
      <div className="text-gray-500">
        {item.oldPrice && (
          <span className="line-through mr-2">{formatPrice(item.oldPrice)}</span>
        )}
        <span className="font-semibold">{formatPrice(item.price)}</span>
      </div>
    </Link>
  );
}
