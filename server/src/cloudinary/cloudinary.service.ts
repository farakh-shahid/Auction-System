import { BadRequestException, Injectable } from '@nestjs/common'
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary'
import toStream = require('buffer-to-stream')
import { ERROR_MESSAGES } from '@/utils/stringConstants/string.constant'

@Injectable()
export class CloudinaryService {
  async uploadImage(files: Express.Multer.File[]): Promise<string[]> {
    const uploadPromises: Promise<string>[] = files.map(
      file =>
        new Promise((resolve, reject) => {
          const upload = v2.uploader.upload_stream((error, result) => {
            if (error) return reject(error)
            resolve(result.secure_url)
          })

          toStream(file.buffer).pipe(upload)
        })
    )

    return Promise.all(uploadPromises)
  }

  async uploadImagesToCloudinary(files: Express.Multer.File[]) {
    const uploadImages = files.map(file =>
      this.uploadImage([file]).catch(() => {
        throw new BadRequestException(ERROR_MESSAGES.UPLOAD_IMAGE_FAILED)
      })
    )
    return Promise.all(uploadImages.flat())
  }
}
