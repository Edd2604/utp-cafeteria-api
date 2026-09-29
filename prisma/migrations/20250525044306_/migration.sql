/*
  Warnings:

  - You are about to drop the column `stock` on the `Producto` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Producto" DROP COLUMN "stock";

-- CreateTable
CREATE TABLE "Inventario_Diario" (
    "id" SERIAL NOT NULL,
    "producto_id" INTEGER NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "stock_inicial" INTEGER NOT NULL DEFAULT 0,
    "stock" INTEGER NOT NULL DEFAULT 0,
    "ultima_salida" TIMESTAMP(3),
    "ultima_entrada" TIMESTAMP(3),

    CONSTRAINT "Inventario_Diario_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Inventario_Diario_producto_id_fecha_key" ON "Inventario_Diario"("producto_id", "fecha");

-- AddForeignKey
ALTER TABLE "Inventario_Diario" ADD CONSTRAINT "Inventario_Diario_producto_id_fkey" FOREIGN KEY ("producto_id") REFERENCES "Producto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
