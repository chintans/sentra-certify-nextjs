'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getCompaniesByEmail } from '@/services/certificateService';
import { CompanyResult } from '@/types/certificate';
import ProtectedPage from '@/components/ProtectedPage';

export default function Certificate() {
  const router = useRouter();
  const [companies, setCompanies] = useState<CompanyResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const userEmail = localStorage.getItem('email');
        
        if (!userEmail) {
          console.error('No email found in localStorage');
          router.push('/login'); 
          return;
        }

        const data = await getCompaniesByEmail(userEmail);
        setCompanies(data);
      } catch (error) {
        console.error('Error fetching companies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, [router]);

  const handleCompanyClick = (companyId: string) => {
    router.push(`/certificate/${companyId}/request`);
  };

  return (
    <ProtectedPage>
      {loading ? (
        <div className="p-8 text-white">Loading...</div>
      ) : (
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
                      <div className={`wh-90 bg-[#6366f1] flex items-center justify-center`}>
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
                  <div className="p-4">
                    <div className="flex justify-between items-center">
                      <div className='f-16 grid grid-cols-[auto,1fr] gap-x-6'>
                        <div>Ongoing</div>
                        <div>:    {company.onGoing}</div>
                        <div>Completed</div>
                        <div>:    {company.completed}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </ProtectedPage>
  );
}
