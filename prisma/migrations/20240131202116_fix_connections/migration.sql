/*
  Warnings:

  - Added the required column `repCount` to the `Exercise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `setCount` to the `Exercise` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Exercise" ADD COLUMN     "repCount" INTEGER NOT NULL,
ADD COLUMN     "setCount" INTEGER NOT NULL;
