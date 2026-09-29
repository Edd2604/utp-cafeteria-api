/*
  Warnings:

  - Added the required column `hora_programada` to the `Orden` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Orden" ADD COLUMN     "hora_programada" TIMESTAMP(3) NOT NULL;
