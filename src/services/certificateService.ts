import {
  CertificateRequestListDto,
  OngoingRequestDto,
} from "@/types/certificate";

export async function getCertificateRequests(
  companyId: string
): Promise<CertificateRequestListDto> {
  const response = await fetch(
    `/api/certificate-requests-by-company?companyId=${companyId}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch certificate requests");
  }

  return response.json();
}

export async function getOngoingRequests(
  companyId: string
): Promise<OngoingRequestDto[]> {
  const response = await fetch(
    `/api/certificate-ongoing?companyId=${companyId}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch ongoing requests");
  }

  return response.json();
}

export async function getOngoingRequestById(
  requestId: string
): Promise<OngoingRequestDto> {
  const response = await fetch(`/api/ongoing-request?requestId=${requestId}`);

  if (!response.ok) {
    throw new Error("Failed to fetch ongoing request");
  }

  return response.json();
}
