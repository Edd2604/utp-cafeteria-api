import { v2 as cloudinary } from 'cloudinary'
import { envs } from '@config/envs'

export const CloudinaryProvider = {
  provide: 'Cloudinary',
  useFactory: () => {
    return cloudinary.config({
      cloud_name: envs.cloudinaryName,
      api_key: envs.cloudinaryApiKey,
      api_secret: envs.cloudinaryApiSecret,
    })
  },
}
