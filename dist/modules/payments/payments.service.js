"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../providers/prisma/prisma.service");
const format_date_1 = require("../../common/utils/format-date");
const client_1 = require("@prisma/client");
const extract_code_1 = require("../../common/utils/extract-code");
let PaymentsService = class PaymentsService {
    constructor(db) {
        this.db = db;
    }
    async findAll({ page_size, page, query, method }) {
        const pages = page || 1;
        const skip = (pages - 1) * page_size;
        const where = {
            AND: [
                query
                    ? {
                        Usuario: {
                            correo: {
                                contains: query,
                                mode: client_1.Prisma.QueryMode.insensitive,
                            },
                        },
                    }
                    : {},
            ],
            Metodo_Pago: method,
            Usuario: { rol: client_1.Rol.ESTUDIANTE },
        };
        const [orders, total] = await Promise.all([
            this.db.orden.findMany({
                where,
                select: {
                    id: true,
                    creado: true,
                    transaccion: true,
                    monto_total: true,
                    Metodo_Pago: true,
                    Usuario: {
                        select: {
                            correo: true,
                        },
                    },
                },
                skip: skip,
                take: page_size,
            }),
            this.db.orden.count({
                where,
            }),
        ]);
        const data = orders.map((order) => ({
            id: order.id,
            transaccion: order.transaccion,
            creado: (0, format_date_1.formatDate)(order.creado),
            monto_total: Number(order.monto_total),
            codigo: (0, extract_code_1.extractStudentCode)(order.Usuario.correo),
            metodo_pago: order.Metodo_Pago,
        }));
        const totalPages = Math.ceil(total / page_size);
        return {
            data,
            total,
            totalPages,
        };
    }
    async findOne(id) {
        const payment = await this.db.orden.findFirst({
            where: {
                id,
            },
            include: {
                Usuario: true,
            },
        });
        return {
            id: payment.id,
            transaccion: payment.transaccion,
            creado: (0, format_date_1.formatDate)(payment.creado),
            monto_total: payment.monto_total,
            codigo: (0, extract_code_1.extractStudentCode)(payment.Usuario.correo),
            metodo_pago: payment.Metodo_Pago,
        };
    }
};
exports.PaymentsService = PaymentsService;
exports.PaymentsService = PaymentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PaymentsService);
//# sourceMappingURL=payments.service.js.map