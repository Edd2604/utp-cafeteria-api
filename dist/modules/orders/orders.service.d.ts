import { PrismaService } from '@providers/prisma/prisma.service';
import { IUserSession } from '@auth/interfaces/user-session.interface';
import { Estado, Orden, Prisma } from '@prisma/client';
import { ProductsService } from '@modules/products/products.service';
import { InventoryService } from '@modules/inventory/inventory.service';
import { SearchQueryParamsDto } from '@common/query-params/search-query-params';
import { PusherService } from '@providers/pusher/pusher.service';
import { EventsService } from '@modules/events/events.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersQueryParams } from './query-params/orders-query-params';
export declare class OrdersService {
    private readonly db;
    private readonly productService;
    private readonly inventoryService;
    private readonly pusherService;
    private readonly eventsService;
    constructor(db: PrismaService, productService: ProductsService, inventoryService: InventoryService, pusherService: PusherService, eventsService: EventsService);
    create(createOrderDto: CreateOrderDto, session: IUserSession): Promise<{
        creado: string;
        hora_programada: string;
        id: number;
        monto_total: Prisma.Decimal;
        transaccion: string;
        estado: import(".prisma/client").$Enums.Estado;
        Metodo_Pago: import(".prisma/client").$Enums.MetodoPago;
        usuario_id: number;
    }>;
    findAll({ page_size, page, query, status }: OrdersQueryParams): Promise<{
        data: {
            creado: string;
            hora_programada: string;
            Orden_Item: {
                precio: Prisma.Decimal;
                id: number;
                producto_id: number;
                cantidad: number;
                nombre_producto: string;
                orden_id: number;
            }[];
            Usuario: {
                nombre: string;
                id: number;
                dni: string;
                apellidos: string;
                correo: string;
                rol: import(".prisma/client").$Enums.Rol;
                pushSubscription: Prisma.JsonValue | null;
            };
            id: number;
            monto_total: Prisma.Decimal;
            transaccion: string;
            estado: import(".prisma/client").$Enums.Estado;
            Metodo_Pago: import(".prisma/client").$Enums.MetodoPago;
            usuario_id: number;
        }[];
        total: number;
        totalPages: number;
    }>;
    findAllToday({ page_size, page, query, status }: OrdersQueryParams): Promise<{
        data: {
            creado: string;
            hora_programada: string;
            Orden_Item: {
                precio: Prisma.Decimal;
                id: number;
                producto_id: number;
                cantidad: number;
                nombre_producto: string;
                orden_id: number;
            }[];
            Usuario: {
                nombre: string;
                id: number;
                dni: string;
                apellidos: string;
                correo: string;
                rol: import(".prisma/client").$Enums.Rol;
                pushSubscription: Prisma.JsonValue | null;
            };
            id: number;
            monto_total: Prisma.Decimal;
            transaccion: string;
            estado: import(".prisma/client").$Enums.Estado;
            Metodo_Pago: import(".prisma/client").$Enums.MetodoPago;
            usuario_id: number;
        }[];
        total: number;
        totalPages: number;
    }>;
    findAllByUser(userId: number, { page_size, page, query }: SearchQueryParamsDto): Promise<{
        data: {
            creado: string;
            hora_programada: string;
            Orden_Item: {
                precio: Prisma.Decimal;
                id: number;
                producto_id: number;
                cantidad: number;
                nombre_producto: string;
                orden_id: number;
            }[];
            id: number;
            monto_total: Prisma.Decimal;
            transaccion: string;
            estado: import(".prisma/client").$Enums.Estado;
            Metodo_Pago: import(".prisma/client").$Enums.MetodoPago;
            usuario_id: number;
        }[];
        total: number;
        totalPages: number;
    }>;
    findOne(id: number): Promise<{
        creado: string;
        hora_programada: string;
        Orden_Item: {
            precio: Prisma.Decimal;
            id: number;
            producto_id: number;
            cantidad: number;
            nombre_producto: string;
            orden_id: number;
        }[];
        Usuario: {
            nombre: string;
            id: number;
            dni: string;
            apellidos: string;
            correo: string;
            rol: import(".prisma/client").$Enums.Rol;
            pushSubscription: Prisma.JsonValue | null;
        };
        id: number;
        monto_total: Prisma.Decimal;
        transaccion: string;
        estado: import(".prisma/client").$Enums.Estado;
        Metodo_Pago: import(".prisma/client").$Enums.MetodoPago;
        usuario_id: number;
    }>;
    changeStatusOrder(id: number, estado: Estado): Promise<{
        id: number;
        creado: Date;
        hora_programada: Date;
        monto_total: Prisma.Decimal;
        transaccion: string;
        estado: import(".prisma/client").$Enums.Estado;
        Metodo_Pago: import(".prisma/client").$Enums.MetodoPago;
        usuario_id: number;
    }>;
    private hasActiveOrder;
    notifyNewOrder(): Promise<void>;
    notifyOrderCancelled(id: number): Promise<void>;
    notifyChangeOrderStatus(order: Orden): Promise<void>;
    private validateOrderItems;
}
