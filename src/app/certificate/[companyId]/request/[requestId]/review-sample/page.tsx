"use client";
import { useState } from 'react';
import '../.../../../../../../../styles/globals.css';

import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap.css';
import '../../../../../../styles/globals.css';
import {
  PROOFS_TITLE,
  PROOF_ITEMS,
  NEW_REQUEST_TITLE,
  DOC_NAME_LABEL,
  ASSET_LEVEL_LABEL,
  SCOPE_LEVEL_LABEL,
  FREQUENCY_LABEL,
  TIMELINE_LABEL,
  ACTIVITY_DATA_LABEL,
  PROOF_LABEL,
  LOG_LABEL,
  AUDITOR_LOG_TITLE
} from '../../../../../../constants/strings';

export default function ReviewSample() {
  // Use for actual data
  // const { companyId, requestId } = useParams();
  const [showProofDialog, setShowProofDialog] = useState(false);
  const [showLogDialog, setShowLogDialog] = useState(false);
  const [activeLogTab, setActiveLogTab] = useState('Activity Data');

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
      description: 'Upload a photo to personalize your profile.'
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
      description: 'View detailed analytics for this data point.'
    },
    {
      docName: '3d_Company Owned Vehicle_23-24',
      assetLevel: 'Plant',
      scopeLevel: 'Scope 1',
      frequency: 'Heat',
      timeline: 'Apr, 2022',
      activityData: '188185',
      proof: true,
      log: true,
      description: 'Enable or disable this feature with a single click.'
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

  const logTabs = [
    'Activity Data',
    'Emissions Factor',
    'Carbon Credits',
    'Others'
  ];

  const logContent: Record<string, JSX.Element> = {
    'Activity Data': (
      <div className="space-y-4">
        <div className="bg-gray-700 p-4 rounded-lg">
          <p>Overall, it looks promising. The documentation seems to align with the quality standards, but I will need your technical expertise to ensure everything checks out.</p>
          <p className="text-right font-semibold">Me</p>
        </div>
        <div className="bg-gray-700 p-4 rounded-lg">
          <p>Great to hear. Send over the details, and let&apos;s go through it together. Any specific areas you want me to pay extra attention to?</p>
          <p className="text-right font-semibold">Kavita</p>
        </div>
      </div>
    ),
    'Emissions Factor': (
      <div className="bg-gray-800 p-4 rounded-lg text-white">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Driver</th>
              <th className="text-left p-2">Emission Factor (tCO2e/t)</th>
              <th className="text-left p-2">Methodology</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2" colSpan={3}>
                <div className="text-center">No Data.</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    ),
    'Carbon Credits': (
      <div className="bg-gray-800 p-4 rounded-lg text-white">
        <div className="flex justify-between mb-4">
          <div>
            <p className="font-semibold">Date</p>
            <p>3 Nov `&apos;`23 to 12 Dec `&apos;`23</p>
          </div>
          <div>
            <p className="font-semibold">Opening balance</p>
            <p>0</p>
          </div>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Date</th>
              <th className="text-left p-2">Sales order</th>
              <th className="text-left p-2">Amount</th>
              <th className="text-left p-2">Closing balance</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2" colSpan={4}>
                <div className="text-center">No Data.</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    ),
    'Others': (
      <div className="bg-gray-800 p-4 rounded-lg text-white">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Date</th>
              <th className="text-left p-2">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="p-2">23 Apr 24</td>
              <td className="p-2">string</td>
            </tr>
            <tr className="border-b">
              <td className="p-2">23 Apr 24</td>
              <td className="p-2">string</td>
            </tr>
            <tr className="border-b">
              <td className="p-2">23 Apr 24</td>
              <td className="p-2">In the script.py file, a new line was added to print out the summary before pushing it to an external API. This change allows for better debugging by displaying the summary data before sending it to the API endpoint.</td>
            </tr>
            <tr className="border-b">
              <td className="p-2">23 Apr 24</td>
              <td className="p-2">Here are the summarized changes in human-readable language: 1. Added new environment variables with empty values in the `.env.example` file: `OPENAI_API_KEY`.</td>
            </tr>
          </tbody>
        </table>
      </div>
    ),
  };

  const handleLogTabClick = (tab: string) => {
    setActiveLogTab(tab);
  };

  return (
    <div className="p-8">
      <h1 className="text-white mb-8">{NEW_REQUEST_TITLE}</h1>
      <div className="bg-[#1c1c24] p-6 rounded-lg">
        {data.map((item, index) => (
          <div key={index} className="mb-4 border border-gray-700 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-white opacity-8 f-14">{DOC_NAME_LABEL}
                <span className="ml-10 f-color cursor-pointer">{item.docName}</span>
                <Tooltip placement="top" overlay={`${item.description}`} overlayStyle={{ backgroundColor: '#35363f', color: '#fff', padding: '5px 10px', borderRadius: '4px' }}>
                  <span className="text-gray-400 ml-10 cursor-pointer">&#9432;</span>
                </Tooltip>
              </h2>
            </div>
            <div className="flex justify-between text-white f-14 opacity-8">
              <p>{ASSET_LEVEL_LABEL} <span className="result-span f-color">{item.assetLevel}</span></p>
              <p>{SCOPE_LEVEL_LABEL} <span className="result-span f-color">{item.scopeLevel}</span></p>
              <p>{FREQUENCY_LABEL} <span className="result-span f-color">{item.frequency}</span></p>
              <p>{TIMELINE_LABEL} <span className="result-span f-color">{item.timeline}</span></p>
              <p>{ACTIVITY_DATA_LABEL} <span className="result-span f-color">{item.activityData}</span></p>
              <div onClick={handleProofClick} className="cursor-pointer">{PROOF_LABEL}:
                <span className="result-span f-color">
                  {item.proof ? '📎' : 'N/A'}
                </span>
              </div>
              <div onClick={handleLogClick} className="cursor-pointer">{LOG_LABEL}:
                <span className="result-span f-color">
                  {item.log ? '📄' : 'N/A'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showProofDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center" onClick={handleCloseDialog}>
          <div className="bg-[#1c1c24] p-6 rounded-lg w-96" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-white">{PROOFS_TITLE}</h2>
              <button onClick={handleCloseDialog} className="text-white">✖</button>
            </div>
            <ul className="text-white space-y-2">
              {PROOF_ITEMS.map((item, index) => (
                <li key={index} className="border border-gray-700 p-2 rounded">{item}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {showLogDialog && (
        <div className="fixed inset-0 right-0 bg-black bg-opacity-50 flex justify-end" onClick={handleCloseDialog}>
          <div className="bg-[#1c1c24] p-6 rounded-lg w-[500px] h-full overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl text-white">{AUDITOR_LOG_TITLE}</h2>
              <button onClick={handleCloseDialog} className="text-white">✖</button>
            </div>
            <div className="flex space-x-4 mb-4 font-semibold">
              {logTabs.map((tab) => (
                <span
                  key={tab}
                  className={`cursor-pointer ${activeLogTab === tab ? 'border-b-2 text-white border-white-500' : 'text-blue hover:hover:border-b-2 hover:border-[#6261cc]'}`}
                  onClick={() => handleLogTabClick(tab)}
                >
                  {tab}
                </span>
              ))}
            </div>
            <div className="bg-gray-800 p-4 rounded-lg text-white">
              {logContent[activeLogTab]}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
