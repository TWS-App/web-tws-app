import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image src="/globe.svg" alt="Logo" width={100} height={20} />
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-6 items-center">
            <a className="inline-block bg-primary text-black px-6 py-2 rounded-full hover:bg-primary/90 transition text-sm">
              Home
            </a>
            <a className="inline-block bg-primary text-black px-6 py-2 rounded-full hover:bg-primary/90 transition text-sm">
              Explore
            </a>
            <a className="inline-block bg-primary text-black px-6 py-2 rounded-full hover:bg-primary/90 transition text-sm">
              Item Details
            </a>
            <a className="inline-block bg-primary text-black px-6 py-2 rounded-full hover:bg-primary/90 transition text-sm">
              Author
            </a>
            <a className="inline-block bg-primary text-black px-6 py-2 rounded-full hover:bg-primary/90 transition text-sm">
              Create Yours
            </a>
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
