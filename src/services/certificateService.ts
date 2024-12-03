import axios from 'axios';
import {
  CertificateRequestListDto,
  OngoingRequestDto,
} from "@/types/certificate";

export async function getCertificateRequests(
  companyId: string
): Promise<CertificateRequestListDto> {
  const { data } = await axios.get(`/api/certificate-requests-by-company`, {
    params: { companyId }
  });
  return data;
}

export async function getOngoingRequests(
  companyId: string
): Promise<OngoingRequestDto[]> {
  const { data } = await axios.get(`/api/certificate-ongoing`, {
    params: { companyId }
  });
  return data;
}

export async function getOngoingRequestById(
  requestId: string
): Promise<OngoingRequestDto> {
  const { data } = await axios.get(`/api/ongoing-request`, {
    params: { requestId }
  });
  return data;
}