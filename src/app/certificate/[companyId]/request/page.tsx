"use client";
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import '../../../../styles/globals.css';
import { 
  ACCEPT_ASSIGN_BUTTON_TEXT, 
  INPROGRESSTEXT,
  NOTSTARTEDTEXT,
  COMPLETEDTEXT,
  ACTIONREQUIREDTEXT,
  DELAYEDTEXT,
  ASSIGNEDTEXT,
  REQUEST_STATUS_INPROGRESS,
  REQUEST_STATUS_NOTSTARTED,
  REQUEST_STATUS_COMPLETED,
  REQUEST_STATUS_ACTIONREQUIRED,
  REQUEST_STATUS_DELAYED,
  REQUEST_STATUS_ASSIGNED,
  NEW_REQUEST_TAB, 
  ASSIGNED_REQUEST_TAB, 
  REQUEST_DATE_HEADER, 
  COMPLETION_DATE_HEADER, 
  STATUS_HEADER, 
  ASSIGN_BUTTON_TEXT,
  CANCEL_BUTTON_TEXT 
} from '../../../../constants/strings';

export default function CompanyRequest() {
  const router = useRouter();
  const { companyId } = useParams();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(NEW_REQUEST_TAB);

  const newRequests = [
    {
      id: 1,
      certificateName: 'GHG',
      requestDate: 'Aug 22, 2024',
      completionDate: 'Aug 31, 2024',
      status: 'Assigned',
    },
    {
      id: 2,
      certificateName: 'RS',
      requestDate: 'Jul 1, 2024',
      completionDate: 'Jul 4, 2024',
      status: 'Not Started',
    },
    {
      id: 4,
      certificateName: 'RS',
      requestDate: 'Jul 1, 2024',
      completionDate: 'Jul 4, 2024',
      status: 'Not Started',
    },
  ];

  const ongoingRequests = [
    {
      id: 3,
      certificateName: 'GHG',
      requestDate: '2024-08-22',
      completionDate: '2024-08-31',
      status: 'Assigned',
      members: 'N/A',
      techReviewer: 'N/A',
    },
    {
      id: 4,
      certificateName: 'WSA',
      requestDate: '2024-07-15',
      completionDate: '2024-07-30',
      status: 'Assigned',
      members: 'N/A',
      techReviewer: 'N/A',
    },
  ];

  function getStatusClass(status: string): string {
    switch (status) {
      case REQUEST_STATUS_INPROGRESS:
        return INPROGRESSTEXT;
      case REQUEST_STATUS_NOTSTARTED:
        return NOTSTARTEDTEXT;
      case REQUEST_STATUS_COMPLETED:
        return COMPLETEDTEXT;
      case REQUEST_STATUS_ACTIONREQUIRED:
        return ACTIONREQUIREDTEXT;
      case REQUEST_STATUS_DELAYED:
        return DELAYEDTEXT;
      case REQUEST_STATUS_ASSIGNED:
        return ASSIGNEDTEXT;
      default:
        return '';
    }
  }

  const handleAssignClick = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const handleRowClick = (id: number) => {
    router.push(`/certificate/${companyId}/request/${id}/take-action`);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const dialogElement = document.getElementById('assign-dialog');
      if (dialogElement && !dialogElement.contains(event.target as Node)) {
        setIsDialogOpen(false);
      }
    };

    if (isDialogOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isDialogOpen]);

  return (
    <div>
      <div className="flex justify-between items-center page-header">
        <h1>New Request</h1>
      </div>
      <div className="p-7">
        <div className="flex space-x-4 mb-4">
          <button
            className={`px-2 py-1 f-14 ${activeTab === NEW_REQUEST_TAB ? 'request-tab border-b-2 border-green-500' : 'text-white'}`}
            onClick={() => handleTabClick(NEW_REQUEST_TAB)}
          >
            {NEW_REQUEST_TAB}
          </button>
          <button
            className={`px-2 py-1 f-14 ${activeTab === ASSIGNED_REQUEST_TAB ? 'request-tab border-b-2 border-green-500' : 'text-white'}`}
            onClick={() => handleTabClick(ASSIGNED_REQUEST_TAB)}
          >
            {ASSIGNED_REQUEST_TAB}
          </button>
        </div>

        {activeTab === NEW_REQUEST_TAB && (
          <div className='new-request-list'>
            <div className="table-head flex justify-between bg-grey-1 p-2 rounded border">
              <div className="table-col">
                <div className="text-left">Certificate Name</div>
              </div>
              <div className="table-col">
                <div className="text-left">{REQUEST_DATE_HEADER}</div>
              </div>
              <div className="table-col">
                <div className="text-left">{COMPLETION_DATE_HEADER}</div>
              </div>
              <div className="table-col">
                <div className="text-left">{STATUS_HEADER}</div>
              </div>
              <div className="table-col">
                <div className="text-left"></div>
              </div>
            </div>

            <div className="table-body mt-3 bg-grey-2 rounded border ">
              {newRequests.map((request, index) => (
                <div key={index} className="table-row flex justify-between">
                  <div className="table-cell">
                    <div className="text-left">{request.certificateName}</div>
                  </div>
                  <div className="table-cell">
                    <div className="text-left">{request.requestDate}</div>
                  </div>
                  <div className="table-cell">
                    <div className="text-left">{request.completionDate}</div>
                  </div>
                  <div className="table-cell">
                    <div className={`status-tag ${getStatusClass(request.status)}`}>
                      {request.status}
                    </div>
                  </div>
                  <div className="table-cell">
                    <button 
                      className="btn btn-success"
                      onClick={(e) => { e.stopPropagation(); handleAssignClick(); }}
                    >
                      {ACCEPT_ASSIGN_BUTTON_TEXT}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === ASSIGNED_REQUEST_TAB && (
          <div className="ongoing-request-list">
            <div className="table-head flex justify-between bg-grey-1 p-2 rounded border">
              <div className="table-col">
                <div className="text-left">Certificate Name</div>
              </div>
              <div className="table-col">
                <div className="text-left">{REQUEST_DATE_HEADER}</div>
              </div>
              <div className="table-col">
                <div className="text-left">{COMPLETION_DATE_HEADER}</div>
              </div>
              <div className="table-col">
                <div className="text-left">{STATUS_HEADER}</div>
              </div>
              <div className="table-col">
                <div className="text-left">Members</div>
              </div>
              <div className="table-col">
                <div className="text-left">Tech Reviewer</div>
              </div>
            </div>

            <div className="table-body mt-3 bg-grey-2 rounded border">
              {ongoingRequests.map((request, index) => (
                <div key={index} className="table-row flex justify-between cursor-pointer" onClick={() => handleRowClick(request.id)}>
                  <div className="table-cell">
                    <div className="text-left">{request.certificateName}</div>
                  </div>
                  <div className="table-cell">
                    <div className="text-left">{request.requestDate}</div>
                  </div>
                  <div className="table-cell">
                    <div className="text-left">{request.completionDate}</div>
                  </div>
                  <div className="table-cell">
                    <div className={`status-tag ${getStatusClass(request.status)}`}>
                      {request.status}
                    </div>
                  </div>
                  <div className="table-cell">
                    <div className="text-left">{request.members}</div>
                  </div>
                  <div className="table-cell">
                    <div className="text-left">{request.techReviewer}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {isDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div id="assign-dialog" className="bg-[#1c1c24] p-6 rounded-lg w-96">
            <div className="flex justify-between items-center mb-4 border-b-2 border-gray-700 pb-2">
              <h2 className="text-xl text-white">Assign</h2>
              <button onClick={handleCloseDialog} className="text-white">&times;</button>
            </div>
            <div className="mb-4">
              <label className="block f-14 mb-1">Members</label>
              <select className="w-full p-2 bg-gray-800 f-12 text-white rounded">
                <option>Select Member</option>
                {/* Add member options here */}
              </select>
            </div>
            <div className="mb-4">
              <label className="block f-14 mb-1">Technical Reviewer</label>
              <select className="w-full p-2 bg-gray-800 f-12 text-white rounded">
                <option>Select Technical Reviewer</option>
                {/* Add reviewer options here */}
              </select>
            </div>
            <div className="flex justify-end">
              <button className="px-2 py-1 f-14 text-white rounded mr-2 btn-success" onClick={handleCloseDialog}>{ASSIGN_BUTTON_TEXT }</button>
              <button onClick={handleCloseDialog} className="px-2 py-1 f-14 bg-gray-700 text-white rounded btn-cancel">{CANCEL_BUTTON_TEXT}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
