'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { CertificateRequestListDto, OngoingRequestDto } from '@/types/certificate';
import { 
  getCertificateRequests, 
  getOngoingRequests 
} from '@/services/certificateService';



export default function RequestPage() {
  const router = useRouter();
  const params = useParams();
  const companyId = Number(params.companyId);
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('New Request');
  const [newRequests, setNewRequests] = useState<CertificateRequestListDto>({ requests: [] });
  const [ongoingRequests, setOngoingRequests] = useState<OngoingRequestDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setIsLoading(true);
        if (activeTab === 'New Request') {
          const data = await getCertificateRequests(companyId);
          setNewRequests(data);
        } else {
          const data = await getOngoingRequests(companyId);
          setOngoingRequests(data);
        }
      } catch (error) {
        console.error('Error fetching requests:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRequests();
  }, [companyId, activeTab]);

  const handleAssignClick = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleRowClick = (id: string) => {
    router.push(`/request/${id}`);
  };

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold text-white mb-8">New Request</h1>
      <div className="flex space-x-4 mb-4">
        <button
          className={`px-4 py-2 ${activeTab === 'New Request' ? 'text-green-500' : 'text-white'}`}
          onClick={() => handleTabClick('New Request')}
        >
          New Request
        </button>
        <button
          className={`px-4 py-2 ${activeTab === 'Ongoing' ? 'text-green-500' : 'text-white'}`}
          onClick={() => handleTabClick('Ongoing')}
        >
          Ongoing
        </button>
      </div>

      {isLoading ? (
        <div className="text-white text-center py-8">Loading...</div>
      ) : (
        <>
          {activeTab === 'New Request' && (
            <div className="bg-[#1c1c24] p-6 rounded-lg">
              <table className="w-full text-left">
                <thead>
                  <tr>
                    <th className="text-gray-400">Certificate Name</th>
                    <th className="text-gray-400">Request Date</th>
                    <th className="text-gray-400">Completion Date</th>
                    <th className="text-gray-400">Status</th>
                    <th className="text-gray-400">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {newRequests.requests.map((request, index) => (
                    <tr key={index} className="border-t border-gray-700">
                      <td className="py-2 text-white">{request.certificateType}</td>
                      <td className="py-2 text-white">{request.requestDate.toLocaleDateString()}</td>
                      <td className="py-2 text-white">{request.completionDate.toLocaleDateString()}</td>
                      <td className="py-2 text-white">
                        <span className={`px-2 py-1 rounded ${request.status === 'Assigned' ? 'bg-[#9f1239]' : 'bg-blue-500'}`}>{request.status}</span>
                      </td>
                      <td className="py-2">
                        <button className="px-4 py-2 bg-green-500 text-white rounded" onClick={(e) => { e.stopPropagation(); handleAssignClick(); }}>Accept & Assign</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'Ongoing' && (
            <div className="bg-[#1c1c24] p-6 rounded-lg">
              <table className="w-full text-left">
                <thead>
                  <tr>
                    <th className="text-gray-400">Certificate Name</th>
                    <th className="text-gray-400">Request Date</th>
                    <th className="text-gray-400">Completion Date</th>
                    <th className="text-gray-400">Status</th>
                    <th className="text-gray-400">Members</th>
                    <th className="text-gray-400">Tech Reviewer</th>
                  </tr>
                </thead>
                <tbody>
                  {ongoingRequests.map((request, index) => (
                    <tr key={index} className="border-t border-gray-700 cursor-pointer" onClick={() => handleRowClick(request.id)}>
                      <td className="py-2 text-white">{request.certificateName}</td>
                      <td className="py-2 text-white">{request.requestDate.toLocaleDateString()}</td>
                      <td className="py-2 text-white">{request.completionDate.toLocaleDateString()}</td>
                      <td className="py-2 text-white">
                        <span className="px-2 py-1 rounded bg-[#9f1239]">{request.status}</span>
                      </td>
                      <td className="py-2 text-white">{request.members}</td>
                      <td className="py-2 text-white">{request.technicalReviewer}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      {isDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-[#1c1c24] p-6 rounded-lg w-96">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-white">Assign</h2>
              <button onClick={handleCloseDialog} className="text-white">&times;</button>
            </div>
            <div className="mb-4">
              <label className="block text-gray-400 mb-1">Members</label>
              <select className="w-full p-2 bg-gray-800 text-white rounded">
                <option>Select Member</option>
                {/* Add member options here */}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-400 mb-1">Technical Reviewer</label>
              <select className="w-full p-2 bg-gray-800 text-white rounded">
                <option>Select Technical Reviewer</option>
              </select>
            </div>
            <div className="flex justify-end">
              <button className="px-4 py-2 bg-green-500 text-white rounded mr-2">Assign</button>
              <button onClick={handleCloseDialog} className="px-4 py-2 bg-gray-700 text-white rounded">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}