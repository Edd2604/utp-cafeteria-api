import { Logger } from '@nestjs/common';
import { ProductsService } from '@modules/products/products.service';
import { PrismaService } from '@providers/prisma/prisma.service';
import { SearchStatusQueryParamsDto } from '@common/query-params/search-status-query-params';
import { Prisma } from '@prisma/client';
import { UpdateStockDto } from './dto/update-stock.dto';
export declare class InventoryService {
    private readonly productService;
    private readonly db;
    logger: Logger;
    constructor(productService: ProductsService, db: PrismaService);
    testCron(): void;
    generateInventory(): Promise<{
        message: string;
    }>;
    resetInventory(): Promise<{
        message: string;
    }>;
    getInventoryToday({ query, page, page_size, }: SearchStatusQueryParamsDto): Promise<{
        data: {
            fecha: string;
            nombre_producto: string;
            ultima_entrada: string;
            ultima_salida: string;
            producto: {
                nombre: string;
            };
            id: number;
            producto_id: number;
            stock: number;
        }[];
        total: number;
        totalPages: number;
    }>;
    updateProductStock({ producto_id, cantidad, tipo }: UpdateStockDto): Promise<Prisma.BatchPayload>;
    getStocksByIds(ids: number[]): Promise<{
        producto_id: number;
        stock: number;
    }[]>;
}
