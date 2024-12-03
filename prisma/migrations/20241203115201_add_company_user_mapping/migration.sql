/*
  Warnings:

  - The primary key for the `AuthUser` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `AuthUser` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Company` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Company` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Role` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Role` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `UserCompanyMapping` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `tenantId` on the `UserCompanyMapping` table. All the data in the column will be lost.
  - The `id` column on the `UserCompanyMapping` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `_AuthUserToRole` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `roleId` to the `AuthUser` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `companyId` on the `AuthUser` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `companyId` on the `CertificateRequests` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `companyId` to the `UserCompanyMapping` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `userId` on the `UserCompanyMapping` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `verifierId` on the `VerifierCertificateMapping` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "AuthUser" DROP CONSTRAINT "AuthUser_companyId_fkey";

-- DropForeignKey
ALTER TABLE "CertificateRequests" DROP CONSTRAINT "CertificateRequests_companyId_fkey";

-- DropForeignKey
ALTER TABLE "UserCompanyMapping" DROP CONSTRAINT "UserCompanyMapping_userId_fkey";

-- DropForeignKey
ALTER TABLE "VerifierCertificateMapping" DROP CONSTRAINT "VerifierCertificateMapping_verifierId_fkey";

-- DropForeignKey
ALTER TABLE "_AuthUserToRole" DROP CONSTRAINT "_AuthUserToRole_A_fkey";

-- DropForeignKey
ALTER TABLE "_AuthUserToRole" DROP CONSTRAINT "_AuthUserToRole_B_fkey";

-- AlterTable
ALTER TABLE "AuthUser" DROP CONSTRAINT "AuthUser_pkey",
ADD COLUMN     "roleId" INTEGER NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "companyId",
ADD COLUMN     "companyId" INTEGER NOT NULL,
ADD CONSTRAINT "AuthUser_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "CertificateRequests" DROP COLUMN "companyId",
ADD COLUMN     "companyId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Company" DROP CONSTRAINT "Company_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Company_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Role" DROP CONSTRAINT "Role_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Role_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "UserCompanyMapping" DROP CONSTRAINT "UserCompanyMapping_pkey",
DROP COLUMN "tenantId",
ADD COLUMN     "companyId" INTEGER NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "userId",
ADD COLUMN     "userId" INTEGER NOT NULL,
ADD CONSTRAINT "UserCompanyMapping_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "VerifierCertificateMapping" DROP COLUMN "verifierId",
ADD COLUMN     "verifierId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_AuthUserToRole";

-- AddForeignKey
ALTER TABLE "AuthUser" ADD CONSTRAINT "AuthUser_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuthUser" ADD CONSTRAINT "AuthUser_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCompanyMapping" ADD CONSTRAINT "UserCompanyMapping_userId_fkey" FOREIGN KEY ("userId") REFERENCES "AuthUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCompanyMapping" ADD CONSTRAINT "UserCompanyMapping_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CertificateRequests" ADD CONSTRAINT "CertificateRequests_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VerifierCertificateMapping" ADD CONSTRAINT "VerifierCertificateMapping_verifierId_fkey" FOREIGN KEY ("verifierId") REFERENCES "AuthUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
