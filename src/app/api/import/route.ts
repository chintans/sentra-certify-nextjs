import { NextResponse } from 'next/server';
import * as XLSX from 'xlsx';
import { prisma } from '@/lib/prisma';
import { Stage, Status, CertificateFrequency, ProofCategory } from '@prisma/client';

interface ExcelRow {
  CompanyName: string;
  CertificateName: string;
  RequestDate: string | number;
  DueDate: string | number;
  Status: string;
  Stage: string;
  Frequency: string;
  CertificateTypeName: string;
}

interface SampleDataRow {
    Id: number;
    AssetLevel: string;
    Frequency: string;
    DocName: string;
    Description?: string;
    FromDate: string | number;
    ToDate: string | number;
    ActivityDataValue?: number;
    EmissionFactor?: number;
    ScopeName: string;
    Absolute: number;
    Intensity: number;
    CertificateRequestId: number;
  }

  interface SampleProofRow {
    Id: number;
    ProofName: string;
    ProofLink: string;
    SampleId: number;
    ProofCategory: string;
  }

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }

    // Validate workbook and sheets exist
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const workbook = XLSX.read(buffer, { type: 'buffer' });

    if (!workbook.SheetNames || workbook.SheetNames.length < 3) {
      return NextResponse.json(
        { error: 'Excel file must contain 3 sheets' },
        { status: 400 }
      );
    }

    // Process sheets with null checks
    const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
    const secondSheet = workbook.Sheets[workbook.SheetNames[1]];
    const thirdSheet = workbook.Sheets[workbook.SheetNames[2]];

    if (!firstSheet || !secondSheet || !thirdSheet) {
      return NextResponse.json(
        { error: 'One or more sheets are empty' },
        { status: 400 }
      );
    }

    const data = XLSX.utils.sheet_to_json(firstSheet);

    for (const row of data as ExcelRow[]) {
      const company = await prisma.company.findFirst({
        where: {
          name: row.CompanyName
        }
      });

      if (!company) {
        return NextResponse.json(
          { error: `Company "${row.CompanyName}" doesn't exist` },
          { status: 400 }
        );
      }

      const certificateType = await prisma.certificateTypes.findFirst({
        where: { name: row.CertificateTypeName }
      });

      if (!certificateType) {
        return NextResponse.json(
          { error: `Certificate Type "${row.CertificateTypeName}" doesn't exist` },
          { status: 400 }
        );
      }

      await prisma.certificateRequests.create({
        data: {
          companyId: company.id,
          certificateName: row.CertificateName,
          tenantId: company.tenantId,
          requestDate: new Date(row.RequestDate),
          dueDate: new Date(row.DueDate),
          status: row.Status as Status,
          stage: row.Stage as Stage,
          frequency: row.Frequency as CertificateFrequency,
          certificateTypeId: certificateType.id,
        }
      });
    }

    const sampleData = XLSX.utils.sheet_to_json(secondSheet);

    for (const row of sampleData as SampleDataRow[]) {

      const certificateRequest = await prisma.certificateRequests.findUnique({
        where: { id: row.CertificateRequestId }
      });

      if (!certificateRequest) {
        return NextResponse.json(
          { error: `Certificate Request with ID ${row.CertificateRequestId} doesn't exist` },
          { status: 400 }
        );
      }

      await prisma.sampleData.create({
        data: {
          assetLevel: row.AssetLevel,
          frequency: row.Frequency,
          docName: row.DocName,
          description: row.Description,
          fromDate: new Date(row.FromDate),
          toDate: new Date(row.ToDate),
          activityDataValue: row.ActivityDataValue,
          emissionFactor: row.EmissionFactor,
          scopeName: row.ScopeName,
          absolute: row.Absolute,
          intensity: row.Intensity,
          certificateRequestId: row.CertificateRequestId
        }
      });
    }

    const proofData = XLSX.utils.sheet_to_json(thirdSheet);

    for (const row of proofData as SampleProofRow[]) {
      // Verify if sampleData exists
      const sampleData = await prisma.sampleData.findUnique({
        where: { id: row.SampleId }
      });

      if (!sampleData) {
        return NextResponse.json(
          { error: `Sample Data with ID ${row.SampleId} doesn't exist` },
          { status: 400 }
        );
      }

      await prisma.sampleProof.create({
        data: {
          proofName: row.ProofName,
          proofLink: row.ProofLink,
          proofCategory: row.ProofCategory as ProofCategory,
          sampleDataId: row.SampleId
        }
      });
    }


    return NextResponse.json(
      { message: 'Import completed successfully' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Import error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to import data', 
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}