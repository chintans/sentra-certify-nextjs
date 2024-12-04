import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const users = await prisma.authUser.findMany({
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                tenantId: true,
                company: {
                    select: {
                        name: true
                    }
                },
                role: {
                    select: {
                        name: true
                    }
                }
            }
        });

        const response = users.map(user => ({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
        }));

        return NextResponse.json(response);

    } catch (error) {
        console.error('Error fetching users:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}