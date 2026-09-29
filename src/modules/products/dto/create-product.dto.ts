import { ApiProperty } from '@nestjs/swagger'
import { Categoria } from '@prisma/client'
import { Transform, Type } from 'class-transformer'
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator'

export class CreateProductDto {
  @IsString({ message: 'El nombre del producto debe ser una cadena de texto' })
  nombre: string

  @IsString({
    message: 'La descripción del producto debe ser una cadena de texto',
  })
  descripcion: string

  @Type(() => Number)
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'El precio del producto debe ser un número decimal' },
  )
  precio: number

  @Type(() => Number)
  @IsPositive({
    message: 'El limite de orden del producto debe ser un número positivo',
  })
  @IsInt({
    message: 'El limite de orden del producto debe ser un número entero',
  })
  limite_de_orden: number

  @ApiProperty({ enum: Categoria })
  @IsEnum(Categoria, { message: 'La categoria no es válida' })
  categoria: Categoria

  @Transform(({ value }) => value === 'true')
  @IsBoolean({ message: 'El estado habilitado debe ser un valor booleano.' })
  @IsOptional()
  habilitado: boolean
}
