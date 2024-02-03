/*
  Warnings:

  - You are about to drop the column `repCount` on the `Exercise` table. All the data in the column will be lost.
  - You are about to drop the column `setCount` on the `Exercise` table. All the data in the column will be lost.
  - You are about to drop the column `workoutId` on the `Exercise` table. All the data in the column will be lost.
  - You are about to drop the column `exerciseId` on the `Set` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,name]` on the table `WorkoutPlan` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `reps` to the `Exercise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sets` to the `Exercise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `workoutExerciseId` to the `Set` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Exercise" DROP CONSTRAINT "Exercise_planId_fkey";

-- DropForeignKey
ALTER TABLE "Exercise" DROP CONSTRAINT "Exercise_workoutId_fkey";

-- DropForeignKey
ALTER TABLE "Set" DROP CONSTRAINT "Set_exerciseId_fkey";

-- AlterTable
ALTER TABLE "Exercise" DROP COLUMN "repCount",
DROP COLUMN "setCount",
DROP COLUMN "workoutId",
ADD COLUMN     "reps" INTEGER NOT NULL,
ADD COLUMN     "sets" INTEGER NOT NULL,
ALTER COLUMN "planId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Set" DROP COLUMN "exerciseId",
ADD COLUMN     "workoutExerciseId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "WorkoutExercise" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "workoutId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WorkoutExercise_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WorkoutPlan_userId_name_key" ON "WorkoutPlan"("userId", "name");

-- AddForeignKey
ALTER TABLE "WorkoutExercise" ADD CONSTRAINT "WorkoutExercise_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_planId_fkey" FOREIGN KEY ("planId") REFERENCES "WorkoutPlan"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Set" ADD CONSTRAINT "Set_workoutExerciseId_fkey" FOREIGN KEY ("workoutExerciseId") REFERENCES "WorkoutExercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
