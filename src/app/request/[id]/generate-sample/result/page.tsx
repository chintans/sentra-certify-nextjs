"use client";

import { useState } from 'react';

export default function GenerateSampleResultPage() {
  const [showProofDialog, setShowProofDialog] = useState(false);
  const [showLogDialog, setShowLogDialog] = useState(false);

  const data = [
    {
      docName: '2c_MB51',
      assetLevel: 'plant',
      scopeLevel: 'Scope 1',
      frequency: 'Daily',
      timeline: 'Apr, 2022',
      activityData: '18012887',
      proof: true,
      log: true,
    },
    {
      docName: '2d_ZRMS_PRD',
      assetLevel: 'site',
      scopeLevel: 'Scope 1',
      frequency: 'Heat',
      timeline: 'Apr, 2022',
      activityData: '203781',
      emissionFactor: '2789',
      proof: true,
      log: true,
    },
    {
      docName: '2e_ZSD_SR',
      assetLevel: 'Plant',
      scopeLevel: 'Scope 1',
      frequency: 'Heat',
      timeline: 'Apr, 2022',
      activityData: '188185',
      proof: true,
      log: true,
    },
  ];

  const handleProofClick = () => {
    setShowProofDialog(true);
  };

  const handleLogClick = () => {
    setShowLogDialog(true);
  };

  const handleCloseDialog = () => {
    setShowProofDialog(false);
    setShowLogDialog(false);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold text-white mb-8">New Request</h1>
      <div className="bg-[#1c1c24] p-6 rounded-lg">
        {data.map((item, index) => (
          <div key={index} className="border border-gray-700 p-4 mb-4 rounded">
            <div className="flex justify-between mb-2">
              <span className="text-white font-semibold">Doc Name</span>
              <span className="text-green-500">{item.docName}</span>
            </div>
            <div className="grid grid-cols-2 gap-4 text-white">
              <div>Asset Level: {item.assetLevel}</div>
              <div>Scope Level: {item.scopeLevel}</div>
              <div>Frequency: {item.frequency}</div>
              <div>Timeline: {item.timeline}</div>
              <div>Activity Data: {item.activityData}</div>
              {item.emissionFactor && <div>Emission Factor: {item.emissionFactor}</div>}
              <div onClick={handleProofClick} className="cursor-pointer">Proof: {item.proof ? '📎' : 'N/A'}</div>
              <div onClick={handleLogClick} className="cursor-pointer">Log: {item.log ? '📄' : 'N/A'}</div>
            </div>
          </div>
        ))}
      </div>

      {showProofDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-[#1c1c24] p-6 rounded-lg w-96">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-white">Proofs</h2>
              <button onClick={handleCloseDialog} className="text-white">✖</button>
            </div>
            <ul className="text-white">
              <li className="mb-2">Input Parameters - Date & Plant</li>
              <li className="mb-2">Input Parameters</li>
              <li className="mb-2">Output - First Page</li>
              <li>Output - Last Page with Total</li>
            </ul>
          </div>
        </div>
      )}

      {showLogDialog && (
        <div className="fixed inset-0 right-0 bg-black bg-opacity-50 flex justify-end">
          <div className="bg-[#1c1c24] p-6 rounded-lg w-[500px] h-full overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-white">Auditor Log</h2>
              <button onClick={handleCloseDialog} className="text-white">✖</button>
            </div>
            <div className="flex space-x-4 mb-4">
              <span className="text-white">Activity Data</span>
              <span className="text-white">Emissions Factor</span>
              <span className="text-white">Carbon Credits</span>
              <span className="text-white">Others</span>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg text-white">
              <p>Overall, it looks promising. The documentation seems to align with the quality standards, but I will need your technical expertise to ensure everything checks out.</p>
              <p className="text-right">Me</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg text-white mt-4">
              <p>Great to hear. Send over the details, and let's go through it together. Any specific areas you want me to pay extra attention to?</p>
              <p className="text-right">Kavita</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
