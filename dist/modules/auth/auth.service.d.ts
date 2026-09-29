import { UsersService } from '@modules/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { IUserSession } from '@auth/interfaces/user-session.interface';
import { PrismaService } from '@providers/prisma/prisma.service';
import { SignInDto } from './dto/signIn.dto';
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    private readonly db;
    constructor(userService: UsersService, jwtService: JwtService, db: PrismaService);
    signIn({ correo, contraseña }: SignInDto): Promise<{
        user: IUserSession;
        tokens: {
            access: string;
            refresh: string;
        };
    }>;
    refresh(user: IUserSession): Promise<{
        access: string;
        refresh: string;
    }>;
}
