import { NextResponse } from "next/server";
import {prisma} from "@/lib/prisma"; 
import { Company, CompanyResult } from "@/types/certificate";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const email = searchParams.get('email');

        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }

        // Get user info and role
        const userInfo = await prisma.authUser.findFirst({
            where: {
                email: {
                    equals: email,
                    mode: 'insensitive'
                }
            },
            include: {
                userRoles: {
                    include: {
                        role: true
                    }
                }
            }
        });

        if (!userInfo?.userRoles?.[0]?.role?.name) {
            return NextResponse.json([]);
        }

        const companies = await prisma.levelCOrgcompany.findMany({
            include: {
                certificateRequests: true
            }
        });

        const result = companies.map((company:Company)=> ({
            name: company.name,
            companyId: company.tenantId,
            imageUrl: company.imageURl,
            onGoing: company.certificateRequests.filter(
                r => r.tenantId === company.tenantId && r.status !== 'COMPLETED'
            ).length,
            completed: company.certificateRequests.filter(
                r => r.tenantId === company.tenantId && r.status === 'COMPLETED'
            ).length
        }));

        // If admin, return all companies
        if (userInfo.userRoles[0].role.name === 'ADMIN') {
            return NextResponse.json(result);
        }

        // Get user's company mappings
        const userCompanyIds = await prisma.userCompanyMapping.findMany({
            where: {
                userId: userInfo.id
            },
            select: {
                tenantId: true
            }
        });

        const filteredResult = result.filter((company: CompanyResult) => 
            userCompanyIds.some((mapping: { tenantId: string }) => mapping.tenantId === company.companyId)
        );

        return NextResponse.json(filteredResult);

    } catch (error) {
        console.error('Error fetching companies:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}