/*
  Warnings:

  - You are about to drop the `WebAuthnCredential` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "WebAuthnCredential" DROP CONSTRAINT "WebAuthnCredential_usuario_id_fkey";

-- AlterTable
ALTER TABLE "Usuario" ADD COLUMN     "pushSubscription" JSONB;

-- DropTable
DROP TABLE "WebAuthnCredential";
