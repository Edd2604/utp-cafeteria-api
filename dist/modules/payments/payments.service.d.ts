import { PrismaService } from '@providers/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { PaymentsQueryParams } from './query-params/payments-query-params';
export declare class PaymentsService {
    private readonly db;
    constructor(db: PrismaService);
    findAll({ page_size, page, query, method }: PaymentsQueryParams): Promise<{
        data: {
            id: number;
            transaccion: string;
            creado: string;
            monto_total: number;
            codigo: string;
            metodo_pago: import(".prisma/client").$Enums.MetodoPago;
        }[];
        total: number;
        totalPages: number;
    }>;
    findOne(id: number): Promise<{
        id: number;
        transaccion: string;
        creado: string;
        monto_total: Prisma.Decimal;
        codigo: string;
        metodo_pago: import(".prisma/client").$Enums.MetodoPago;
    }>;
}
