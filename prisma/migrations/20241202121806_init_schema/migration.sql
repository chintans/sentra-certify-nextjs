-- CreateEnum
CREATE TYPE "Status" AS ENUM ('0', '1', '2', '3', '4', '5');

-- CreateEnum
CREATE TYPE "Stage" AS ENUM ('0', '1', '2', '3');

-- CreateEnum
CREATE TYPE "CertificateFrequency" AS ENUM ('0', '1');

-- CreateEnum
CREATE TYPE "ProofCategory" AS ENUM ('0', '1', '2', '3');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('0', '1');

-- CreateTable
CREATE TABLE "AuthUser" (
    "id" UUID NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "tenantId" UUID NOT NULL,
    "companyId" UUID NOT NULL,

    CONSTRAINT "AuthUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Company" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "tenantId" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "imageUrl" TEXT,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserCompanyMapping" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "tenantId" UUID NOT NULL,

    CONSTRAINT "UserCompanyMapping_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CertificateTypes" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "CertificateTypes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CertificateRequests" (
    "id" SERIAL NOT NULL,
    "tenantId" UUID NOT NULL,
    "certificateName" TEXT,
    "requestDate" TIMESTAMP(3) NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "status" "Status" NOT NULL,
    "stage" "Stage" NOT NULL,
    "frequency" "CertificateFrequency" NOT NULL,
    "certificateTypeId" INTEGER NOT NULL,
    "companyId" UUID NOT NULL,

    CONSTRAINT "CertificateRequests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CertificateRequestComments" (
    "id" SERIAL NOT NULL,
    "comment" TEXT NOT NULL,
    "senderName" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "certificateRequestId" INTEGER NOT NULL,

    CONSTRAINT "CertificateRequestComments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SampleData" (
    "id" SERIAL NOT NULL,
    "assetLevel" TEXT NOT NULL,
    "frequency" TEXT NOT NULL,
    "docName" TEXT NOT NULL,
    "description" TEXT,
    "fromDate" TIMESTAMP(3) NOT NULL,
    "toDate" TIMESTAMP(3) NOT NULL,
    "activityDataValue" DOUBLE PRECISION,
    "emissionFactor" DOUBLE PRECISION,
    "scopeName" TEXT NOT NULL,
    "absolute" DOUBLE PRECISION NOT NULL,
    "intensity" DOUBLE PRECISION NOT NULL,
    "certificateRequestId" INTEGER NOT NULL,

    CONSTRAINT "SampleData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SampleProof" (
    "id" SERIAL NOT NULL,
    "proofName" TEXT NOT NULL,
    "proofLink" TEXT NOT NULL,
    "sampleId" INTEGER,
    "proofCategory" "ProofCategory" NOT NULL,
    "sampleDataId" INTEGER NOT NULL,

    CONSTRAINT "SampleProof_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerifierCertificateMapping" (
    "id" SERIAL NOT NULL,
    "verifierId" UUID NOT NULL,
    "certificateRequestId" INTEGER NOT NULL,

    CONSTRAINT "VerifierCertificateMapping_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AuthUserToRole" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL,

    CONSTRAINT "_AuthUserToRole_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_AuthUserToRole_B_index" ON "_AuthUserToRole"("B");

-- AddForeignKey
ALTER TABLE "AuthUser" ADD CONSTRAINT "AuthUser_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCompanyMapping" ADD CONSTRAINT "UserCompanyMapping_userId_fkey" FOREIGN KEY ("userId") REFERENCES "AuthUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CertificateRequests" ADD CONSTRAINT "CertificateRequests_certificateTypeId_fkey" FOREIGN KEY ("certificateTypeId") REFERENCES "CertificateTypes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CertificateRequests" ADD CONSTRAINT "CertificateRequests_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CertificateRequestComments" ADD CONSTRAINT "CertificateRequestComments_certificateRequestId_fkey" FOREIGN KEY ("certificateRequestId") REFERENCES "CertificateRequests"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SampleData" ADD CONSTRAINT "SampleData_certificateRequestId_fkey" FOREIGN KEY ("certificateRequestId") REFERENCES "CertificateRequests"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SampleProof" ADD CONSTRAINT "SampleProof_sampleDataId_fkey" FOREIGN KEY ("sampleDataId") REFERENCES "SampleData"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VerifierCertificateMapping" ADD CONSTRAINT "VerifierCertificateMapping_certificateRequestId_fkey" FOREIGN KEY ("certificateRequestId") REFERENCES "CertificateRequests"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VerifierCertificateMapping" ADD CONSTRAINT "VerifierCertificateMapping_verifierId_fkey" FOREIGN KEY ("verifierId") REFERENCES "AuthUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AuthUserToRole" ADD CONSTRAINT "_AuthUserToRole_A_fkey" FOREIGN KEY ("A") REFERENCES "AuthUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AuthUserToRole" ADD CONSTRAINT "_AuthUserToRole_B_fkey" FOREIGN KEY ("B") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;
