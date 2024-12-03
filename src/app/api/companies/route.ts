import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { CompanyRequestCountDto } from "@/types/certificate";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const email = searchParams.get('email');

        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }

        // Fetch companies with their certificate requests
        const companies = await prisma.company.findMany({
            include: {
                certificateRequests: true
            }
        });

        // Transform the data to match the DTO structure
        const result: CompanyRequestCountDto[] = companies.map(company => ({
            name: company.name,
            companyId: company.tenantId,
            imageUrl: company.imageUrl ?? '',
            onGoing: company.certificateRequests.filter(
                request => request.tenantId === company.tenantId && 
                request.status !== 'Completed'  // Using the Status enum from your schema
            ).length,
            completed: company.certificateRequests.filter(
                request => request.tenantId === company.tenantId && 
                request.status === 'Completed'  // Using the Status enum from your schema
            ).length
        }));

        return NextResponse.json(result);

    } catch (error) {
        console.error('Error fetching company request counts:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}