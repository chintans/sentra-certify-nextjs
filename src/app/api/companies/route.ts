import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { CompanyRequestCountDto } from "@/types/certificate";

interface PrismaCompany {
    id: number;
    name: string;
    imageUrl: string | null;
    certificateRequests: Array<{
        companyId: number;
        status: string;
    }>;
}

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const email = searchParams.get('email');

        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }

        // 1. Find user and their role
        const user = await prisma.authUser.findFirst({
            where: { email },
            include: { role: true }
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        let companies: PrismaCompany[];

        // 2 & 3. Check role and fetch appropriate companies
        if (user.role.name === 'ADMIN') {
            // For admin, fetch all companies
            companies = await prisma.company.findMany({
                include: { certificateRequests: true }
            });
        } else {
            // For non-admin, fetch only mapped companies
            companies = await prisma.company.findMany({
                where: {
                    companyMappings: {
                        some: {
                            userId: user.id
                        }
                    }
                },
                include: { certificateRequests: true }
            });
        }

        const result: CompanyRequestCountDto[] = companies.map((company: PrismaCompany) => ({
            name: company.name,
            companyId: company.id,
            imageUrl: company.imageUrl ?? '',
            onGoing: company.certificateRequests.filter(
                request => request.companyId === company.id &&
                request.status !== "Completed"
            ).length,
            completed: company.certificateRequests.filter(
                request => request.companyId === company.id &&
                request.status === "Completed"
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