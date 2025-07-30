import Image from "next/image";

const categories = [
  { icon: "/images/icon-01.png", title: "Blockchain" },
  { icon: "/images/icon-02.png", title: "Digital Art" },
  { icon: "/images/icon-03.png", title: "Music Art" },
  { icon: "/images/icon-04.png", title: "Virtual World" },
  { icon: "/images/icon-05.png", title: "Valuable" },
  { icon: "/images/icon-06.png", title: "Triple NFT" },
];

const CategoriesSection = () => {
  return (
    <section className="py-20 w-full bg-[#0d0d0d]">
      <div className="max-w-[1600px] px-4 mx-auto">
        {/* Heading */}
        <div className="text-center mb-14">
          <div className="w-24 h-1 bg-primary mx-auto mb-4 rounded-full"></div>
          <h2 className="text-3xl font-bold text-white">
            Browse Through Our{" "}
            <span className="text-indigo-500 not-italic">Categories</span> Here.
          </h2>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((cat, index) => (
            <div
              key={index}
              className="bg-[#1a1a1a] text-white rounded-2xl text-center py-6 px-2 shadow-sm hover:shadow-md transition"
            >
              <div className="mb-4 flex justify-center">
                <div className="bg-white w-14 h-14 rounded-full flex items-center justify-center">
                  <Image
                    src={cat.icon}
                    alt={cat.title}
                    width={30}
                    height={30}
                  />
                </div>
              </div>
              <h4 className="text-base font-bold">{cat.title}</h4>
              <div className="text-indigo-500 text-sm hover:underline cursor-pointer">
                &rarr;
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
