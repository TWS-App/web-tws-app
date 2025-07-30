import Image from "next/image";
import Link from "next/link";

const items = [
  {
    title: "Music Art Super Item",
    image: "/images/market-01.jpg",
    bid: "2.03 ETH",
    usd: "$8,240.50",
    ends: "4D 08H 15M 42S",
    endsDate: "July 24th, 2022",
  },
  {
    title: "Digital Crypto Artwork",
    image: "/images/market-01.jpg",
    bid: "2.03 ETH",
    usd: "$7,200.50",
    ends: "2D 06H 30M 25S",
    endsDate: "July 26th, 2022",
  },
  {
    title: "Blockchain Item One",
    image: "/images/market-01.jpg",
    bid: "3.64 ETH",
    usd: "$6,600.00",
    ends: "6D 05H 40M 50S",
    endsDate: "July 28th, 2022",
  },
  {
    title: "Virtual Currency Art",
    image: "/images/market-01.jpg",
    bid: "2.44 ETH",
    usd: "$8,800.50",
    ends: "3D 05H 20M 58S",
    endsDate: "July 14th, 2022",
  },
];

const MarketSection = () => {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <div>
            <div className="w-12 h-1 bg-indigo-500 mb-4 rounded-full"></div>
            <h2 className="text-3xl font-bold">
              <em className="text-indigo-500 not-italic">Items</em> Currently In
              The Market.
            </h2>
          </div>

          {/* Filter (Static placeholder) */}
          <div className="mt-6 md:mt-0">
            <ul className="flex flex-wrap gap-4 text-sm">
              <li className="text-indigo-600 font-semibold cursor-pointer">
                All Items
              </li>
              <li className="text-gray-600 hover:text-indigo-500 cursor-pointer">
                Music Art
              </li>
              <li className="text-gray-600 hover:text-indigo-500 cursor-pointer">
                Digital Art
              </li>
              <li className="text-gray-600 hover:text-indigo-500 cursor-pointer">
                Blockchain
              </li>
              <li className="text-gray-600 hover:text-indigo-500 cursor-pointer">
                Virtual
              </li>
            </ul>
          </div>
        </div>

        {/* Market Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {items.map((item, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-lg shadow p-4 flex gap-4"
            >
              {/* Left Image */}
              <div className="w-40 min-w-[160px] relative rounded-lg overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={195}
                  height={195}
                  className="object-cover rounded-lg"
                />
              </div>

              {/* Right Content */}
              <div className="flex-1">
                <h4 className="text-lg font-semibold mb-2">{item.title}</h4>
                <div className="flex items-center gap-3 mb-3">
                  <Image
                    src="/images/author.jpg"
                    alt="Author"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div>
                    <h6 className="text-sm font-medium">Liberty Artist</h6>
                    <a href="#" className="text-xs text-indigo-500">
                      @libertyart
                    </a>
                  </div>
                </div>

                <div className="border-t border-gray-200 my-3"></div>

                <div className="flex justify-between text-sm">
                  <div>
                    <p className="text-gray-500">Current Bid</p>
                    <p className="font-semibold">{item.bid}</p>
                    <p className="text-xs text-gray-400">{item.usd}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Ends In</p>
                    <p className="font-semibold">{item.ends}</p>
                    <p className="text-xs text-gray-400">{item.endsDate}</p>
                  </div>
                </div>

                <div className="mt-4">
                  <Link
                    href="/details"
                    className="text-indigo-600 hover:underline text-sm font-medium"
                  >
                    View Item Details &rarr;
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

export default MarketSection;
