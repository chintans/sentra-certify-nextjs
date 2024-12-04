import axios from 'axios';
import { ProofCategory, SampleDto, SampleProofDto } from '@/types/sample';

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
): Promise<SampleProofDto[]> {
  const { data } = await axios.get('/api/sample-proofs', {
      params: { 
          sampleId,
          proofCategory 
      }
  });
  return data;
}