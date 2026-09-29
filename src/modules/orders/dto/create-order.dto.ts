import { Type } from 'class-transformer'
import {
  ArrayNotEmpty,
  IsDate,
  IsNumber,
  ValidateNested,
} from 'class-validator'

import { CreateOrderItem } from './create-order-item.dto'

export class CreateOrderDto {
  @Type(() => Date)
  @IsDate({ message: 'la hora programada debe ser una fecha' })
  hora_programada: Date

  @Type(() => Number)
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'El monto total debe ser un número decimal' },
  )
  monto_total: number

  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItem)
  orderItems: CreateOrderItem[]
}
