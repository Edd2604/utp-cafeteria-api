import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common'
import { PrismaService } from '@providers/prisma/prisma.service'
import { PrismaException } from '@providers/prisma/exceptions/prisma.exception'
import { SearchStatusQueryParamsDto } from '@common/query-params/search-status-query-params'
import { formatDate } from '@common/utils/format-date'
import { Categoria, Prisma } from '@prisma/client'
import { DateTime } from 'luxon'
import { CloudinaryService } from '@providers/cloudinary/cloudinary.service'

import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { ProductsQueryParams } from './query-params/products-query-params'

@Injectable()
export class ProductsService {
  constructor(
    private readonly db: PrismaService,
    private readonly cloudinary: CloudinaryService,
  ) {}
  async create(createProductDto: CreateProductDto, file?: Express.Multer.File) {
    const url = await this.cloudinary.uploadFileToCloudinary(file)
    try {
      const producto = await this.db.producto.create({
        omit: { archivado: true },
        data: {
          ...createProductDto,
          url: url,
        },
      })
      return {
        ...producto,
        creado: formatDate(producto.creado),
        actualizado: formatDate(producto.actualizado),
      }
    } catch (e) {
      if (e.code) throw new PrismaException(e)
      throw new InternalServerErrorException(
        'Hubo un error al crear el producto',
      )
    }
  }

  async getAll({ query, page, page_size, enable }: SearchStatusQueryParamsDto) {
    const pages = page || 1
    const skip = (pages - 1) * page_size

    const where = {
      AND: [
        query
          ? {
              nombre: { contains: query, mode: Prisma.QueryMode.insensitive },
            }
          : {},
        enable !== null && enable !== undefined ? { habilitado: enable } : {},
      ],
      archivado: false,
    }

    const [products, total] = await Promise.all([
      this.db.producto.findMany({
        where,
        skip,
        omit: { archivado: true },
        take: page_size,
      }),
      this.db.producto.count({ where }),
    ])

    const data = products.map((product) => {
      return {
        ...product,
        creado: formatDate(product.creado),
        actualizado: formatDate(product.actualizado),
      }
    })
    const totalPages = Math.ceil(total / page_size)

    return {
      data,
      total,
      totalPages,
    }
  }

  async getActiveProducts({
    query,
    page,
    page_size,
    order,
    max_price,
    category,
  }: ProductsQueryParams) {
    const pages = page || 1
    const skip = (pages - 1) * page_size

    const now = DateTime.now().setZone('America/Lima').startOf('day')

    const today = now.toJSDate()
    const where = {
      nombre: query
        ? { contains: query, mode: Prisma.QueryMode.insensitive }
        : undefined,
      ...(max_price && { precio: { lte: max_price } }),
      ...(category && { categoria: category as Categoria }),
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
    }

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
    ])

    const totalPages = Math.ceil(total / page_size)

    const data = products.map((product) => {
      return {
        ...product,
        stock: product.Inventario_Diario[0].stock,
        creado: formatDate(product.creado),
        actualizado: formatDate(product.actualizado),
      }
    })
    return {
      data,
      total,
      totalPages,
    }
  }

  async getOne(id: number) {
    const product = await this.db.producto.findUnique({
      omit: { archivado: true },
      where: {
        id,
        archivado: false,
      },
    })
    if (!product)
      throw new NotFoundException(`El producto con el id ${id} no existe`)

    return {
      ...product,
      creado: formatDate(product.creado),
      actualizado: formatDate(product.actualizado),
    }
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
    file?: Express.Multer.File,
  ) {
    let url = null
    if (file) {
      url = await this.cloudinary.uploadFileToCloudinary(file)
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
      })
      return {
        ...producto,
        creado: formatDate(producto.creado),
        actualizado: formatDate(producto.actualizado),
      }
    } catch (e) {
      if (e.code) throw new PrismaException(e)
      throw new InternalServerErrorException(
        'Hubo un error al actualizar el producto',
      )
    }
  }

  async remove(id: number) {
    try {
      const producto = await this.db.producto.update({
        where: {
          id,
          archivado: false,
        },
        data: { archivado: true, habilitado: false },
      })
      if (producto) {
        return { id: producto.id, message: 'Producto archivado correctamente' }
      }
    } catch (e) {
      if (e.code) throw new PrismaException(e)
      throw new InternalServerErrorException(
        'Hubo un error al archivar el producto',
      )
    }
  }

  async getProductsByIds(ids: number[]) {
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
    })
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
    })
  }
}
