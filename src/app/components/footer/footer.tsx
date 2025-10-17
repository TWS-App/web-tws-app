"use client";

import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import { FaTiktok } from "react-icons/fa6";
import { IoSend } from "react-icons/io5";

export default function HomeFooter() {
  return (
    <footer className="w-full bg-white text-gray-800">
      {/* Subscribe Bar */}
      <div className="border-t border-gray-200 py-8 px-6 md:px-16 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold">Subscribe</h3>
        </div>
        
        <p className="text-sm text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do
          eiusmod.
        </p>

        <div className="flex w-full md:w-auto">
          <input
            type="email"
            placeholder="Write Email"
            className="border border-gray-300 rounded-l-md px-4 py-2 w-full md:w-64 focus:outline-none focus:ring focus:ring-blue-400"
          />
          <button className="bg-red-600 text-white px-5 rounded-r-md hover:bg-red-700 transition cursor-pointer">
            <IoSend />
          </button>
        </div>
      </div>

      {/* Main Footer */}
      <div className="grid grid-cols-8 bg-white py-10 px-6 md:px-16 md:grid-cols-8 gap-3 border-t border-gray-200">
        {/* Brand Column */}
        <div className="col-span-2">
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
              <FaTiktok size={14} />
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
        <div className="col-span-1">
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
        <div className="col-span-1">
          <h3 className="text-lg font-semibold mb-3">Menu</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>
              <a href="#" className="hover:text-blue-600">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600">
                Blog
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600">
                Service
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Column */}
        <div className="col-span-1">
          <h3 className="text-lg font-semibold mb-3">Services</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>
              <a href="#" className="hover:text-blue-600">
                Logo
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600">
                Web Design
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600">
                Branding
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600">
                Marketing
              </a>
            </li>
          </ul>
        </div>

        <div className="col-span-1">
          <h3 className="text-lg font-semibold mb-3">Contact</h3>
          <p className="text-sm text-gray-600">Call:</p>
          <span className="font-semibold">+0124 456 789 00</span>

          <p className="text-sm text-gray-600">Email:</p>
          <span className="font-semibold">user@example.com</span>
        </div>

        <div className="col-span-2 relative w-full pb-[56.25%] h-0 overflow-hidden rounded-lg shadow-lg">
          {/* <div className="mt-4 w-full h-32 bg-gray-200 flex items-center justify-center rounded-md text-gray-500 text-sm"> */}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d709.8214119706073!2d107.81644920921677!3d-7.271482816901641!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68a5000620ffc5%3A0x9f08ca374ced8a44!2sYHUSAN%20DIGITAL!5e1!3m2!1sen!2sid!4v1760460178724!5m2!1sen!2sid"
            loading="lazy"
            // referrerpolicy="no-referrer-when-downgrade"
            className="absolute top-0 left-0 w-full h-full border-0"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            style={{ border: 0 }}
          ></iframe>
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
