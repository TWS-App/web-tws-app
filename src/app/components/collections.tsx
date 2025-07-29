import Image from 'next/image';
import Link from 'next/link';

const collections = [
  {
    title: 'Mutant Bored Ape Yacht Club',
    image: '/images/collection-01.jpg',
    items: '310/340',
    category: 'Digital Crypto',
  },
  {
    title: 'Bored Ape Kennel Club',
    image: '/images/collection-01.jpg',
    items: '324/324',
    category: 'Visual Art',
  },
  {
    title: 'Genesis Collective Statue',
    image: '/images/collection-01.jpg',
    items: '380/394',
    category: 'Music Art',
  },
  {
    title: 'Worldwide Artwork Ground',
    image: '/images/collection-01.jpg',
    items: '426/468',
    category: 'Blockchain',
  },
];

const HotCollections = () => {
  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-12">
          <div className="w-12 h-1 bg-indigo-500 mx-auto mb-4 rounded-full"></div>
          <h2 className="text-3xl font-bold">
            Explore Some Hot <em className="text-indigo-500 not-italic">Collections</em> In Market.
          </h2>
        </div>

        {/* Grid Collections */}
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {collections.map((item, index) => (
            <div key={index} className="bg-white shadow rounded-lg overflow-hidden hover:shadow-md transition">
              <div className="relative h-52">
                <Image src={item.image} alt={item.title} fill className="object-cover" />
              </div>
              <div className="p-4">
                <h4 className="font-semibold text-lg mb-2">{item.title}</h4>
                <p className="text-sm text-gray-600">
                  Items In Collection:<br />
                  <strong>{item.items}</strong>
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  Category:<br />
                  <strong>{item.category}</strong>
                </p>
                <div className="mt-4">
                  <Link
                    href="/explore"
                    className="inline-block bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 text-sm"
                  >
                    Explore {item.title.split(' ')[0]}
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
