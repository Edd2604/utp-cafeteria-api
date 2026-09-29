import { Injectable } from '@nestjs/common'
import { PrismaService } from '@providers/prisma/prisma.service'
import { formatDate } from '@common/utils/format-date'
import { Prisma, Rol } from '@prisma/client'
import { extractStudentCode } from '@common/utils/extract-code'

import { PaymentsQueryParams } from './query-params/payments-query-params'

@Injectable()
export class PaymentsService {
  constructor(private readonly db: PrismaService) {}
  async findAll({ page_size, page, query, method }: PaymentsQueryParams) {
    const pages = page || 1
    const skip = (pages - 1) * page_size
    const where = {
      AND: [
        query
          ? {
              Usuario: {
                correo: {
                  contains: query,
                  mode: Prisma.QueryMode.insensitive,
                },
              },
            }
          : {},
      ],
      Metodo_Pago: method,
      Usuario: { rol: Rol.ESTUDIANTE },
    }
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
    ])

    const data = orders.map((order) => ({
      id: order.id,
      transaccion: order.transaccion,
      creado: formatDate(order.creado),
      monto_total: Number(order.monto_total),
      codigo: extractStudentCode(order.Usuario.correo),
      metodo_pago: order.Metodo_Pago,
    }))

    const totalPages = Math.ceil(total / page_size)

    return {
      data,
      total,
      totalPages,
    }
  }

  async findOne(id: number) {
    const payment = await this.db.orden.findFirst({
      where: {
        id,
      },
      include: {
        Usuario: true,
      },
    })
    return {
      id: payment.id,
      transaccion: payment.transaccion,
      creado: formatDate(payment.creado),
      monto_total: payment.monto_total,
      codigo: extractStudentCode(payment.Usuario.correo),
      metodo_pago: payment.Metodo_Pago,
    }
  }
}
