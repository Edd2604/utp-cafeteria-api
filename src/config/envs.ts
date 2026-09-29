import 'dotenv/config'
import * as joi from 'joi'

interface EnvVariables {
  PORT: number
  DATABASE_URL: string
  JWT_SECRET: string
  JWT_REFRESH_SECRET: string
  RENIEC_TOKEN: string
  CLOUDINARY_NAME: string
  CLOUDINARY_API_KEY: string
  CLOUDINARY_API_SECRET: string
  CRON_SECRET: string
  PUSHER_APP_ID: string
  PUSHER_KEY: string
  PUSHER_SECRET: string
  PUSHER_CLUSTER: string
  VAPID_PUBLIC_KEY: string
  VAPID_PRIVATE_KEY: string
}

const envSchema = joi
  .object({
    PORT: joi.number().required(),
    DATABASE_URL: joi.string().required(),
    JWT_SECRET: joi.string().required(),
    JWT_REFRESH_SECRET: joi.string().required(),
    RENIEC_TOKEN: joi.string().required(),
    CLOUDINARY_NAME: joi.string().required(),
    CLOUDINARY_API_KEY: joi.string().required(),
    CLOUDINARY_API_SECRET: joi.string().required(),
    CRON_SECRET: joi.string().required(),
    PUSHER_APP_ID: joi.string().required(),
    PUSHER_KEY: joi.string().required(),
    PUSHER_SECRET: joi.string().required(),
    PUSHER_CLUSTER: joi.string().required(),
    VAPID_PUBLIC_KEY: joi.string().required(),
    VAPID_PRIVATE_KEY: joi.string().required(),
  })
  .unknown(true)

const { error, value } = envSchema.validate(process.env)

if (error) {
  throw new Error(`Config error: ${error.message}`)
}
const envVariables: EnvVariables = value

export const envs = {
  port: envVariables.PORT,
  database: envVariables.DATABASE_URL,
  jwtSecret: envVariables.JWT_SECRET,
  jwtRefreshSecret: envVariables.JWT_REFRESH_SECRET,
  reniecToken: envVariables.RENIEC_TOKEN,
  cloudinaryName: envVariables.CLOUDINARY_NAME,
  cloudinaryApiKey: envVariables.CLOUDINARY_API_KEY,
  cloudinaryApiSecret: envVariables.CLOUDINARY_API_SECRET,
  cronSecret: envVariables.CRON_SECRET,
  pusherAppId: envVariables.PUSHER_APP_ID,
  pusherKey: envVariables.PUSHER_KEY,
  pusherSecret: envVariables.PUSHER_SECRET,
  pusherCluster: envVariables.PUSHER_CLUSTER,
  vapidPublicKey: envVariables.VAPID_PUBLIC_KEY,
  vapidPrivateKey: envVariables.VAPID_PRIVATE_KEY,
}
