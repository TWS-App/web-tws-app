import Image from "next/image";
import Link from "next/link";

const collections = [
  {
    title: "Mutant Bored Ape Yacht Club",
    image: "/images/collection-01.jpg",
    items: "310/340",
    category: "Digital Crypto",
  },
  {
    title: "Bored Ape Kennel Club",
    image: "/images/collection-01.jpg",
    items: "324/324",
    category: "Visual Art",
  },
  {
    title: "Genesis Collective Statue",
    image: "/images/collection-01.jpg",
    items: "380/394",
    category: "Music Art",
  },
  {
    title: "Worldwide Artwork Ground",
    image: "/images/collection-01.jpg",
    items: "426/468",
    category: "Blockchain",
  },
];

const HotCollections = () => {
  return (
    <section className="bg-gradient-to-r from-[#1e1b4b] via-[#312e81] to-[#3b82f6] py-20 px-4 text-white w-full">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-12">
          <div className="w-12 h-1 bg-indigo-500 mx-auto mb-4 rounded-full"></div>
          <h2 className="text-3xl font-bold">
            Explore Some Hot{" "}
            <span className="text-indigo-400">Collections</span> In Market.
          </h2>
        </div>

        {/* Grid Collections */}
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {collections.map((item, index) => (
            <div
              key={index}
              className="bg-[#111827] text-white shadow-xl rounded-2xl overflow-hidden hover:shadow-2xl transition duration-300"
            >
              <div className="relative h-52">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h4 className="font-semibold text-lg mb-2">{item.title}</h4>
                <div className="text-sm text-gray-300 space-y-2">
                  <div className="flex justify-between">
                    <span>Items In Collection:</span>
                    <span className="font-bold text-white">{item.items}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Category:</span>
                    <span className="font-bold text-white">
                      {item.category}
                    </span>
                  </div>
                </div>
                <div className="mt-6">
                  <Link
                    href="/explore"
                    className="inline-block bg-[#8b5cf6] hover:bg-[#7c3aed] text-white font-bold py-2 px-4 rounded-full text-sm w-full text-center"
                  >
                    Explore {item.title.split(" ")[0]}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
