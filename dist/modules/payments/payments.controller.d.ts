import { PaymentsService } from './payments.service';
import { PaymentsQueryParams } from './query-params/payments-query-params';
export declare class PaymentsController {
    private readonly paymentsService;
    constructor(paymentsService: PaymentsService);
    findAll(dto: PaymentsQueryParams): Promise<{
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
    findOne(id: string): Promise<{
        id: number;
        transaccion: string;
        creado: string;
        monto_total: import("@prisma/client/runtime/library").Decimal;
        codigo: string;
        metodo_pago: import(".prisma/client").$Enums.MetodoPago;
    }>;
}
