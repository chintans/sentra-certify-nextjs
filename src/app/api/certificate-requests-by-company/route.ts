import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; 
import { CertificateRequestListDto } from '@/types/certificate';
import { CertificateRequests } from '@prisma/client/edge';

export async function GET(request: NextRequest) {
  try {
    // Get companyId from search params
    const searchParams = request.nextUrl.searchParams;
    const companyId = searchParams.get('companyId');

    if (!companyId) {
      return NextResponse.json(
        { error: 'Company ID is required' },
        { status: 400 }
      );
    }

    const [requests, company] = await Promise.all([
      prisma.certificateRequests.findMany({
        where: {
          companyId: Number(companyId)
        },
        include: {
          certificateType: true
        }
      }),
      prisma.company.findFirst({
        where: {
          id: Number(companyId)
        }
      })
    ]);

    if (!company) {
      return NextResponse.json(
        { error: 'Company not found' },
        { status: 404 }
      );
    }

    const response: CertificateRequestListDto = {
      requests: requests.map((request: CertificateRequests & { certificateType: { name: string } }) => ({
        id: request.id,
        certificateType: request.certificateType.name,
        customerName: company.name,
        requestDate: request.requestDate,
        completionDate: request.dueDate,
        status: request.status,
        stage: request.stage
      }))
    };

    return NextResponse.json(response);
    
  } catch (error) {
    console.error('Error fetching certificate requests:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}