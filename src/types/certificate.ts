export interface RequestDto {
    id: number;
    certificateType: string;
    customerName: string;
    requestDate: Date;
    completionDate: Date;
    status: string;
    stage: string;
  }
  
  export interface CertificateRequestListDto {
    requests: RequestDto[];
  }

  export interface CommentsDto {
    sender: string;
    comment: string;
  }
  
  export interface OngoingRequestDto {
    id: number;
    certificateName: string;
    requestDate: Date;
    completionDate: Date;
    status: string;
    comments: CommentsDto[];
    members?: string;
    technicalReviewer?: string;
  }

  export interface Company{
    name: string;
    tenantId: string;
    imageUrl: string | null;
    certificateRequests: {
        tenantId: string;
        status: string;
    }[];
  }

  export interface CompanyResult{
    name: string;
    companyId: string;
    imageUrl: string;
    onGoing: number;
    completed: number;
  }

  export interface Comment{
    senderName: string;
    comment: string;
  }

  export interface CompanyRequestCountDto {
    name: string;
    companyId: number;
    imageUrl: string | null;
    onGoing: number;
    completed: number;
}