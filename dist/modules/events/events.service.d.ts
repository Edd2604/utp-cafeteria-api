import { PrismaService } from '@providers/prisma/prisma.service';
import * as webPush from 'web-push';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
export declare class EventsService {
    private readonly db;
    private readonly push;
    constructor(db: PrismaService, push: typeof webPush);
    saveSubscription(dto: CreateSubscriptionDto): Promise<{
        nombre: string;
        habilitado: boolean;
        id: number;
        creado: Date;
        actualizado: Date;
        archivado: boolean;
        dni: string;
        apellidos: string;
        correo: string;
        contraseña: string;
        rol: import(".prisma/client").$Enums.Rol;
        pushSubscription: import("@prisma/client/runtime/library").JsonValue | null;
    }>;
    sendNotification(userId: number, payload: {
        title: string;
        body: string;
        url?: string;
    }): Promise<void>;
}
