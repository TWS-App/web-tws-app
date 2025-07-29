import Image from 'next/image';
import Link from 'next/link';

const steps = [
  {
    number: 1,
    icon: '/images/icon-02.png',
    title: 'Set Up Your Wallet',
    description:
      'NFT means Non-Fungible Token that are used in digital cryptocurrency markets. There are many different kinds of NFTs in the industry.',
  },
  {
    number: 2,
    icon: '/images/icon-04.png',
    title: 'Add Your Digital NFT',
    description:
      'There are 5 different HTML pages included in this NFT website template. You can edit or modify any section on any page as you required.',
  },
  {
    number: 3,
    icon: '/images/icon-06.png',
    title: 'Sell Your NFT & Make Profit',
    description:
      'If you would like to support our TemplateMo website, please visit our contact page to make a PayPal contribution. Thank you.',
  },
];

const CreateSection = () => {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <div>
            <div className="w-12 h-1 bg-indigo-500 mb-4 rounded-full"></div>
            <h2 className="text-3xl font-bold">
              Create Your NFT & Put It On The Market.
            </h2>
          </div>
          <div className="mt-6 md:mt-0">
            <Link
              href="/create"
              className="inline-block bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition"
            >
              Create Your NFT Now
            </Link>
          </div>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div
              key={step.number}
              className={`bg-white rounded-lg shadow p-6 relative ${
                step.number === 1
                  ? 'md:mt-0'
                  : step.number === 2
                  ? 'md:mt-8'
                  : 'md:mt-16'
              }`}
            >
              {/* Step Number */}
              <div className="absolute -top-4 -left-4 bg-indigo-600 text-white w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold shadow">
                {step.number}
              </div>

              {/* Icon */}
              <div className="mb-4">
                <Image
                  src={step.icon}
                  alt={step.title}
                  width={60}
                  height={60}
                  className="mx-auto"
                />
              </div>

              {/* Content */}
              <h4 className="text-lg font-semibold mb-2 text-center">
                {step.title}
              </h4>
              <p className="text-sm text-gray-600 text-center">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CreateSection;
