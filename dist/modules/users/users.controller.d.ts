import { SearchStatusQueryParamsDto } from '@common/query-params/search-status-query-params';
import { IUserSession } from '@auth/interfaces/user-session.interface';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { NewPasswordDto } from './dto/new-password.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    createAdmin(session: IUserSession, createUserDto: CreateUserDto): Promise<{
        creado: string;
        actualizado: string;
        nombre: string;
        habilitado: boolean;
        id: number;
        dni: string;
        apellidos: string;
        correo: string;
        rol: import(".prisma/client").$Enums.Rol;
        pushSubscription: import("@prisma/client/runtime/library").JsonValue | null;
    }>;
    crearStudent(session: IUserSession, createUserDto: CreateUserDto): Promise<{
        creado: string;
        actualizado: string;
        nombre: string;
        habilitado: boolean;
        id: number;
        dni: string;
        apellidos: string;
        correo: string;
        rol: import(".prisma/client").$Enums.Rol;
        pushSubscription: import("@prisma/client/runtime/library").JsonValue | null;
    }>;
    createTeacher(session: IUserSession, createUserDto: CreateUserDto): Promise<{
        creado: string;
        actualizado: string;
        nombre: string;
        habilitado: boolean;
        id: number;
        dni: string;
        apellidos: string;
        correo: string;
        rol: import(".prisma/client").$Enums.Rol;
        pushSubscription: import("@prisma/client/runtime/library").JsonValue | null;
    }>;
    getAllAdmins(query: SearchStatusQueryParamsDto): Promise<{
        data: {
            creado: string;
            actualizado: string;
            nombre: string;
            habilitado: boolean;
            id: number;
            dni: string;
            apellidos: string;
            correo: string;
            rol: import(".prisma/client").$Enums.Rol;
            pushSubscription: import("@prisma/client/runtime/library").JsonValue | null;
        }[];
        total: number;
        totalPages: number;
    }>;
    getAllStudents(query: SearchStatusQueryParamsDto): Promise<{
        data: {
            creado: string;
            actualizado: string;
            nombre: string;
            habilitado: boolean;
            id: number;
            dni: string;
            apellidos: string;
            correo: string;
            rol: import(".prisma/client").$Enums.Rol;
            pushSubscription: import("@prisma/client/runtime/library").JsonValue | null;
        }[];
        total: number;
        totalPages: number;
    }>;
    getAllTeachers(query: SearchStatusQueryParamsDto): Promise<{
        data: {
            creado: string;
            actualizado: string;
            nombre: string;
            habilitado: boolean;
            id: number;
            dni: string;
            apellidos: string;
            correo: string;
            rol: import(".prisma/client").$Enums.Rol;
            pushSubscription: import("@prisma/client/runtime/library").JsonValue | null;
        }[];
        total: number;
        totalPages: number;
    }>;
    verifyDni(dni: string): Promise<import("../../providers/reniec/interfaces/reniec-response.interface").IReniecResponse>;
    getOneUser(userId: number): Promise<{
        creado: string;
        actualizado: string;
        nombre: string;
        habilitado: boolean;
        id: number;
        dni: string;
        apellidos: string;
        correo: string;
        rol: import(".prisma/client").$Enums.Rol;
        pushSubscription: import("@prisma/client/runtime/library").JsonValue | null;
    }>;
    updateUser(userId: number, session: IUserSession, updateUserDto: UpdateUserDto): Promise<{
        creado: string;
        actualizado: string;
        nombre: string;
        habilitado: boolean;
        id: number;
        dni: string;
        apellidos: string;
        correo: string;
        rol: import(".prisma/client").$Enums.Rol;
        pushSubscription: import("@prisma/client/runtime/library").JsonValue | null;
    }>;
    updatePassword(userId: number, dto: NewPasswordDto): Promise<{
        creado: string;
        actualizado: string;
        nombre: string;
        habilitado: boolean;
        id: number;
        dni: string;
        apellidos: string;
        correo: string;
        rol: import(".prisma/client").$Enums.Rol;
        pushSubscription: import("@prisma/client/runtime/library").JsonValue | null;
    }>;
    removeUser(userId: number): Promise<{
        id: number;
        message: string;
    }>;
}
