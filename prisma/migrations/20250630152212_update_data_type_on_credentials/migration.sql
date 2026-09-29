/*
  Warnings:

  - Changed the type of `credential_id` on the `WebAuthnCredential` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `publicKey` on the `WebAuthnCredential` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "WebAuthnCredential" DROP COLUMN "credential_id",
ADD COLUMN     "credential_id" BYTEA NOT NULL,
DROP COLUMN "publicKey",
ADD COLUMN     "publicKey" BYTEA NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "WebAuthnCredential_credential_id_key" ON "WebAuthnCredential"("credential_id");
