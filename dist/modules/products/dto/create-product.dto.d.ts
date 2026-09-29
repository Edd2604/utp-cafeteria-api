import { Categoria } from '@prisma/client';
export declare class CreateProductDto {
    nombre: string;
    descripcion: string;
    precio: number;
    limite_de_orden: number;
    categoria: Categoria;
    habilitado: boolean;
}
