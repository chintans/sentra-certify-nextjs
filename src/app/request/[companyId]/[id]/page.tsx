"use client";

import { useParams, useRouter } from 'next/navigation';

export default function RequestDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const request = {
    certificateName: 'GHG',
    requestDate: '2024-08-22',
    completionDate: '2024-08-31',
    status: 'Assigned',
    members: 'N/A',
    techReviewer: 'N/A',
    comments: 'No Comments',
  };

  const handleGenerateSampleClick = () => {
    router.push(`/request/${id}/generate-sample`);
  };
  const handleGenerateSample = () => {
    // Implement sample generation logic here
    console.log('Sample generated');
    router.push(`/request/${id}/generate-sample/result`);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold text-white mb-8">New Request</h1>
      <div className="bg-[#1c1c24] p-6 rounded-lg">
        <table className="w-full text-left mb-4">
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
            <tr className="border-t border-gray-700">
              <td className="py-2 text-white">{request.certificateName}</td>
              <td className="py-2 text-white">{request.requestDate}</td>
              <td className="py-2 text-white">{request.completionDate}</td>
              <td className="py-2 text-white">
                <span className={`px-2 py-1 rounded bg-[#9f1239]`}>{request.status}</span>
              </td>
              <td className="py-2 text-white">{request.members}</td>
              <td className="py-2 text-white">{request.techReviewer}</td>
            </tr>
          </tbody>
        </table>
        <div className="flex space-x-4 mb-4">
          <button className="px-4 py-2 bg-green-500 text-white rounded" onClick={handleGenerateSampleClick}>Generate Sample</button>
          <button className="px-4 py-2 bg-green-500 text-white rounded" onClick={handleGenerateSample}>Review Sample</button>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-white mb-2">Comments</h2>
          <p className="text-white">{request.comments}</p>
        </div>
      </div>
    </div>
  );
}
