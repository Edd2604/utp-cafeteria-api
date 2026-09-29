import { Rol } from '@prisma/client';
export interface IUserSession {
    id: number;
    usuario: string;
    correo: string;
    rol: Rol;
    iat?: number;
    exp?: number;
}
