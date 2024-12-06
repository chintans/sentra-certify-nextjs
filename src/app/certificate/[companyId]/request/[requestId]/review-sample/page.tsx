"use client";
import { useState, useEffect } from 'react';
import type { JSX } from 'react';
import '../../../../../../styles/globals.css';
import * as Tooltip from '@radix-ui/react-tooltip';
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
      <div className="overflow-y-auto flex flex-col justify-end">
        <div className="bg-[#565357] mt-3 w-[75%] ms-auto p-3 border rounded">
          <div className="activity-data">
            Overall, it looks promising. The documentation seems to align with the quality standards, but I will need your technical expertise to ensure everything checks out.
          </div>
          <div className="mt-1 fw-lighter f-12">Me</div>
        </div>
        <div className="bg-[#565357] mt-3 w-[75%] p-3 border rounded">
          <div className="activity-data">
            Great to hear. Send over the details, and let&#39;s go through it together. Any specific areas you want me to pay extra attention to?
          </div>
          <div className="mt-1 fw-lighter f-12">Kavita</div>
        </div>
      </div>
    ),
    'Emissions Factor': (
      <div className="p-4 rounded text-white w-full">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#565357] ">
              <th className="text-left p-2 emission-factor">Driver</th>
              <th className="text-left p-2 emission-factor ">Emission Factor (tCO2e/t)</th>
              <th className="text-left p-2 emission-factor">Methodology</th>
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
      <div className="w-full">
      <div className="p-4 rounded-lg text-white w-full">
        <div className="flex justify-between mb-4 w-full">
          <div>
            <p className="f-14">Date</p>
            <p>3 Nov &#39;23 to 12 Dec &#39;23</p>
          </div>
          <div>
            <p className="f-14">Opening balance</p>
            <p>0</p>
          </div>
        </div>        
      </div>
      <div className="p-4 rounded-lg text-white w-full">
        <div className='w-full' >
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2 emission-factor">Date</th>
              <th className="text-left p-2 emission-factor">Sales order</th>
              <th className="text-left p-2 emission-factor">Amount</th>
              <th className="text-left p-2 emission-factor">Closing balance</th>
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
      </div>
      </div>
    ),
    'Others': (
      <div className="p-4 rounded-lg text-white">
        <table className="w-full">
          <thead className="table-light">
            <tr>
              <th scope="col" className="date-column emission-factor">Date</th>
              <th scope="col" className="emission-factor">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="date-column p-2">23 Apr 24</td>
              <td className="p-2"><p className="f-12">string</p></td>
            </tr>
            <tr className="border-b">
              <td className="date-column p-2">23 Apr 24</td>
              <td className="p-2"><p className="f-12">string</p></td>
            </tr>
            <tr className="border-b">
              <td className="date-column p-2">23 Apr 24</td>
              <td className="p-2"><p className="f-12">In the script.py file, a new line was added to print out the summary before pushing it to an external API. This change allows for better debugging by displaying the summary data before sending it to the API endpoint.</p></td>
            </tr>
            <tr className="border-b">
              <td className="date-column p-2">23 Apr 24</td>
              <td className="p-2"><p className="f-12">Here are the summarized changes in human-readable language: 1. Added new environment variables with empty values in the &quot;.env.example&quot; file: &quot;OPENAI_API_KEY&quot;, &quot;API_ENDPOINT&quot;, &quot;REPO_PATH&quot;, &quot;COMMIT_OLD&quot;, and &quot;COMMIT_NEW&quot;.</p></td>
            </tr>
            <tr className="border-b">
              <td className="date-column p-2">23 Apr 24</td>
              <td className="p-2"><p className="f-12">The changes to the script can be summarized as follows:

1. The script now loads environment variables from a .env file. The lines to do this were previously commented out, but have now been uncommented.

2. The AI model used to summarize the changes has been updated from &quot;gpt-3.5-turbo&quot; to &quot;gpt-4&quot;. This suggests the use of a newer or more advanced model.</p></td>
            </tr>
            <tr className="border-b">
              <td className="date-column p-2">02 May 24</td>
              <td className="p-2"><p className="f-12">The change made to the SQL script located in the ESA directory involves the addition of a print statement. Specifically, a line of code has been added that prints a demo test sentence along with the status code and API response.</p></td>
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
      <Tooltip.Provider delayDuration={200}>
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
                  <Tooltip.Root>
                      <Tooltip.Trigger asChild>
                      <span className="text-gray-400 ml-10 cursor-pointer">&#9432;</span> 
                      </Tooltip.Trigger>
                      <Tooltip.Portal>
                        <Tooltip.Content
                          className="bg-[#E9E9EA] px-4 py-2.5 rounded-lg text-sm shadow-xl max-w-md border border-[#2a2a36] animate-fadeIn tooltip"
                          sideOffset={5}
                          side="right"
                        >
                          <div className="font-normal leading-relaxed">{item.description || 'No description available'}</div>
                          <Tooltip.Arrow className="fill-[#1c1c24] stroke-[#2a2a36]" width={12} height={6} />
                        </Tooltip.Content>
                      </Tooltip.Portal>
                    </Tooltip.Root>
                  </h2>
                </div>
                <div className="flex justify-between text-white f-14 opacity-8">
                  <p>{ASSET_LEVEL_LABEL} <span className="result-span f-color">{item.assetLevel}</span></p>
                  <p>{SCOPE_LEVEL_LABEL} <span className="result-span f-color">{item.scopeLevel}</span></p>
                  <p>{FREQUENCY_LABEL} <span className="result-span f-color">{item.frequency}</span></p>
                  <p>{TIMELINE_LABEL} <span className="result-span f-color">{new Date(item.toDate).toLocaleDateString()}</span></p>
                  <p>{ACTIVITY_DATA_LABEL} <span className="result-span f-color">{item.activityData}</span></p>
                  <div onClick={() => handleProofClick(item.id)} className="cursor-pointer">{PROOF_LABEL}
                    <span className="result-span f-color">
                    📎
                    </span>
                  </div>
                  <div onClick={handleLogClick} className="cursor-pointer">{LOG_LABEL}
                    <span className="result-span f-color">
                    📄
                    </span>
                  </div>
                </div>
              </div>
            ))
          )} 
        </div>
      </Tooltip.Provider>

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
          <div className="bg-[#1c1c24] p-6 rounded-lg w-[500px] h-full overflow-y-auto log" onClick={(e) => e.stopPropagation()}>
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
            <div className="bg-[#2a2b35] p-4 rounded-lg text-white">
              {logContent[activeLogTab]}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
