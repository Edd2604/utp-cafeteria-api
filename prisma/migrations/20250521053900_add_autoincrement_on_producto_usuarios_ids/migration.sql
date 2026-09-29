-- AlterTable
CREATE SEQUENCE producto_id_seq;
ALTER TABLE "Producto" ALTER COLUMN "id" SET DEFAULT nextval('producto_id_seq');
ALTER SEQUENCE producto_id_seq OWNED BY "Producto"."id";

-- AlterTable
CREATE SEQUENCE usuario_id_seq;
ALTER TABLE "Usuario" ALTER COLUMN "id" SET DEFAULT nextval('usuario_id_seq');
ALTER SEQUENCE usuario_id_seq OWNED BY "Usuario"."id";
