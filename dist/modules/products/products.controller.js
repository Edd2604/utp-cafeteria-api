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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const validate_id_pipe_1 = require("../../common/pipes/validate-id.pipe");
const search_status_query_params_1 = require("../../common/query-params/search-status-query-params");
const file_interceptor_decorator_1 = require("../../common/decorators/file-interceptor.decorator");
const upload_files_decorator_1 = require("../../common/decorators/upload-files.decorator");
const swagger_2 = require("@nestjs/swagger");
const swagger_3 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
const products_service_1 = require("./products.service");
const create_product_dto_1 = require("./dto/create-product.dto");
const update_product_dto_1 = require("./dto/update-product.dto");
const products_query_params_1 = require("./query-params/products-query-params");
let ProductsController = class ProductsController {
    constructor(productsService) {
        this.productsService = productsService;
    }
    create(createProductDto, file) {
        return this.productsService.create(createProductDto, file);
    }
    async getOne(productoId) {
        return this.productsService.getOne(productoId);
    }
    async getAll(params) {
        return this.productsService.getAll(params);
    }
    async getActives(params) {
        return this.productsService.getActiveProducts(params);
    }
    async update(productId, updateProductDto, file) {
        const product = await this.productsService.update(productId, updateProductDto, file);
        return product;
    }
    async remove(productoId) {
        const admin = await this.productsService.remove(productoId);
        return admin;
    }
};
exports.ProductsController = ProductsController;
__decorate([
    (0, file_interceptor_decorator_1.UseFileInterceptor)(),
    (0, common_1.Post)('/crear-producto'),
    (0, swagger_1.ApiOperation)({
        summary: 'Crea un producto',
    }),
    (0, swagger_2.ApiConsumes)('multipart/form-data'),
    (0, swagger_3.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
                nombre: {
                    type: 'string',
                    minLength: 3,
                    maxLength: 100,
                    description: 'Nombre del producto',
                },
                descripcion: {
                    type: 'string',
                    description: 'Descripción del producto',
                },
                precio: {
                    type: 'number',
                    format: 'float',
                    description: 'Precio del producto (máximo 2 decimales)',
                },
                limite_de_orden: {
                    type: 'integer',
                    description: 'Límite de orden del producto (número entero positivo)',
                },
                categoria: {
                    type: 'string',
                    enum: Object.values(client_1.Categoria),
                    description: 'Categoría del producto',
                },
                habilitado: {
                    type: 'boolean',
                    description: 'Estado habilitado del producto (opcional)',
                },
            },
            required: [
                'file',
                'nombre',
                'descripcion',
                'precio',
                'limite_de_orden',
                'categoria',
            ],
        },
    }),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, upload_files_decorator_1.UploadFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_dto_1.CreateProductDto, Object]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':productoID/obtener-producto'),
    (0, swagger_1.ApiOperation)({
        summary: 'Obtiene un producto',
    }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('productoID', validate_id_pipe_1.ValidateId)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "getOne", null);
__decorate([
    (0, common_1.Get)('obtener-productos'),
    (0, swagger_1.ApiOperation)({
        summary: 'Obtiene todos los productos',
    }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [search_status_query_params_1.SearchStatusQueryParamsDto]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)('obtener-productos-disponibles'),
    (0, swagger_1.ApiOperation)({
        summary: 'Obtiene todos los productos disponibles',
    }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [products_query_params_1.ProductsQueryParams]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "getActives", null);
__decorate([
    (0, file_interceptor_decorator_1.UseFileInterceptor)(),
    (0, common_1.Patch)(':productoID/actualizar-producto'),
    (0, swagger_1.ApiOperation)({
        summary: 'Actualiza la información de un producto',
    }),
    (0, swagger_2.ApiConsumes)('multipart/form-data'),
    (0, swagger_3.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
                nombre: {
                    type: 'string',
                    minLength: 3,
                    maxLength: 100,
                    description: 'Nombre del producto',
                },
                descripcion: {
                    type: 'string',
                    description: 'Descripción del producto',
                },
                precio: {
                    type: 'number',
                    format: 'float',
                    description: 'Precio del producto (máximo 2 decimales)',
                },
                limite_de_orden: {
                    type: 'integer',
                    description: 'Límite de orden del producto (número entero positivo)',
                },
                categoria: {
                    type: 'string',
                    enum: Object.values(client_1.Categoria),
                    description: 'Categoría del producto',
                },
                habilitado: {
                    type: 'boolean',
                    description: 'Estado habilitado del producto',
                },
            },
        },
    }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('productoID', validate_id_pipe_1.ValidateId)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, upload_files_decorator_1.UploadFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_product_dto_1.UpdateProductDto, Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':productoID/remover-producto'),
    (0, swagger_1.ApiOperation)({
        summary: 'Archiva un producto',
    }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('productoID', validate_id_pipe_1.ValidateId)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "remove", null);
exports.ProductsController = ProductsController = __decorate([
    (0, swagger_1.ApiTags)('Productos'),
    (0, common_1.Controller)('productos'),
    __metadata("design:paramtypes", [products_service_1.ProductsService])
], ProductsController);
//# sourceMappingURL=products.controller.js.map