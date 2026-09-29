import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common'
import { isValid, parse } from 'date-fns'

@Injectable()
export class ValidateDate implements PipeTransform {
  transform(value: string) {
    const date = parse(value, 'yyyy-MM-dd', new Date())
    if (!isValid(date)) {
      throw new BadRequestException(
        `La fecha "${value}" no es válida. Usa el formato yyyy-MM-dd`,
      )
    }

    return date
  }
}
