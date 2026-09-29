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
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../providers/prisma/prisma.service");
const prisma_exception_1 = require("../../providers/prisma/exceptions/prisma.exception");
const format_date_1 = require("../../common/utils/format-date");
const client_1 = require("@prisma/client");
const luxon_1 = require("luxon");
const cloudinary_service_1 = require("../../providers/cloudinary/cloudinary.service");
let ProductsService = class ProductsService {
    constructor(db, cloudinary) {
        this.db = db;
        this.cloudinary = cloudinary;
    }
    async create(createProductDto, file) {
        const url = await this.cloudinary.uploadFileToCloudinary(file);
        try {
            const producto = await this.db.producto.create({
                omit: { archivado: true },
                data: {
                    ...createProductDto,
                    url: url,
                },
            });
            return {
                ...producto,
                creado: (0, format_date_1.formatDate)(producto.creado),
                actualizado: (0, format_date_1.formatDate)(producto.actualizado),
            };
        }
        catch (e) {
            if (e.code)
                throw new prisma_exception_1.PrismaException(e);
            throw new common_1.InternalServerErrorException('Hubo un error al crear el producto');
        }
    }
    async getAll({ query, page, page_size, enable }) {
        const pages = page || 1;
        const skip = (pages - 1) * page_size;
        const where = {
            AND: [
                query
                    ? {
                        nombre: { contains: query, mode: client_1.Prisma.QueryMode.insensitive },
                    }
                    : {},
                enable !== null && enable !== undefined ? { habilitado: enable } : {},
            ],
            archivado: false,
        };
        const [products, total] = await Promise.all([
            this.db.producto.findMany({
                where,
                skip,
                omit: { archivado: true },
                take: page_size,
            }),
            this.db.producto.count({ where }),
        ]);
        const data = products.map((product) => {
            return {
                ...product,
                creado: (0, format_date_1.formatDate)(product.creado),
                actualizado: (0, format_date_1.formatDate)(product.actualizado),
            };
        });
        const totalPages = Math.ceil(total / page_size);
        return {
            data,
            total,
            totalPages,
        };
    }
    async getActiveProducts({ query, page, page_size, order, max_price, category, }) {
        const pages = page || 1;
        const skip = (pages - 1) * page_size;
        const now = luxon_1.DateTime.now().setZone('America/Lima').startOf('day');
        const today = now.toJSDate();
        const where = {
            nombre: query
                ? { contains: query, mode: client_1.Prisma.QueryMode.insensitive }
                : undefined,
            ...(max_price && { precio: { lte: max_price } }),
            ...(category && { categoria: category }),
            habilitado: true,
            archivado: false,
            Inventario_Diario: {
                some: {
                    stock: { gt: 0 },
                    fecha: {
                        gte: today,
                        lt: now.plus({ days: 1 }).toJSDate(),
                    },
                },
            },
        };
        const [products, total] = await Promise.all([
            this.db.producto.findMany({
                where,
                skip,
                omit: { archivado: true },
                take: page_size,
                include: {
                    Inventario_Diario: {
                        where: {
                            fecha: {
                                gte: today,
                                lt: now.plus({ days: 1 }).toJSDate(),
                            },
                        },
                        select: { stock: true },
                    },
                },
                orderBy: order
                    ? { precio: order === 'asc' ? 'asc' : 'desc' }
                    : undefined,
            }),
            this.db.producto.count({ where }),
        ]);
        const totalPages = Math.ceil(total / page_size);
        const data = products.map((product) => {
            return {
                ...product,
                stock: product.Inventario_Diario[0].stock,
                creado: (0, format_date_1.formatDate)(product.creado),
                actualizado: (0, format_date_1.formatDate)(product.actualizado),
            };
        });
        return {
            data,
            total,
            totalPages,
        };
    }
    async getOne(id) {
        const product = await this.db.producto.findUnique({
            omit: { archivado: true },
            where: {
                id,
                archivado: false,
            },
        });
        if (!product)
            throw new common_1.NotFoundException(`El producto con el id ${id} no existe`);
        return {
            ...product,
            creado: (0, format_date_1.formatDate)(product.creado),
            actualizado: (0, format_date_1.formatDate)(product.actualizado),
        };
    }
    async update(id, updateProductDto, file) {
        let url = null;
        if (file) {
            url = await this.cloudinary.uploadFileToCloudinary(file);
        }
        try {
            const producto = await this.db.producto.update({
                omit: { archivado: true },
                where: {
                    id,
                    archivado: false,
                },
                data: {
                    ...updateProductDto,
                    ...(url ? { url } : {}),
                },
            });
            return {
                ...producto,
                creado: (0, format_date_1.formatDate)(producto.creado),
                actualizado: (0, format_date_1.formatDate)(producto.actualizado),
            };
        }
        catch (e) {
            if (e.code)
                throw new prisma_exception_1.PrismaException(e);
            throw new common_1.InternalServerErrorException('Hubo un error al actualizar el producto');
        }
    }
    async remove(id) {
        try {
            const producto = await this.db.producto.update({
                where: {
                    id,
                    archivado: false,
                },
                data: { archivado: true, habilitado: false },
            });
            if (producto) {
                return { id: producto.id, message: 'Producto archivado correctamente' };
            }
        }
        catch (e) {
            if (e.code)
                throw new prisma_exception_1.PrismaException(e);
            throw new common_1.InternalServerErrorException('Hubo un error al archivar el producto');
        }
    }
    async getProductsByIds(ids) {
        return await this.db.producto.findMany({
            where: {
                id: {
                    in: ids,
                },
            },
            omit: {
                creado: true,
                actualizado: true,
                url: true,
                descripcion: true,
                categoria: true,
            },
        });
    }
    async getActiveProductsIds() {
        return await this.db.producto.findMany({
            where: {
                habilitado: true,
                archivado: false,
            },
            select: {
                id: true,
            },
        });
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        cloudinary_service_1.CloudinaryService])
], ProductsService);
//# sourceMappingURL=products.service.js.map