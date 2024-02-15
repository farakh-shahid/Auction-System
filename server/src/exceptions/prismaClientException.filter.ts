import { PRISMA_ERROR_MAP } from '@/utils/stringConstants/string.constant'
import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common'
import { BaseExceptionFilter } from '@nestjs/core'
import { Prisma } from '@prisma/client'
import { Response } from 'express'

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const { code, message } = exception
    const { status, message: customMessage } = PRISMA_ERROR_MAP[code] || {}

    response.status(status || HttpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: status || HttpStatus.INTERNAL_SERVER_ERROR,
      message: customMessage || message.replace(/\n/g, '')
    })
  }
}
