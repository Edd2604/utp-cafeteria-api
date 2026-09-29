import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { ValidateId } from '@common/pipes/validate-id.pipe'
import { SearchStatusQueryParamsDto } from '@common/query-params/search-status-query-params'
import { UseFileInterceptor } from '@common/decorators/file-interceptor.decorator'
import { UploadFile } from '@common/decorators/upload-files.decorator'
import { ApiConsumes } from '@nestjs/swagger'
import { ApiBody } from '@nestjs/swagger'
import { Categoria } from '@prisma/client'

import { ProductsService } from './products.service'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { ProductsQueryParams } from './query-params/products-query-params'
@ApiTags('Productos')
@Controller('productos')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseFileInterceptor()
  @Post('/crear-producto')
  @ApiOperation({
    summary: 'Crea un producto',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
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
          enum: Object.values(Categoria),
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
  })
  create(
    @Body() createProductDto: CreateProductDto,
    @UploadFile() file?: Express.Multer.File,
  ) {
    return this.productsService.create(createProductDto, file)
  }

  @Get(':productoID/obtener-producto')
  @ApiOperation({
    summary: 'Obtiene un producto',
  })
  async getOne(@Param('productoID', ValidateId) productoId: number) {
    return this.productsService.getOne(productoId)
  }

  @Get('obtener-productos')
  @ApiOperation({
    summary: 'Obtiene todos los productos',
  })
  async getAll(@Query() params: SearchStatusQueryParamsDto) {
    return this.productsService.getAll(params)
  }

  @Get('obtener-productos-disponibles')
  @ApiOperation({
    summary: 'Obtiene todos los productos disponibles',
  })
  async getActives(@Query() params: ProductsQueryParams) {
    return this.productsService.getActiveProducts(params)
  }

  @UseFileInterceptor()
  @Patch(':productoID/actualizar-producto')
  @ApiOperation({
    summary: 'Actualiza la información de un producto',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
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
          enum: Object.values(Categoria),
          description: 'Categoría del producto',
        },
        habilitado: {
          type: 'boolean',
          description: 'Estado habilitado del producto',
        },
      },
    },
  })
  async update(
    @Param('productoID', ValidateId) productId: number,
    @Body() updateProductDto: UpdateProductDto,
    @UploadFile() file?: Express.Multer.File,
  ) {
    const product = await this.productsService.update(
      productId,
      updateProductDto,
      file,
    )
    return product
  }

  @Delete(':productoID/remover-producto')
  @ApiOperation({
    summary: 'Archiva un producto',
  })
  async remove(@Param('productoID', ValidateId) productoId: number) {
    const admin = await this.productsService.remove(productoId)
    return admin
  }
}
