import { SearchQueryParamsDto } from '@common/query-params/search-query-params';
import { MetodoPago } from '@prisma/client';
export declare class PaymentsQueryParams extends SearchQueryParamsDto {
    method: MetodoPago;
}
