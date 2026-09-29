import { HttpService } from '@nestjs/axios'
import { Injectable, NotFoundException } from '@nestjs/common'
import { lastValueFrom } from 'rxjs'
import { envs } from '@config/envs'

import { IReniecResponse } from './interfaces/reniec-response.interface'

@Injectable()
export class ReniecService {
  constructor(private readonly http: HttpService) {}

  async getInfoDNI(dni: string): Promise<IReniecResponse> {
    const url = `https://api.apis.net.pe/v2/reniec/dni?numero=${dni}`
    try {
      const response = await lastValueFrom(
        this.http.get(url, {
          headers: {
            Authorization: `Bearer ${envs.reniecToken}`,
            'Content-Type': 'application/json',
          },
        }),
      )
      return response.data as IReniecResponse
    } catch (e) {
      console.warn(e)
      throw new NotFoundException('El DNI no existe')
    }
  }
}
