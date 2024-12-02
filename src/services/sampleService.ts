import { SampleDto, SampleProofDto } from "@/types/sample";

export async function getSampleData(certificateId: string): Promise<SampleDto[]> {
    const response = await fetch(`/api/sample-data?certificateId=${certificateId}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch sample data');
    }
  
  return response.json();
}

export async function getSampleProofs(sampleId: string, proofCategory: number): Promise<SampleProofDto[]> {
    const response = await fetch(`/api/sample-proofs?sampleId=${sampleId}&proofCategory=${proofCategory}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch sample proofs');
    }
  
    return response.json();
  }
