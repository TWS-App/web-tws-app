import Image from "next/image";
import Link from "next/link";

const steps = [
  {
    number: 1,
    icon: "/images/icon-02.png",
    title: "Set Up Your Wallet",
    description:
      "NFT means Non-Fungible Token that are used in digital cryptocurrency markets. There are many different kinds of NFTs in the industry.",
  },
  {
    number: 2,
    icon: "/images/icon-04.png",
    title: "Add Your Digital NFT",
    description:
      "There are 5 different HTML pages included in this NFT website template. You can edit or modify any section on any page as you required.",
  },
  {
    number: 3,
    icon: "/images/icon-06.png",
    title: "Sell Your NFT & Make Profit",
    description:
      "If you would like to support our TemplateMo website, please visit our contact page to make a PayPal contribution. Thank you.",
  },
];

const CreateSection = () => {
  return (
    <section
      className="bg-cover bg-center py-20 px-4 text-white"
      style={{
        backgroundImage: "url('/images/main-bg.jpg')",
      }}
    >
      {/* Optional background pattern */}
      <div className="absolute inset-0 opacity-10 bg-cover bg-center z-0" />

      <div className="relative z-10 container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-16">
          <div>
            <div className="w-16 h-1 bg-white mb-4 rounded-full"></div>
            <h2 className="text-3xl md:text-4xl font-bold">
              Create Your NFT &amp; Put It On The Market.
            </h2>
          </div>
          <Link
            href="/create"
            className="mt-6 md:mt-0 bg-white text-indigo-600 font-semibold px-6 py-3 rounded-full shadow hover:bg-indigo-100 transition"
          >
            Create Your NFT Now
          </Link>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div
              key={step.number}
              className="relative bg-transparent text-gray-900 rounded-xl p-8 shadow-lg text-left"
            >
              {/* Step Number */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-600 text-white w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold shadow-md">
                {step.number}
              </div>

              {/* Icon */}
              <div className="mb-6">
                <Image
                  src={step.icon}
                  alt={step.title}
                  width={62}
                  height={62}
                  className="mx-auto bg-amber-50 p-3 rounded-full"
                />
              </div>

              {/* Content */}
              <h4 className="text-lg font-semibold text-white mb-3">{step.title}</h4>
              <p className="text-sm text-white">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CreateSection;
