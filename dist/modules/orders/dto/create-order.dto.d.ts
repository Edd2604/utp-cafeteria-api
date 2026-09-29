import { CreateOrderItem } from './create-order-item.dto';
export declare class CreateOrderDto {
    hora_programada: Date;
    monto_total: number;
    orderItems: CreateOrderItem[];
}
