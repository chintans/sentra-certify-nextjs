import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: Request,
  context: { params: Promise<{ tenantId: string }> }
) {
  const { tenantId } = await context.params;
  console.log('Received tenantId:', tenantId); // Add this log

  try {
    const cleanTenantId = tenantId.replace(/['"]/g, '');
    console.log('Clean tenantId:', cleanTenantId); // Add this log

    const company = await prisma.company.findFirst({
      where: {
        tenantId: cleanTenantId
      },
      select: {
        id: true
      }
    });

    console.log('Found company:', company); // Add this log

    if (!company) {
      return NextResponse.json(
        { error: 'Company not found for this tenant' },
        { status: 404 }
      );
    }

    return NextResponse.json({ companyId: company.id });
  } catch (error) {
    console.error('Failed to fetch company:', error);
    return NextResponse.json(
      { error: 'Failed to fetch company' },
      { status: 500 }
    );
  }
}