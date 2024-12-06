import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const companyId = searchParams.get('companyId');

    if (!companyId) {
      return NextResponse.json(
        { error: 'Company ID is required' },
        { status: 400 }
      );
    }

    const company = await prisma.company.findUnique({
      where: {
        id: parseInt(companyId)
      },
      select: {
        id: true,
        name: true,
        email: true
      }
    });

    if (!company) {
      return NextResponse.json(
        { error: 'Company not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ company }, { status: 200 });
  } catch (error) {
    console.error('Error fetching company:', error);
    return NextResponse.json(
      { error: 'Failed to fetch company' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// ... existing GET method ...

export async function PUT(request: Request) {
    try {
      const { searchParams } = new URL(request.url);
      const companyId = searchParams.get('companyId');
      const body = await request.json();
      const { name, email } = body;
  
      if (!companyId) {
        return NextResponse.json(
          { error: 'Company ID is required' },
          { status: 400 }
        );
      }
  
      if (!name && !email) {
        return NextResponse.json(
          { error: 'At least one field (name or email) is required for update' },
          { status: 400 }
        );
      }
  
      const updatedCompany = await prisma.company.update({
        where: {
          id: parseInt(companyId)
        },
        data: {
          ...(name && { name }),
          ...(email && { email })
        },
        select: {
          name: true,
          email: true
        }
      });
  
      return NextResponse.json({ company: updatedCompany }, { status: 200 });
    } catch (error) {
      console.error('Error updating company:', error);
      return NextResponse.json(
        { error: 'Failed to update company' },
        { status: 500 }
      );
    } finally {
      await prisma.$disconnect();
    }
  }