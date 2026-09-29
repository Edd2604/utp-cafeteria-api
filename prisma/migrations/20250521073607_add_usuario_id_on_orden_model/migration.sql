/*
  Warnings:

  - You are about to drop the column `customerId` on the `Orden` table. All the data in the column will be lost.
  - Added the required column `usuario_id` to the `Orden` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Orden" DROP CONSTRAINT "Orden_customerId_fkey";

-- AlterTable
ALTER TABLE "Orden" DROP COLUMN "customerId",
ADD COLUMN     "usuario_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Orden" ADD CONSTRAINT "Orden_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
