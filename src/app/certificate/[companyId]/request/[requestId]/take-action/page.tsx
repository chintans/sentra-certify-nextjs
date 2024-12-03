"use client";
import { useRouter, useParams } from 'next/navigation';
import '../../../../../../styles/globals.css';
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

  const request = {
    certificateName: 'GHG',
    requestDate: '2024-08-22',
    completionDate: '2024-08-31',
    status: 'Assigned',
    members: 'N/A',
    techReviewer: 'N/A',
    comments: 'No Comments',
  };

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

  return (
    <div className="p-8">
      <h1 className="text-white mb-8">New Request</h1>
      <div className="bg-[#1c1c24] p-6 rounded-lg">
        <table className="w-full text-left mb-4">
          <thead className="border border-gray-700 border-radius-8 overflow-hidden">
            <tr>
              <th className="text-gray-400 table-header">Certificate Name</th>
              <th className="text-gray-400 table-header">Request Date</th>
              <th className="text-gray-400 table-header">Completion Date</th>
              <th className="text-gray-400 table-header">Status</th>
              <th className="text-gray-400 table-header">Members</th>
              <th className="text-gray-400 table-header">Tech Reviewer</th>
            </tr>
          </thead>
          <tbody className="border border-gray-700 border-radius-8 overflow-hidden ">
            <tr className="border-t border-gray-700">
              <td className="py-2 text-white table-cell">{request.certificateName}</td>
              <td className="py-2 text-white table-cell">{request.requestDate}</td>
              <td className="py-2 text-white table-cell">{request.completionDate}</td>
              <td className="py-2 text-white table-cell">
                <span className={`px-2 py-1 rounded status ${getStatusClass(request.status)}`}>{request.status}</span>
              </td>
              <td className="py-2 text-white table-cell">{request.members}</td>
              <td className="py-2 text-white table-cell">{request.techReviewer}</td>
            </tr>
          </tbody>
        </table>
        <div className="flex space-x-4 mb-4">
          <button className="px-2 py-1 btn-success text-white rounded" onClick={handleGenerateSampleClick}>Generate Sample</button>
          <button className="px-2 py-1 btn-success text-white rounded" onClick={handleReviewSampleClick}>Review Sample</button>
        </div>
        <div>
          <h2 className="text-white mb-2">Comments</h2>
          <p className="text-white f-14 p-2 mt-3">{request.comments}</p>
        </div>
      </div>
    </div>
  );
}
