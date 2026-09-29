import { PipeTransform } from '@nestjs/common';
export declare class ValidateDNI implements PipeTransform {
    transform(value: string): string;
}
