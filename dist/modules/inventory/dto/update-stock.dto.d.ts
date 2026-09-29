export declare enum StockMovementType {
    ENTRADA = "ENTRADA",
    SALIDA = "SALIDA"
}
export declare class UpdateStockDto {
    producto_id: number;
    cantidad: number;
    tipo: StockMovementType;
}
