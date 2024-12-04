import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ProofCategory } from '@prisma/client';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sampleId = searchParams.get('sampleId');
    const proofCategory = searchParams.get('proofCategory');


    if (!sampleId || !proofCategory) {
      return NextResponse.json({
        error: 'Sample ID and Proof Category are required'
      }, { status: 400 });
    }

    const proofCategoryEnum = Object.values(ProofCategory)[Number(proofCategory)];
    

    const sampleProofs = await prisma.sampleProof.findMany({
      where: {
        sampleId: Number(sampleId),
        proofCategory: proofCategoryEnum,
      },
      select: {
        proofLink: true,
        proofName: true,
      }
    });

    return NextResponse.json({ 
      data: sampleProofs.map(proof => ({
        sampleProofLink: proof.proofLink,
        sampleProofName: proof.proofName,
      }))
    });

  } catch (error) {
    return NextResponse.json({
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}