import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary'

export type CloudinaryResponse = UploadApiResponse | UploadApiErrorResponse

export interface CloudinarySecureResponse {
  secure_url: string
}
