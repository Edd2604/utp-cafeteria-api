import { SearchQueryParamsDto } from '@common/query-params/search-query-params';
import { InventoryService } from './inventory.service';
import { UpdateStockDto } from './dto/update-stock.dto';
export declare class InventoryController {
    private readonly inventoryService;
    constructor(inventoryService: InventoryService);
    findAll(params: SearchQueryParamsDto): Promise<{
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
    generateManualInventory(): Promise<{
        message: string;
    }>;
    resetInventory(): Promise<{
        message: string;
    }>;
    updateStock(updateStockDto: UpdateStockDto): Promise<{
        message: string;
    }>;
}
