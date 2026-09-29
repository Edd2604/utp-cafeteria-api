import { SearchStatusQueryParamsDto } from '@common/query-params/search-status-query-params';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsQueryParams } from './query-params/products-query-params';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    create(createProductDto: CreateProductDto, file?: Express.Multer.File): Promise<{
        creado: string;
        actualizado: string;
        nombre: string;
        descripcion: string;
        precio: import("@prisma/client/runtime/library").Decimal;
        limite_de_orden: number;
        categoria: import(".prisma/client").$Enums.Categoria;
        habilitado: boolean;
        id: number;
        url: string;
    }>;
    getOne(productoId: number): Promise<{
        creado: string;
        actualizado: string;
        nombre: string;
        descripcion: string;
        precio: import("@prisma/client/runtime/library").Decimal;
        limite_de_orden: number;
        categoria: import(".prisma/client").$Enums.Categoria;
        habilitado: boolean;
        id: number;
        url: string;
    }>;
    getAll(params: SearchStatusQueryParamsDto): Promise<{
        data: {
            creado: string;
            actualizado: string;
            nombre: string;
            descripcion: string;
            precio: import("@prisma/client/runtime/library").Decimal;
            limite_de_orden: number;
            categoria: import(".prisma/client").$Enums.Categoria;
            habilitado: boolean;
            id: number;
            url: string;
        }[];
        total: number;
        totalPages: number;
    }>;
    getActives(params: ProductsQueryParams): Promise<{
        data: {
            stock: number;
            creado: string;
            actualizado: string;
            Inventario_Diario: {
                stock: number;
            }[];
            nombre: string;
            descripcion: string;
            precio: import("@prisma/client/runtime/library").Decimal;
            limite_de_orden: number;
            categoria: import(".prisma/client").$Enums.Categoria;
            habilitado: boolean;
            id: number;
            url: string;
        }[];
        total: number;
        totalPages: number;
    }>;
    update(productId: number, updateProductDto: UpdateProductDto, file?: Express.Multer.File): Promise<{
        creado: string;
        actualizado: string;
        nombre: string;
        descripcion: string;
        precio: import("@prisma/client/runtime/library").Decimal;
        limite_de_orden: number;
        categoria: import(".prisma/client").$Enums.Categoria;
        habilitado: boolean;
        id: number;
        url: string;
    }>;
    remove(productoId: number): Promise<{
        id: number;
        message: string;
    }>;
}
