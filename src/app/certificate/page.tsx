'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface CompanyCard {
  name: string;
  logo?: string;
  ongoing: number;
  completed: number;
  bgColor?: string;
}

const companies: CompanyCard[] = [
  {
    name: 'VOLVO',
    logo: '/company-logos/volvo.png',
    ongoing: 3,
    completed: 0,
  },
  {
    name: 'RKFL',
    ongoing: 3,
    completed: 0,
    bgColor: 'bg-[#6366f1]',
  },
  {
    name: 'SteelCorp',
    ongoing: 1,
    completed: 0,
    bgColor: 'bg-[#6366f1]',
  },
  {
    name: 'Arjas Steel',
    ongoing: 0,
    completed: 0,
    bgColor: 'bg-[#6366f1]',
  },
  {
    name: 'My company QA',
    ongoing: 0,
    completed: 0,
    bgColor: 'bg-[#6366f1]',
  },
  {
    name: 'Beta Testing',
    logo: '/company-logos/beta-testing.png',
    ongoing: 0,
    completed: 0,
  }
];

export default function Certificate() {
  const router = useRouter();

  const handleCompanyClick = (companyName: string) => {
    router.push(`/request?company=${companyName}`);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold text-white mb-8">New Request</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {companies.map((company, index) => (
          <div 
            key={index} 
            className="bg-[#1c1c24] rounded-lg overflow-hidden cursor-pointer hover:bg-[#2a2a36] transition-colors"
            onClick={() => handleCompanyClick(company.name)}
          >
            {/* Company Logo/Name Section */}
            <div className="h-48 relative flex items-center justify-center">
              {company.logo ? (
                <Image
                  src={company.logo}
                  alt={company.name}
                  width={200}
                  height={100}
                  className="object-contain"
                />
              ) : (
                <div className={`w-full h-full ${company.bgColor || 'bg-gray-700'} flex items-center justify-center`}>
                  <span className="text-2xl text-white font-semibold">{company.name}</span>
                </div>
              )}
              {/* Notification Badge */}
              {(company.ongoing > 0) && (
                <div className="absolute top-4 right-4 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center">
                  {company.ongoing}
                </div>
              )}
            </div>

            {/* Stats Section */}
            <div className="p-4 border-t border-gray-700">
              <div className="flex justify-between items-center text-sm">
                <div>
                  <span className="text-gray-400">Ongoing</span>
                  <span className="text-white ml-4">: {company.ongoing}</span>
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
  );
}
