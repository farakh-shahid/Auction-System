import { CLOUDINARY } from '@/utils/stringConstants/string.constant'
import { v2, ConfigOptions } from 'cloudinary'

export const CloudinaryProvider = {
  provide: CLOUDINARY,
  useFactory: (): ConfigOptions => {
    return v2.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET
    })
  }
}
