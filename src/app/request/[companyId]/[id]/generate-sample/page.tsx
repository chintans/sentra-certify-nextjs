"use client";

import { useParams, useRouter } from 'next/navigation';

export default function GenerateSamplePage() {
  const { id } = useParams();
  const router = useRouter();

  const handleGenerateSample = () => {
    // Implement sample generation logic here
    console.log('Sample generated');
    router.push(`/request/${id}/generate-sample/result`);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold text-white mb-8">Generate Sample</h1>
      <div className="bg-[#1c1c24] p-6 rounded-lg">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-400 mb-1">Asset Level</label>
            <select className="w-full p-2 bg-gray-800 text-white rounded">
              <option>Select asset level</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-400 mb-1">Scope Level</label>
            <select className="w-full p-2 bg-gray-800 text-white rounded">
              <option>Select scope level</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-400 mb-1">Frequency Level</label>
            <select className="w-full p-2 bg-gray-800 text-white rounded">
              <option>Select frequency</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-400 mb-1">Timeline</label>
            <input type="date" className="w-full p-2 bg-gray-800 text-white rounded" />
          </div>
          <div>
            <label className="block text-gray-400 mb-1">Assurance</label>
            <select className="w-full p-2 bg-gray-800 text-white rounded">
              <option>Select assurance</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-400 mb-1">Random Sampling</label>
            <input type="text" className="w-full p-2 bg-gray-800 text-white rounded" />
          </div>
        </div>
        <button className="px-4 py-2 bg-green-500 text-white rounded" onClick={handleGenerateSample}>Generate Sample</button>
      </div>
    </div>
  );
}
