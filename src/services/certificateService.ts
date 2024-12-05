import axios from 'axios';
import {
  CertificateRequestListDto,
  CompanyResult,
  OngoingRequestDto,
} from "@/types/certificate";
import { UserDto } from '@/types/user';

export async function getCertificateRequests(
  companyId: number
): Promise<CertificateRequestListDto> {
  const { data } = await axios.get(`/api/certificate-requests-by-company`, {
    params: { companyId }
  });
  return data;
}

export async function getOngoingRequests(
  companyId: number
): Promise<OngoingRequestDto[]> {
  const { data } = await axios.get(`/api/certificate-ongoing`, {
    params: { companyId }
  });
  return data;
}

export async function getOngoingRequestById(
  requestId: number
): Promise<OngoingRequestDto> {
  const { data } = await axios.get(`/api/ongoing-request`, {
    params: { requestId }
  });
  return data;
}


export async function getCompaniesByEmail(
  email: string
): Promise<CompanyResult[]> {
  const { data } = await axios.get(`/api/companies`, {
    params: { email }
  });
  return data;
}

export async function getUsers(): Promise<UserDto[]> {
  const { data } = await axios.get('/api/users');
  return data;
}

interface TaskAllocationDto {
  certificateId: number;
  memberVerifierId: number;
  technicalVerifierId: number;
}

export async function assignTask(taskAllocation: TaskAllocationDto): Promise<void> {
  await axios.post('/api/users-mapping', taskAllocation);
}