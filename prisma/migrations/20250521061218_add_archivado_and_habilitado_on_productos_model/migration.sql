-- AlterTable
ALTER TABLE "Producto" ADD COLUMN     "archivado" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "habilitado" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Usuario" ALTER COLUMN "habilitado" SET DEFAULT true;
