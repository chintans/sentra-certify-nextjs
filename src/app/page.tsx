'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add login logic here
  };

  return (
    <div className="min-h-screen bg-[#1e1e28] flex flex-col justify-center py-12 px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <Image
            src="/sentra-world-logo.png"
            alt="Sentra World Logo"
            width={200}
            height={50}
            className="mx-auto mb-8"
          />
        </div>
        
        <h1 className="text-3xl text-white mb-2">Login</h1>
        <p className="text-gray-400 text-sm mb-8">Sign in to sentra.world app</p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="py-8 px-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="block w-full pl-10 pr-3 py-2 border border-[#2a2a36] rounded-lg bg-[#1c1c24] text-white placeholder-gray-400 focus:outline-none focus:border-[#4CAF50]"
                  required
                />
              </div>
            </div>

            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="block w-full pl-10 pr-3 py-2 border border-[#2a2a36] rounded-lg bg-[#1c1c24] text-white placeholder-gray-400 focus:outline-none focus:border-[#4CAF50]"
                  required
                />
              </div>
            </div>

            <div className="text-sm text-gray-400">
              By clicking login below you agree to our{' '}
              <Link href="/privacy-policy" className="text-[#4CAF50] hover:text-[#45a049]">
                Privacy Policy
              </Link>
              {' '}and{' '}
              <Link href="/terms" className="text-[#4CAF50] hover:text-[#45a049]">
                Terms of Use
              </Link>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-white bg-[#4CAF50] hover:bg-[#45a049] focus:outline-none transition-colors"
            >
              LOGIN
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-400">
            &copy; sentra.world {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </div>
  );
}
