import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { OngoingRequestDto, Comment } from '@/types/certificate';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const requestId = searchParams.get('requestId');

    if (!requestId) {
      return NextResponse.json(
        { error: 'Request ID is required' },
        { status: 400 }
      );
    }

    const certificateRequest = await prisma.certificateRequests.findFirst({
      where: {
        AND: [
          { id: parseInt(requestId) },
          { status: { not: 'NotStarted' } }
        ]
      },
      include: {
        certificateType: true,
        comments: true
      }
    });

    if (!certificateRequest) {
      return NextResponse.json(
        { error: 'Request not found' },
        { status: 404 }
      );
    }

    const response: OngoingRequestDto = {
      id: certificateRequest.id,
      certificateName: certificateRequest.certificateType.name,
      requestDate: certificateRequest.requestDate,
      completionDate: certificateRequest.dueDate,
      status: certificateRequest.status,
      comments: certificateRequest.comments.map((comment: Comment) => ({
        sender: comment.senderName,
        comment: comment.comment
      }))
    };

    return NextResponse.json(response);
    
  } catch (error) {
    console.error('Error fetching ongoing request:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}