import { IsString, Length } from 'class-validator'

export class NewPasswordDto {
  @IsString({ message: 'La nueva contraseña debe ser una cadena de texto' })
  @Length(8, 20, {
    message: 'La nueva contraseña debe tener entre 8 y 20 caracteres.',
  })
  nueva_contraseña: string
}
