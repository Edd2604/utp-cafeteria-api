import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common'

@Injectable()
export class ValidateId implements PipeTransform {
  transform(value: string) {
    if (!/^\d+$/.test(value))
      throw new BadRequestException('El ID debe contener solo números enteros')

    const id = parseInt(value, 10)

    if (isNaN(id) || id <= 0)
      throw new BadRequestException('El ID debe ser un número positivo')

    return id
  }
}
