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
    id: string;
    certificateName: string;
    requestDate: Date;
    completionDate: Date;
    status: string;
    comments: CommentsDto[];
  }

  export interface Company{
    name: string;
    tenantId: string;
    imageURl: string;
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