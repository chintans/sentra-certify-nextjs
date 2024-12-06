import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {

  const existingCompany = await prisma.company.findFirst({
    where: {
      tenantId: 'AE1A972C-3EDF-4B6D-B96D-9278EEF5B99E'
    }
  });

  if (existingCompany) {
    console.log('Data already seeded');
    return;
  }
  // Seed Roles
  const adminRole = await prisma.role.create({
    data: {
      name: 'Admin',
    },
  });

  const userRole = await prisma.role.create({
    data: {
      name: 'User',
    },
  });

  // Seed Companies
  const company = await prisma.company.create({
    data: {
      name: 'Test Company',
      tenantId: 'AE1A972C-3EDF-4B6D-B96D-9278EEF5B99E', // example UUID
      email: 'test@company.com',
      imageUrl: 'https://example.com/image.jpg',
    },
  });

  // Seed Users
  const user1 = await prisma.authUser.create({
    data: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'vikas.upadhyay.madansteel2@app.sentra.world',
      tenantId: 'AE1A972C-3EDF-4B6D-B96D-9278EEF5B99E',
      companyId: company.id,
      roleId: adminRole.id,
    },
  });

  const user2 = await prisma.authUser.create({
    data: {
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane@example.com',
      tenantId: '550e8400-e29b-41d4-a716-446655440000',
      companyId: company.id,
      roleId: userRole.id,
    },
  });

  // Seed Certificate Types
  const certificateType = await prisma.certificateTypes.create({
    data: {
      name: 'ISO Certification',
    },
  });

  // Seed Certificate Requests
  const certificateRequest = await prisma.certificateRequests.create({
    data: {
      tenantId: 'AE1A972C-3EDF-4B6D-B96D-9278EEF5B99E',
      certificateName: 'Test Certificate',
      requestDate: new Date(),
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      status: 'NotStarted',
      stage: 'DataCollection',
      frequency: 'OneTime',
      certificateTypeId: certificateType.id,
      companyId: company.id,
    },
  });

  // Seed Verifier Certificate Mappings
  await prisma.verifierCertificateMapping.createMany({
    data: [
      {
        verifierId: user1.id,
        certificateRequestId: certificateRequest.id,
      },
      {
        verifierId: user2.id,
        certificateRequestId: certificateRequest.id,
      },
    ],
  });

  // Seed Certificate Request Comments
  await prisma.certificateRequestComments.create({
    data: {
      comment: 'Initial comment',
      senderName: 'John Doe',
      timestamp: new Date(),
      certificateRequestId: certificateRequest.id,
    },
  });

  // Seed Sample Data
  const sampleData = await prisma.sampleData.create({
    data: {
      assetLevel: 'Level 1',
      frequency: 'Monthly',
      docName: 'Sample Document',
      description: 'Sample description',
      fromDate: new Date(),
      toDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      activityDataValue: 100.0,
      emissionFactor: 1.5,
      scopeName: 'Scope 1',
      absolute: 150.0,
      intensity: 1.0,
      certificateRequestId: certificateRequest.id,
    },
  });

  // Seed Sample Proofs
  await prisma.sampleProof.create({
    data: {
      proofName: 'Proof 1',
      proofLink: 'https://example.com/proof1',
      proofCategory: 'ActivityData',
      sampleDataId: sampleData.id,
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });