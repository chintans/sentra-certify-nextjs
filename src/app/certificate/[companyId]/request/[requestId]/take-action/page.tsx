"use client";
import { useRouter, useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import '../../../../../../styles/globals.css';
import { getOngoingRequestById } from '../../../../../../services/certificateService';
import { OngoingRequestDto } from '../../../../../../types/certificate';
import { 
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
} from '../../../../../../constants/strings';


export default function TakeAction() {
  const router = useRouter();
  const { companyId, requestId } = useParams();
  const [request, setRequest] = useState<OngoingRequestDto | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const data = await getOngoingRequestById(Number(requestId));
        setRequest(data);
      } catch (error) {
        console.error('Error fetching request:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequest();
  }, [requestId]);

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

  const handleGenerateSampleClick = () => {
    router.push(`/certificate/${companyId}/request/${requestId}/generate-sample`);
  };

  const handleReviewSampleClick = () => {
    router.push(`/certificate/${companyId}/request/${requestId}/review-sample`);
  };

  if (loading || !request) {
    return <div className="p-8 text-white">Loading...</div>;
  }

  return (
    <div>
       <div className="flex justify-between items-center page-header">
       <h1 className="text-white mb-8">New Request</h1>
      </div>
    <div className="p-8">
      <div className="bg-[#1c1c24] p-6 rounded-lg">
          {/* Header */}
          <div className="table-head flex justify-between bg-grey-1 rounded border review-request">
              <div className="table-col">
                <div className="text-left">Certificate Name</div>
              </div>
              <div className="table-col">
                <div className="text-left">Request Date</div>
              </div>
              <div className="table-col">
                <div className="text-left">Completion Date</div>
              </div>
              <div className="table-col">
                <div className="text-left">Status</div>
              </div>
              <div className="table-col">
                <div className="text-left">Member</div>
              </div>
              <div className="table-col">
                <div className="text-left">Tack Reviwer</div>
              </div>
            </div>
          {/* Body */}
          <div className="table-body bg-grey-2 rounded border review-request">
               <div className="table-row flex justify-between cursor-pointer">
               <div className="table-cell">
                 <div className="text-left">{request.certificateName}</div>
               </div>
               <div className="table-cell">
                 <div className="text-left">{new Date(request.requestDate).toLocaleDateString()}</div>
               </div>
               <div className="table-cell">
                 <div className="text-left">{new Date(request.completionDate).toLocaleDateString()}</div>
               </div>
               <div className="table-cell">
                 <span className={`px-2 py-1 rounded status-tag ${getStatusClass(request.status)}`}>{request.status}</span>
               </div>
               <div className="table-cell">
                  <div className="text-left"> {request.memberVerifier!=='undefined undefined' ? request.memberVerifier : 'N/A'}</div>
               </div> 
               <div className="table-cell">
                  <div className="text-left">{request.technicalVerifier!=='undefined undefined' ? request.technicalVerifier : 'N/A'}</div>
               </div> 
             </div>
          <div className="flex space-x-4 p-4 mb-4">
          <button 
            className="px-2 py-1 btn-success text-white rounded" 
            onClick={handleGenerateSampleClick}
          >
            Generate Sample
          </button>
          <button 
            className="px-2 py-1 btn-success text-white rounded" 
            onClick={handleReviewSampleClick}
          >
            Review Sample
          </button>
        </div>
        <div>
          <h2 className="text-white mb-2 pl-2">Comments</h2>
          {request.comments.map((comment, index) => (
            <p key={index} className="text-white opacity-8 f-14 pl-2 mt-3">{comment.comment}</p>
          ))}
        </div>
      </div></div>
      </div>
    </div>
  );
}