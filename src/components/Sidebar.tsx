'use client';

import Link from 'next/link';
import { FC, useState } from 'react';
import { useRouter } from 'next/navigation';

const Sidebar: FC = () => {
  const router = useRouter();

  const handleLogout = () => {
    // Add any logout logic here (clear session, cookies, etc.)
    router.push('/login');
  };

  return (
    <div className="flex flex-col h-screen bg-[#1c1c24] text-white w-64 p-4">
      {/* Logo */}
      <div className="mb-8 pl-4">
        <span className="text-xl">sentra.<span className="text-[#4CAF50]">certify</span></span>
      </div>

      {/* Menu Items */}
      <nav className="flex-1">
        <Link href="/certificate" 
          className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-[#2a2a36] rounded-lg mb-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Certificate
        </Link>

        <Link href="/settings"
          className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-[#2a2a36] rounded-lg mb-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Settings
        </Link>

        <Link href="/user-roles"
          className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-[#2a2a36] rounded-lg mb-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          User Roles
        </Link>
      </nav>

      {/* Logout Button */}
      <div className="mt-auto">
        <button
          onClick={handleLogout}
          className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span>Logout</span>
        </button>
      </div>

      {/* Footer */}
      <div className="mt-4 text-xs text-gray-500 px-4">
        &copy; sentra.world 2023
      </div>
    </div>
  );
};

export default Sidebar;