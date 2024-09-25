/*
  Warnings:

  - Added the required column `description` to the `Arena` table without a default value. This is not possible if the table is not empty.
  - Added the required column `img` to the `Arena` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Arena` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Arena" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "img" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL;
