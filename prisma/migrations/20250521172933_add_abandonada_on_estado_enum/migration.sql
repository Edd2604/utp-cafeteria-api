/*
  Warnings:

  - The values [PENDIENTE] on the enum `Estado` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Estado_new" AS ENUM ('EN_PROCESO', 'RECOGER', 'COMPLETADA', 'ABANDONADA', 'CANCELADA');
ALTER TABLE "Orden" ALTER COLUMN "estado" DROP DEFAULT;
ALTER TABLE "Orden" ALTER COLUMN "estado" TYPE "Estado_new" USING ("estado"::text::"Estado_new");
ALTER TYPE "Estado" RENAME TO "Estado_old";
ALTER TYPE "Estado_new" RENAME TO "Estado";
DROP TYPE "Estado_old";
ALTER TABLE "Orden" ALTER COLUMN "estado" SET DEFAULT 'EN_PROCESO';
COMMIT;

-- AlterTable
ALTER TABLE "Orden" ALTER COLUMN "estado" SET DEFAULT 'EN_PROCESO';
