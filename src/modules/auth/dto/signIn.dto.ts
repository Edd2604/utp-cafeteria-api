import { IsEmail, IsString, Length, Matches } from 'class-validator'

export class SignInDto {
  @IsEmail({}, { message: 'El correo electrónico no es válido.' })
  @Matches(/^([AUC]\d{8})@utp\.edu\.pe$/, {
    message: 'El correo no posee el formato correcto',
  })
  correo: string

  @IsString()
  @Length(5, 20, {
    message: 'La contraseña debe tener entre 8 y 20 caracteres.',
  })
  contraseña: string
}
