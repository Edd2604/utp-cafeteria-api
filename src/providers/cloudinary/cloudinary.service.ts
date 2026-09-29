import { Injectable } from '@nestjs/common'
import { v2 as cloudinary } from 'cloudinary'
import * as streamifier from 'streamifier'

import {
  CloudinaryResponse,
  CloudinarySecureResponse,
} from './interfaces/cloudinary-response.interface'

@Injectable()
export class CloudinaryService {
  private uploadFile(
    file: Express.Multer.File,
  ): Promise<CloudinarySecureResponse> {
    return new Promise<CloudinarySecureResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        (error, result: CloudinaryResponse) => {
          if (error) return reject(error)
          if (result && 'secure_url' in result) {
            return resolve({ secure_url: result.secure_url })
          }
          reject(new Error('No se encontró secure_url en la respuesta'))
        },
      )

      streamifier.createReadStream(file.buffer).pipe(uploadStream)
    })
  }

  async uploadFilesToCloudinary(
    files: Express.Multer.File[],
  ): Promise<string[]> {
    let filesUploaded: string[] = []
    if (files && files.length > 0) {
      const uploaded = await Promise.all(
        files.map((file) => this.uploadFile(file)),
      )
      const urls: string[] = uploaded.map((file) => file.secure_url)
      filesUploaded = urls
    }
    return filesUploaded
  }

  async uploadFileToCloudinary(file: Express.Multer.File): Promise<string> {
    let fileUploaded = 'PENDIENTE'
    if (file) {
      const upload = await this.uploadFile(file)
      fileUploaded = upload.secure_url
    }
    return fileUploaded
  }
}
