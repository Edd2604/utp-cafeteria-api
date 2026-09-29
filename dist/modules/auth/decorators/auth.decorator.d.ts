import { Rol } from '@prisma/client';
export declare function Auth(roles: Rol[]): <TFunction extends Function, Y>(target: TFunction | object, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
