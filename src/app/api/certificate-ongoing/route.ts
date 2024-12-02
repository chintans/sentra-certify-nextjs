import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { OngoingRequestDto } from '@/types/certificate';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const companyId = searchParams.get('companyId');

    if (!companyId) {
      return NextResponse.json(
        { error: 'Company ID is required' },
        { status: 400 }
      );
    }

    const certificateRequests = await prisma.certificateRequests.findMany({
      where: {
        AND: [
          { tenantId: companyId },
          { status: { not: 'NotStarted' } }
        ]
      },
      include: {
        certificateType: true,
        comments: true
      }
    });

    const response: OngoingRequestDto[] = certificateRequests.map(request => ({
      id: request.id.toString(),
      certificateName: request.certificateType.name,
      requestDate: request.requestDate,
      completionDate: request.dueDate,
      status: request.status,
      comments: request.comments.map(comment => ({
        sender: comment.senderName,
        comment: comment.comment
      }))
    }));

    return NextResponse.json(response);
    
  } catch (error) {
    console.error('Error fetching ongoing requests:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}