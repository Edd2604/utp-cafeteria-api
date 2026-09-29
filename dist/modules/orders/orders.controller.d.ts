import { IUserSession } from '@modules/auth/interfaces/user-session.interface';
import { SearchQueryParamsDto } from '@common/query-params/search-query-params';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersQueryParams } from './query-params/orders-query-params';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    create(user: IUserSession, createOrderDto: CreateOrderDto): Promise<{
        creado: string;
        hora_programada: string;
        id: number;
        monto_total: import("@prisma/client/runtime/library").Decimal;
        transaccion: string;
        estado: import(".prisma/client").$Enums.Estado;
        Metodo_Pago: import(".prisma/client").$Enums.MetodoPago;
        usuario_id: number;
    }>;
    findAll(params: OrdersQueryParams): Promise<{
        data: {
            creado: string;
            hora_programada: string;
            Orden_Item: {
                precio: import("@prisma/client/runtime/library").Decimal;
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
                pushSubscription: import("@prisma/client/runtime/library").JsonValue | null;
            };
            id: number;
            monto_total: import("@prisma/client/runtime/library").Decimal;
            transaccion: string;
            estado: import(".prisma/client").$Enums.Estado;
            Metodo_Pago: import(".prisma/client").$Enums.MetodoPago;
            usuario_id: number;
        }[];
        total: number;
        totalPages: number;
    }>;
    findAllToday(params: OrdersQueryParams): Promise<{
        data: {
            creado: string;
            hora_programada: string;
            Orden_Item: {
                precio: import("@prisma/client/runtime/library").Decimal;
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
                pushSubscription: import("@prisma/client/runtime/library").JsonValue | null;
            };
            id: number;
            monto_total: import("@prisma/client/runtime/library").Decimal;
            transaccion: string;
            estado: import(".prisma/client").$Enums.Estado;
            Metodo_Pago: import(".prisma/client").$Enums.MetodoPago;
            usuario_id: number;
        }[];
        total: number;
        totalPages: number;
    }>;
    findAllByUser(user: IUserSession, params: SearchQueryParamsDto): Promise<{
        data: {
            creado: string;
            hora_programada: string;
            Orden_Item: {
                precio: import("@prisma/client/runtime/library").Decimal;
                id: number;
                producto_id: number;
                cantidad: number;
                nombre_producto: string;
                orden_id: number;
            }[];
            id: number;
            monto_total: import("@prisma/client/runtime/library").Decimal;
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
            precio: import("@prisma/client/runtime/library").Decimal;
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
            pushSubscription: import("@prisma/client/runtime/library").JsonValue | null;
        };
        id: number;
        monto_total: import("@prisma/client/runtime/library").Decimal;
        transaccion: string;
        estado: import(".prisma/client").$Enums.Estado;
        Metodo_Pago: import(".prisma/client").$Enums.MetodoPago;
        usuario_id: number;
    }>;
    processOrder(id: number): Promise<{
        id: number;
        creado: Date;
        hora_programada: Date;
        monto_total: import("@prisma/client/runtime/library").Decimal;
        transaccion: string;
        estado: import(".prisma/client").$Enums.Estado;
        Metodo_Pago: import(".prisma/client").$Enums.MetodoPago;
        usuario_id: number;
    }>;
    pickupOrder(id: number): Promise<{
        id: number;
        creado: Date;
        hora_programada: Date;
        monto_total: import("@prisma/client/runtime/library").Decimal;
        transaccion: string;
        estado: import(".prisma/client").$Enums.Estado;
        Metodo_Pago: import(".prisma/client").$Enums.MetodoPago;
        usuario_id: number;
    }>;
    abandonOrder(id: number): Promise<{
        id: number;
        creado: Date;
        hora_programada: Date;
        monto_total: import("@prisma/client/runtime/library").Decimal;
        transaccion: string;
        estado: import(".prisma/client").$Enums.Estado;
        Metodo_Pago: import(".prisma/client").$Enums.MetodoPago;
        usuario_id: number;
    }>;
    completeOrder(id: number): Promise<{
        id: number;
        creado: Date;
        hora_programada: Date;
        monto_total: import("@prisma/client/runtime/library").Decimal;
        transaccion: string;
        estado: import(".prisma/client").$Enums.Estado;
        Metodo_Pago: import(".prisma/client").$Enums.MetodoPago;
        usuario_id: number;
    }>;
    cancelOrder(id: number): Promise<{
        id: number;
        creado: Date;
        hora_programada: Date;
        monto_total: import("@prisma/client/runtime/library").Decimal;
        transaccion: string;
        estado: import(".prisma/client").$Enums.Estado;
        Metodo_Pago: import(".prisma/client").$Enums.MetodoPago;
        usuario_id: number;
    }>;
}
