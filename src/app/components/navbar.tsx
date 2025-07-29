import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/globe.svg"
              alt="Logo"
              width={100}
              height={20}
            />
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-6 items-center">
            <Link href="/" className="text-blue-600 font-semibold">
              Home
            </Link>
            <Link href="/explore" className="text-gray-700 hover:text-blue-600">
              Explore
            </Link>
            <Link href="/details" className="text-gray-700 hover:text-blue-600">
              Item Details
            </Link>
            <Link href="/author" className="text-gray-700 hover:text-blue-600">
              Author
            </Link>
            <Link href="/create" className="text-gray-700 hover:text-blue-600">
              Create Yours
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-gray-700 focus:outline-none">
            <span>Menu</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
