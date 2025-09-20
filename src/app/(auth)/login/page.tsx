// src/app/(auth)/login/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (email === "admin@example.com" && password === "123456") {
      // Set cookie token
      document.cookie = "token=sample-token; path=/; max-age=3600"; 
      router.push("/dashboard"); 
    } else {
      setError("Email atau password salah!");
    }
  };

  return (
    <section className="flex items-center justify-center h-screen">
      <main className="flex flex-1 items-center justify-center">
        <div className="flex w-full max-w-5xl bg-white shadow-xl rounded-lg overflow-hidden">
          {/* Left Image */}
          <div className="hidden md:block w-1/2">
            <img
              src="/images/featured-04.jpg"
              alt="Login"
              className="object-cover w-full h-full"
            />
          </div>

          <div className="w-full md:w-1/2 p-12 flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Login</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && <p className="text-red-500 text-sm">{error}</p>}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@doe.com"
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="********"
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-purple-600 transition cursor-pointer"
              >
                Log in
              </button>
            </form>

            {/* Links */}
            <div className="mt-8 flex justify-between text-sm">
              <a href="#" className="text-purple-600 hover:underline">
                Forgot your password?
              </a>
              <a href="#" className="text-purple-600 hover:underline">
                Create account
              </a>
            </div>
          </div>
        </div>
      </main>
        </section>
  );
}
