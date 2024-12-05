'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();
  const { user, error, isLoading } = useUser();

  useEffect(() => {
    if (user) {
      router.push('/certificate');
    } else if (!isLoading && !error) {
      window.location.href = '/api/auth/login';
    }
  }, [user, isLoading, error, router]);

  if (isLoading) {
    return <div className="min-h-screen bg-[#1e1e28] flex items-center justify-center">
      <p className="text-white">Loading...</p>
    </div>;
  }

  if (error) {
    return <div className="min-h-screen bg-[#1e1e28] flex items-center justify-center">
      <p className="text-red-500">Error: {error.message}</p>
    </div>;
  }

  return (
    <div className="min-h-screen bg-[#1e1e28] flex items-center justify-center">
    </div>
  );
}
