"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaException = void 0;
const common_1 = require("@nestjs/common");
class PrismaException extends common_1.BadRequestException {
    constructor(error) {
        let message = 'Ocurrió un error inesperado.';
        switch (error.code) {
            case 'P2002':
                message = `Ya existe un registro con el campo único: ${error.meta?.target?.join(', ')}`;
                break;
            case 'P2025':
                message = `El registro que intentas actualizar/archivar no existe.`;
                break;
            default:
                message = `Error de base de datos: código ${error.code}`;
        }
        super(message);
        this.name = 'PrismaException';
    }
}
exports.PrismaException = PrismaException;
//# sourceMappingURL=prisma.exception.js.map