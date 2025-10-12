"use client";

import { FaStar } from "react-icons/fa";

export default function ReviewSection() {
  const reviews = [
    {
      name: "Ethan Miller",
      role: "Product Designer",
      image: "/images/reviewers/ethan.jpg",
      review:
        "I've been using Yusan Digital for a year now and it’s made managing my devices much easier.",
      rating: 5,
    },
    {
      name: "Emily Johnson",
      role: "Design Lead",
      image: "/images/reviewers/emily.jpg",
      review:
        "Great service! The customer support is responsive and the repair quality is top-notch.",
      rating: 5,
    },
    {
      name: "Olivia Carter",
      role: "Sales Manager",
      image: "/images/reviewers/olivia.jpg",
      review:
        "Very satisfied! Fast repair process and affordable spare parts for my TWS.",
      rating: 4,
    },
    {
      name: "Wyatt Turner",
      role: "CEO",
      image: "/images/reviewers/wyatt.jpg",
      review:
        "Excellent experience overall — professional team and reliable spare parts.",
      rating: 5,
    },
  ];

  return (
    <section className="w-full bg-white py-20 text-center" id="testimoni">
      <div className="max-w-7xl mx-auto px-6 border-t-4 border-t-black">
        {/* Title */}
        <h2 className="mt-10 text-3xl md:text-4xl font-extrabold text-blue-700 uppercase tracking-wide mb-12">
          Testimoni Pelanggan
        </h2>

        {/* Review Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {reviews.map((r) => (
            <div
              key={r.name}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-6 border border-gray-100 cursor-pointer"
            >
              <img
                src="https://i.pravatar.cc/40"
                alt={r.name}
                className="w-20 h-20 rounded-full mx-auto object-cover mb-4"
              />
              <h3 className="text-lg font-semibold text-gray-800">{r.name}</h3>
              <p className="text-sm text-gray-500">{r.role}</p>

              {/* Stars */}
              <div className="flex justify-center mt-2 mb-3">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">
                    <FaStar />
                  </span>
                ))}
              </div>

              <p className="text-gray-600 text-sm leading-relaxed">
                {r.review}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
