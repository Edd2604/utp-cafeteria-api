import { PrismaService } from '@providers/prisma/prisma.service';
import { SearchStatusQueryParamsDto } from '@common/query-params/search-status-query-params';
import { Prisma } from '@prisma/client';
import { CloudinaryService } from '@providers/cloudinary/cloudinary.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsQueryParams } from './query-params/products-query-params';
export declare class ProductsService {
    private readonly db;
    private readonly cloudinary;
    constructor(db: PrismaService, cloudinary: CloudinaryService);
    create(createProductDto: CreateProductDto, file?: Express.Multer.File): Promise<{
        creado: string;
        actualizado: string;
        nombre: string;
        descripcion: string;
        precio: Prisma.Decimal;
        limite_de_orden: number;
        categoria: import(".prisma/client").$Enums.Categoria;
        habilitado: boolean;
        id: number;
        url: string;
    }>;
    getAll({ query, page, page_size, enable }: SearchStatusQueryParamsDto): Promise<{
        data: {
            creado: string;
            actualizado: string;
            nombre: string;
            descripcion: string;
            precio: Prisma.Decimal;
            limite_de_orden: number;
            categoria: import(".prisma/client").$Enums.Categoria;
            habilitado: boolean;
            id: number;
            url: string;
        }[];
        total: number;
        totalPages: number;
    }>;
    getActiveProducts({ query, page, page_size, order, max_price, category, }: ProductsQueryParams): Promise<{
        data: {
            stock: number;
            creado: string;
            actualizado: string;
            Inventario_Diario: {
                stock: number;
            }[];
            nombre: string;
            descripcion: string;
            precio: Prisma.Decimal;
            limite_de_orden: number;
            categoria: import(".prisma/client").$Enums.Categoria;
            habilitado: boolean;
            id: number;
            url: string;
        }[];
        total: number;
        totalPages: number;
    }>;
    getOne(id: number): Promise<{
        creado: string;
        actualizado: string;
        nombre: string;
        descripcion: string;
        precio: Prisma.Decimal;
        limite_de_orden: number;
        categoria: import(".prisma/client").$Enums.Categoria;
        habilitado: boolean;
        id: number;
        url: string;
    }>;
    update(id: number, updateProductDto: UpdateProductDto, file?: Express.Multer.File): Promise<{
        creado: string;
        actualizado: string;
        nombre: string;
        descripcion: string;
        precio: Prisma.Decimal;
        limite_de_orden: number;
        categoria: import(".prisma/client").$Enums.Categoria;
        habilitado: boolean;
        id: number;
        url: string;
    }>;
    remove(id: number): Promise<{
        id: number;
        message: string;
    }>;
    getProductsByIds(ids: number[]): Promise<{
        nombre: string;
        precio: Prisma.Decimal;
        limite_de_orden: number;
        habilitado: boolean;
        id: number;
        archivado: boolean;
    }[]>;
    getActiveProductsIds(): Promise<{
        id: number;
    }[]>;
}
