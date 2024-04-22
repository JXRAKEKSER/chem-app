/*
  Warnings:

  - Added the required column `userId` to the `PredictionModel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PredictionModel" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "PredictionModel" ADD CONSTRAINT "PredictionModel_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
