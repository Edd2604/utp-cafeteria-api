import { BadRequestException } from '@nestjs/common';
interface PrismaConflictException {
    code: string;
    meta: {
        target: string[];
        modelName: string;
    };
}
export declare class PrismaException extends BadRequestException {
    constructor(error: PrismaConflictException);
}
export {};
