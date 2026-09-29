/*
  Warnings:

  - You are about to drop the column `publicKey` on the `WebAuthnCredential` table. All the data in the column will be lost.
  - Added the required column `public_key` to the `WebAuthnCredential` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WebAuthnCredential" DROP COLUMN "publicKey",
ADD COLUMN     "public_key" BYTEA NOT NULL;
