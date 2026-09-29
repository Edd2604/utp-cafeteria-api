import { Type } from 'class-transformer'
import { IsInt, IsNumber, IsPositive, IsString } from 'class-validator'

export class CreateOrderItem {
  @Type(() => Number)
  @IsPositive({ message: 'El id del producto debe ser un número positivo' })
  @IsInt({ message: 'El id del producto debe ser un número entero' })
  producto_id: number

  @IsString({ message: 'el nombre del producto debe ser una cadena de texto' })
  nombre_producto: string

  @Type(() => Number)
  @IsPositive({ message: 'La cantidad debe ser un número positivo' })
  @IsInt({ message: 'La cantidad debe ser un número entero' })
  cantidad: number

  @Type(() => Number)
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'El precio del producto debe ser un decimal' },
  )
  precio: number
}
