import { PipeTransform } from '@nestjs/common';
export declare class ValidateId implements PipeTransform {
    transform(value: string): number;
}
