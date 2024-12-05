'use client';

import { usePathname } from 'next/navigation';
import Sidebar from './Sidebar';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const showSidebar = pathname !== '/';

  return (
    <div className="flex">
      {showSidebar && <Sidebar />}
      <main className={`flex-1 bg-[#121216] min-h-screen ${showSidebar ? 'w-[calc(100%-60px)]' : 'w-full'}`}>
        {children}
      </main>
    </div>
  );
}
