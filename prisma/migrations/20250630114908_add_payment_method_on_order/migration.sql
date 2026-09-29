-- CreateEnum
CREATE TYPE "MetodoPago" AS ENUM ('TARJETA', 'PLIN', 'YAPE');

-- AlterTable
ALTER TABLE "Orden" ADD COLUMN     "Metodo_Pago" "MetodoPago" NOT NULL DEFAULT 'YAPE';
