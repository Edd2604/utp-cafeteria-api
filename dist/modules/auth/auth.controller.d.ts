import { AuthService } from './auth.service';
import { SignInDto } from './dto/signIn.dto';
import { IUserSession } from './interfaces/user-session.interface';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signIn(signInDto: SignInDto): Promise<{
        user: IUserSession;
        tokens: {
            access: string;
            refresh: string;
        };
    }>;
    getProfile(user: IUserSession): IUserSession;
    refreshToken(req: any): Promise<{
        access: string;
        refresh: string;
    }>;
}
