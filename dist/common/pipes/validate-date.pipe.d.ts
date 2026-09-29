import { PipeTransform } from '@nestjs/common';
export declare class ValidateDate implements PipeTransform {
    transform(value: string): Date;
}
