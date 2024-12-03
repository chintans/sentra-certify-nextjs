"use client";
import { useRouter, useParams } from 'next/navigation';
import  '../.../../../../../../../styles/globals.css';

export default function GenerateSample() {
  const router = useRouter();
  const { companyId, requestId } = useParams();
  const handleReviewSampleClick = () => {
    router.push(`/certificate/${companyId}/request/${requestId}/review-sample`);
  };

  return (
    <div className="p-8">
      <h1 className="text-white mb-8">Generate Sample</h1>
      <div className="bg-[#1c1c24] p-6 rounded-lg">
        <div className="flex flex-col gap-2">
          <div className="flex items-center mb-2">
            <label className="w-15 text-white f-14">Asset Level</label>
            <select className="w-30 p-2 bg-gray-800 text-white rounded f-14">
              <option>Select asset level</option>
            </select>
          </div>
          <div className="flex items-center mb-2">
            <label className="w-15 text-white f-14">Scope Level</label>
            <select className="w-30 p-2 bg-gray-800 text-white rounded f-14">
              <option>Select scope level</option>
            </select>
          </div>
          <div className="flex items-center mb-2">
            <label className="w-15 text-white f-14">Frequency Level</label>
            <select className="w-30 p-2 bg-gray-800 text-white rounded f-14">
              <option>Select frequency</option>
            </select>
          </div>
          <div className="flex items-center mb-2">
            <label className="w-15 text-white f-14">Timeline</label>
            <input type="date" className="w-30 p-2 bg-gray-800 text-white rounded f-14" />
          </div>
          <div className="flex items-center mb-2">
            <label className="w-15 text-white f-14">Assurance</label>
            <select className="w-30 p-2 bg-gray-800 text-white rounded f-14">
              <option>Select assurance</option>
            </select>
          </div>
          <div className="flex items-center mb-2">
            <label className="w-15 text-white f-14">Random Sampling</label>
            <input type="text" className="w-30 p-2 bg-gray-800 text-white rounded f-14" />
          </div>
        </div>
        <button className="mt-4 px-2 py-1 btn-success text-white rounded" onClick={handleReviewSampleClick}>Generate Sample</button>
      </div>
    </div>
  );
}
