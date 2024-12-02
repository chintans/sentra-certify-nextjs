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