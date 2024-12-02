import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { SampleProofDto } from '@/types/sample';
import { ProofCategory } from '@prisma/client';

export async function GET(request: NextRequest) {
    try {
      const searchParams = request.nextUrl.searchParams;
      const sampleId = searchParams.get('sampleId');
      const proofCategory = searchParams.get('proofCategory');
  
      if (!sampleId || !proofCategory) {
        return NextResponse.json(
          { error: 'Sample ID and Proof Category are required' },
          { status: 400 }
        );
      }
  
      const sampleProofs = await prisma.sampleProof.findMany({
        where: {
          AND: [
            { sampleId: parseInt(sampleId) },
            { proofCategory: { equals: proofCategory as ProofCategory } }
          ]
        }
      });
  
      if (!sampleProofs || sampleProofs.length === 0) {
        return NextResponse.json(
          { error: 'No sample proofs found' },
          { status: 404 }
        );
      }
  
      const response: SampleProofDto[] = sampleProofs.map(proof => ({
        sampleProofLink: proof.proofLink,
        sampleProofName: proof.proofName
      }));
  
      return NextResponse.json(response);
  
    } catch (error) {
      console.error('Error fetching sample proofs:', error);
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      );
    }
  }
