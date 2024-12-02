import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { SampleDto } from '@/types/sample';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const certificateId = searchParams.get('certificateId');

    if (!certificateId) {
      return NextResponse.json(
        { error: 'Certificate ID is required' },
        { status: 400 }
      );
    }

    const sampleDataList = await prisma.sampleData.findMany({
      where: {
        certificateRequestId: parseInt(certificateId)
      }
    });

    const response: SampleDto[] = sampleDataList.map(sample => ({
      id: sample.id.toString(),
      assetLevel: sample.assetLevel,
      docName: sample.docName,
      scopeLevel: sample.scopeName,
      frequency: sample.frequency,
      activityData: sample.activityDataValue,
      emissionFactor: sample.emissionFactor,
      absoulute: sample.absolute,
      intensity: sample.intensity,
      fromDate: sample.fromDate,
      toDate: sample.toDate,
      description: sample.description
    }));

    return NextResponse.json(response);
    
  } catch (error) {
    console.error('Error fetching sample data:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}