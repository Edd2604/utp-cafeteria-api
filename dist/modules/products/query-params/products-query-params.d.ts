import { SearchQueryParamsDto } from '@common/query-params/search-query-params';
declare enum OrderProducts {
    asc = "asc",
    desc = "desc"
}
export declare class ProductsQueryParams extends SearchQueryParamsDto {
    category: string;
    max_price: number;
    order: OrderProducts;
}
export {};
