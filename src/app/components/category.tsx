import Image from 'next/image';

const categories = [
  { icon: '/images/icon-01.png', title: 'Blockchain' },
  { icon: '/images/icon-02.png', title: 'Digital Art' },
  { icon: '/images/icon-03.png', title: 'Music Art' },
  { icon: '/images/icon-04.png', title: 'Virtual World' },
  { icon: '/images/icon-05.png', title: 'Valuable' },
  { icon: '/images/icon-06.png', title: 'Triple NFT' },
];

const CategoriesSection = () => {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-10">
          <div className="w-12 h-1 bg-indigo-500 mx-auto mb-4 rounded-full"></div>
          <h2 className="text-3xl font-bold">
            Browse Through Our <em className="text-indigo-500 not-italic">Categories</em> Here.
          </h2>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((cat, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-lg shadow hover:shadow-md p-4 text-center group transition"
            >
              <div className="mb-4 flex justify-center">
                <Image src={cat.icon} alt={cat.title} width={60} height={60} />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2 group-hover:text-indigo-500">
                {cat.title}
              </h4>
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
