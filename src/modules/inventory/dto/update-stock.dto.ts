import { IsEnum, IsInt, IsPositive } from 'class-validator'
import { Type } from 'class-transformer'

export enum StockMovementType {
  ENTRADA = 'ENTRADA',
  SALIDA = 'SALIDA',
}

export class UpdateStockDto {
  @Type(() => Number)
  @IsInt({ message: 'El ID del producto debe ser un número entero' })
  @IsPositive({ message: 'El ID del producto debe ser mayor a 0' })
  producto_id: number

  @Type(() => Number)
  @IsInt({ message: 'La cantidad debe ser un número entero' })
  @IsPositive({ message: 'La cantidad debe ser mayor a 0' })
  cantidad: number

  @IsEnum(StockMovementType, {
    message: 'El tipo debe ser ENTRADA o SALIDA',
  })
  tipo: StockMovementType
}
