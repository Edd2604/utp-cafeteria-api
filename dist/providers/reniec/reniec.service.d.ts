import { HttpService } from '@nestjs/axios';
import { IReniecResponse } from './interfaces/reniec-response.interface';
export declare class ReniecService {
    private readonly http;
    constructor(http: HttpService);
    getInfoDNI(dni: string): Promise<IReniecResponse>;
}
