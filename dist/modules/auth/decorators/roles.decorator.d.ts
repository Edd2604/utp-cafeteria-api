import { Rol } from '@prisma/client';
export declare const ROLES_KEY = "ROLES";
export declare const Roles: (roles: Rol[]) => import("@nestjs/common").CustomDecorator<string>;
