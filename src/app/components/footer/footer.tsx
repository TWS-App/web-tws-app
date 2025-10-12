"use client";

import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

export default function HomeFooter() {
  return (
    <footer className="w-full bg-white text-gray-800">
      {/* Subscribe Bar */}
      <div className="border-t border-gray-200 py-8 px-6 md:px-16 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold">Subscribe</h3>
          <p className="text-sm text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do
            eiusmod.
          </p>
        </div>
        <div className="flex w-full md:w-auto">
          <input
            type="email"
            placeholder="Write Email"
            className="border border-gray-300 rounded-l-md px-4 py-2 w-full md:w-64 focus:outline-none focus:ring focus:ring-blue-400"
          />
          <button className="bg-red-600 text-white px-5 rounded-r-md hover:bg-red-700 transition">
            ➤
          </button>
        </div>
      </div>

      {/* Main Footer */}
      <div className="bg-white py-10 px-6 md:px-16 grid grid-cols-1 md:grid-cols-4 gap-8 border-t border-gray-200">
        {/* Brand Column */}
        <div>
          <h2 className="text-lg font-bold">BRAND NAME</h2>
          <p className="text-sm text-gray-600 mb-3">Enter Your Slogan Here</p>
          <p className="text-sm text-gray-500">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do
            eiusmod tempor.
          </p>
          <div className="flex gap-3 mt-4">
            <a
              href="#"
              className="p-2 bg-gray-200 rounded-full hover:bg-blue-500 hover:text-white transition"
            >
              <FaFacebookF size={14} />
            </a>
            <a
              href="#"
              className="p-2 bg-gray-200 rounded-full hover:bg-sky-400 hover:text-white transition"
            >
              <FaTwitter size={14} />
            </a>
            <a
              href="#"
              className="p-2 bg-gray-200 rounded-full hover:bg-blue-700 hover:text-white transition"
            >
              <FaLinkedinIn size={14} />
            </a>
            <a
              href="#"
              className="p-2 bg-gray-200 rounded-full hover:bg-red-600 hover:text-white transition"
            >
              <FaYoutube size={14} />
            </a>
          </div>
        </div>

        {/* About Column */}
        <div>
          <h3 className="text-lg font-semibold mb-3">About</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>
              <a href="#" className="hover:text-blue-600">
                Planning
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600">
                Research
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600">
                Consulting
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600">
                Analysis
              </a>
            </li>
          </ul>
        </div>

        {/* Menu Column */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Menu</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>
              <a href="#" className="hover:text-blue-600">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600">
                Service
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600">
                Blog
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Column */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact</h3>
          <p className="text-sm text-gray-600">
            Call: <span className="font-semibold">+0124 456 789 00</span>
          </p>
          <p className="text-sm text-gray-600">
            Email: <span className="font-semibold">user@example.com</span>
          </p>
          <div className="mt-4 w-full h-32 bg-gray-200 flex items-center justify-center rounded-md text-gray-500 text-sm">
            Google Maps Here
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="flex justify-around bg-[#0c0c0c] text-gray-400 py-4 text-sm text-center border-t border-gray-700">
        <div className="space-x-4">
          <a href="#" className="text-center hover:text-white">
            Privacy Policy
          </a>
          {" | "}
          <a href="#" className="text-center ml-4 hover:text-white">
            Our History
          </a>
          {" | "}
          <a href="#" className="text-center ml-4 hover:text-white">
            What We Do
          </a>
        </div>
        <p className="mt-2 text-xs">
          &copy; 2025 Example Test. All images are for demo purposes only.
        </p>
      </div>
    </footer>
  );
}
