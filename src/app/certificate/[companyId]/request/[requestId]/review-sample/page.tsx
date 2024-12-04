"use client";
import { useState, useEffect } from 'react';
import '../../../../../../styles/globals.css';
import {
  PROOFS_TITLE,
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
import { getSampleProofs, getSamplesByCertificateId } from '../../../../../../services/sampleService'; // Adjust the import path
import { useParams } from 'next/navigation';
import { ProofCategory, SampleDto, SampleProofDto } from '../../../../../../types/sample';


export default function ReviewSample() {
  const params = useParams();
  const [showProofDialog, setShowProofDialog] = useState(false);
  const [showLogDialog, setShowLogDialog] = useState(false);
  const [activeLogTab, setActiveLogTab] = useState('Activity Data');
  const [samples, setSamples] = useState<SampleDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [proofs, setProofs] = useState<SampleProofDto[]>([]);

  useEffect(() => {
    const fetchSamples = async () => {
      try {
        setIsLoading(true);
        const requestId = params.requestId;
        if (!requestId) {
          throw new Error('Request ID not found in URL');
        }
        
        const data = await getSamplesByCertificateId(Number(requestId));
        setSamples(data);
      } catch (error) {
        console.error('Error fetching samples:', error);
        setError('Failed to fetch samples data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSamples();
  }, [params.companyId, params.requestId]);

  const handleProofClick = async (id: string) => {
    try {
      setIsLoading(true);
      const response = await getSampleProofs(id, ProofCategory.ActivityData);
      // Extract the data array from the response
      console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",response);
      setProofs(response.data || []); // Add null check with default empty array
      setShowProofDialog(true);
    } catch (error) {
      console.error('Error fetching proofs:', error);
    } finally {
      setIsLoading(false);
    }
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
        {isLoading ? (
          <div className="text-white text-center py-4">Loading...</div>
        ) : error ? (
          <div className="text-red-500 text-center py-4">{error}</div>
        ) : samples.length === 0 ? (
          <div className="text-white text-center py-4">No samples found</div>
        ) : (
          samples.map((item, index) => (
            <div key={index} className="mb-4 border border-gray-700 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-white opacity-8 f-14">{DOC_NAME_LABEL}
                  <span className="ml-10 f-color cursor-pointer">{item.docName}</span>
                    {/* Todo: Implement in future */}
                  {/* <Tooltip 
                    placement="top" 
                    overlay={`${item.description}`} 
                    overlayStyle={{ 
                      backgroundColor: '#35363f', 
                      color: '#fff', 
                      padding: '5px 10px', 
                      borderRadius: '4px' 
                    }}
                  >
                    <span className="text-gray-400 ml-10 cursor-pointer">&#9432;</span>
                  </Tooltip> */}
                </h2>
              </div>
              <div className="flex justify-between text-white f-14 opacity-8">
                <p>{ASSET_LEVEL_LABEL} <span className="result-span f-color">{item.assetLevel}</span></p>
                <p>{SCOPE_LEVEL_LABEL} <span className="result-span f-color">{item.scopeLevel}</span></p>
                <p>{FREQUENCY_LABEL} <span className="result-span f-color">{item.frequency}</span></p>
                <p>{TIMELINE_LABEL} <span className="result-span f-color">{new Date(item.toDate).toLocaleDateString()}</span></p>
                <p>{ACTIVITY_DATA_LABEL} <span className="result-span f-color">{item.activityData}</span></p>
                <div onClick={() => handleProofClick(item.id)} className="cursor-pointer">{PROOF_LABEL}:
                  <span className="result-span f-color">
                  📎
                  </span>
                </div>
                <div onClick={handleLogClick} className="cursor-pointer">{LOG_LABEL}:
                  <span className="result-span f-color">
                  📄
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {showProofDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center" onClick={handleCloseDialog}>
          <div className="bg-[#1c1c24] rounded-lg proof-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4 proof-header border-bottom">
              <h2 className="text-xl font-semibold text-white">{PROOFS_TITLE}</h2>
              <button onClick={handleCloseDialog} className="text-white">✖</button>
            </div>
            <div className="modal-body p-6 ">
            {proofs?.map((item, index) => (
                <div key={index} className="py-3 border-bottom">
                  <a
                    href={item.sampleProofLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white"
                  >
                    <span>
                      {item.sampleProofName}
                    </span>
                  </a>
                </div>
              ))}
            </div>
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
