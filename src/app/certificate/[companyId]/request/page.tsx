"use client";
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import '../../../../styles/globals.css';
import { getCertificateRequests, getOngoingRequests, getUsers } from '../../../../services/certificateService';
import { OngoingRequestDto, RequestDto } from '../../../../types/certificate';
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
  NEW_REQUEST_TITLE, 
  NEW_REQUEST_TAB, 
  ASSIGNED_REQUEST_TAB, 
  REQUEST_DATE_HEADER, 
  COMPLETION_DATE_HEADER, 
  STATUS_HEADER, 
  ACTION_HEADER,
  ASSIGN_BUTTON_TEXT,
  CANCEL_BUTTON_TEXT 
} from '../../../../constants/strings';
import { UserDto } from '@/types/user';

export default function CompanyRequest() {
  const router = useRouter();
  const { companyId } = useParams();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(NEW_REQUEST_TAB);
  const [newRequests, setNewRequests] = useState<RequestDto[]>([]);
  const [ongoingRequests, setOngoingRequests] = useState<OngoingRequestDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<UserDto[]>([]);
  const [selectedMember, setSelectedMember] = useState("");
  const [selectedReviewer, setSelectedReviewer] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [newRequestsData, ongoingRequestsData] = await Promise.all([
          getCertificateRequests(Number(companyId)),
          getOngoingRequests(Number(companyId))
        ]);
        
        setNewRequests(newRequestsData.requests);
        setOngoingRequests(ongoingRequestsData);
      } catch (error) {
        console.error('Error fetching requests:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [companyId]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getUsers();
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

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
    setSelectedMember("");
    setSelectedReviewer("");
  };

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const handleRowClick = (id: number) => {
    router.push(`/certificate/${companyId}/request/${id}/take-action`);
  };

  const handleAssign = () => {
    // Add your assign logic here
    console.log('Assigned to:', { member: selectedMember, reviewer: selectedReviewer });
    handleCloseDialog();
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const dialogElement = document.getElementById('assign-dialog');
      if (dialogElement && !dialogElement.contains(event.target as Node)) {
        handleCloseDialog();
      }
    };

    if (isDialogOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isDialogOpen]);

  if (loading) {
    return <div className="p-8 text-white">Loading...</div>;
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-white">{NEW_REQUEST_TITLE}</h1>
      </div>
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
        <div className="bg-[#1c1c24] p-6 rounded-lg">
          <div className="grid grid-cols-5 gap-4 border border-gray-700 rounded-lg overflow-hidden">
            {/* Header */}
            <div className="col-span-5 grid grid-cols-5 gap-4 p-4 border-b border-gray-700 bg-[#1c1c24]">
              <div className="text-gray-400">Certificate Name</div>
              <div className="text-gray-400">{REQUEST_DATE_HEADER}</div>
              <div className="text-gray-400">{COMPLETION_DATE_HEADER}</div>
              <div className="text-gray-400">{STATUS_HEADER}</div>
              <div className="text-gray-400">{ACTION_HEADER}</div>
            </div>
            
            {/* Body */}
            {newRequests.map((request, index) => (
              <div key={index} className="col-span-5 grid grid-cols-5 gap-4 p-4 border-t border-gray-700">
                <div className="text-white">{request.certificateType}</div>
                <div className="text-white">{new Date(request.requestDate).toLocaleDateString()}</div>
                <div className="text-white">{new Date(request.completionDate).toLocaleDateString()}</div>
                <div className="text-white">
                  <span className={`px-2 py-1 rounded status ${getStatusClass(request.status)}`}>{request.status}</span>
                </div>
                <div>
                  <button className="px-4 py-2 bg-green-500 text-white rounded btn-success" 
                          onClick={(e) => { e.stopPropagation(); handleAssignClick(); }}>
                    {ACCEPT_ASSIGN_BUTTON_TEXT}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === ASSIGNED_REQUEST_TAB && (
        <div className="bg-[#1c1c24] p-6 rounded-lg">
          <div className="grid grid-cols-6 gap-4 border border-gray-700 rounded-lg overflow-hidden">
            {/* Header */}
            <div className="col-span-6 grid grid-cols-6 gap-4 p-4 border-b border-gray-700 bg-[#1c1c24]">
              <div className="text-gray-400">Certificate Name</div>
              <div className="text-gray-400">{REQUEST_DATE_HEADER}</div>
              <div className="text-gray-400">{COMPLETION_DATE_HEADER}</div>
              <div className="text-gray-400">{STATUS_HEADER}</div>
              <div className="text-gray-400">Members</div>
              <div className="text-gray-400">Tech Reviewer</div>
            </div>

            {/* Body */}
            {ongoingRequests.map((request, index) => (
              <div key={index} 
                   className="col-span-6 grid grid-cols-6 gap-4 p-4 border-t border-gray-700 cursor-pointer" 
                   onClick={() => handleRowClick(request.id)}>
                <div className="text-white">{request.certificateName}</div>
                <div className="text-white">{new Date(request.requestDate).toLocaleDateString()}</div>
                <div className="text-white">{new Date(request.completionDate).toLocaleDateString()}</div>
                <div className="text-white">
                  <span className={`px-2 py-1 rounded status ${getStatusClass(request.status)}`}>{request.status}</span>
                </div>
                <div className="text-white">{request.members}</div>
                <div className="text-white">{request.technicalReviewer}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {isDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div id="assign-dialog" className="bg-[#1c1c24] p-6 rounded-lg w-96">
            <div className="flex justify-between items-center mb-4 border-b-2 border-gray-700 pb-2">
              <h2 className="text-xl text-white">Assign</h2>
              <button onClick={handleCloseDialog} className="text-white">&times;</button>
            </div>
            <div className="mb-4">
              <label className="block f-14 mb-1">Members</label>
              <select 
                className="w-full p-2 bg-gray-800 f-12 text-white rounded"
                value={selectedMember}
                onChange={(e) => setSelectedMember(e.target.value)}
              >
                <option value="">Select Member</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.email}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block f-14 mb-1">Technical Reviewer</label>
              <select 
                className="w-full p-2 bg-gray-800 f-12 text-white rounded"
                value={selectedReviewer}
                onChange={(e) => setSelectedReviewer(e.target.value)}
              >
                <option value="">Select Technical Reviewer</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.email}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-end">
              <button 
                className="px-2 py-1 f-14 text-white rounded mr-2 btn-success" 
                onClick={handleAssign}
                disabled={!selectedMember || !selectedReviewer}
              >
                {ASSIGN_BUTTON_TEXT}
              </button>
              <button 
                onClick={handleCloseDialog} 
                className="px-2 py-1 f-14 bg-gray-700 text-white rounded btn-cancel"
              >
                {CANCEL_BUTTON_TEXT}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}