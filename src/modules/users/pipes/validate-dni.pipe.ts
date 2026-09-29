import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common'

@Injectable()
export class ValidateDNI implements PipeTransform {
  transform(value: string): string {
    if (!/^\d{8}$/.test(value)) {
      throw new BadRequestException(
        'DNI inválido. Debe contener 8 dígitos numéricos.',
      )
    }
    return value
  }
}
