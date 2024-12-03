'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getCompaniesByEmail } from '@/services/certificateService';
import { CompanyResult } from '@/types/certificate';


export default function Certificate() {
  const router = useRouter();
  const [companies, setCompanies] = useState<CompanyResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const data = await getCompaniesByEmail('tester@gmail.com');
        setCompanies(data);
      } catch (error) {
        console.error('Error fetching companies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  const handleCompanyClick = (companyId: string) => {
    router.push(`/certificate/${companyId}/request`);
  };

  if (loading) {
    return <div className="p-8 text-white">Loading...</div>;
  }

  
  return (
    <div>
       <div className="flex justify-between items-center page-header">
        <h1>New Request</h1>
      </div>
      <div className="p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {companies.map((company, index) => (
          <div 
            key={index} 
            className="bg-[#1c1c24] rounded-lg overflow-hidden cursor-pointer hover:bg-[#2a2a36] transition-colors"
            onClick={() => handleCompanyClick(company.companyId)}
          >
            {/* Company Logo/Name Section */}
            <div className="h-48 relative flex items-center justify-center">
              {company.imageUrl ? (
                <Image
                  src={company.imageUrl}
                  alt={company.name}
                  width={200}
                  height={100}
                  className="object-contain"
                />
              ) : (
                <div className={`w-full h-full bg-[#6366f1] flex items-center justify-center`}>
                  <span className="text-2xl text-white font-semibold">{company.name}</span>
                </div>
              )}
              {/* Notification Badge */}
              {(company.onGoing > 0) && (
                <div className="absolute top-4 right-4 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center">
                  {company.onGoing}
                </div>
              )}
            </div>

            {/* Stats Section */}
            <div className="p-4 border-t border-gray-700">
              <div className="flex justify-between items-center text-sm">
                <div>
                  <span className="text-gray-400">Ongoing</span>
                  <span className="text-white ml-4">: {company.onGoing}</span>
                </div>
                <div>
                  <span className="text-gray-400">Completed</span>
                  <span className="text-white ml-4">: {company.completed}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}
