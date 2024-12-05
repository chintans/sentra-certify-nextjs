import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

interface TaskAllocationDto {
  certificateId: number
  memberVerifierId: number
  technicalVerifierId: number
}

export async function POST(request: Request) {
  try {
    const body: TaskAllocationDto = await request.json()
    
    if (!body) {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
    }

    // Create both mappings in a single transaction
    await prisma.$transaction(async (tx) => {
      await tx.verifierCertificateMapping.createMany({
        data: [
          {
            certificateRequestId: body.certificateId,
            verifierId: body.memberVerifierId,
          },
          {
            certificateRequestId: body.certificateId,
            verifierId: body.technicalVerifierId,
          }
        ]
      })
    })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('Error assigning tasks:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}