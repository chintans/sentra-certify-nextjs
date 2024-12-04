import axios, { AxiosResponse } from 'axios';
import { ProofCategory, SampleDto } from '@/types/sample';

export async function getSamplesByCertificateId(
    certificateId: string | number
): Promise<SampleDto[]> {
    const { data } = await axios.get('/api/sample-data', {
        params: { certificateId }
    });
    return data;
}

export async function getSampleProofs(
  sampleId: string | number,
  proofCategory: ProofCategory
): Promise<AxiosResponse> {
  const { data } = await axios.get('/api/sample-proofs', {
      params: { 
          sampleId,
          proofCategory 
      }
  });
  return data;
}