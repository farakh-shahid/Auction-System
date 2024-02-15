import * as bcrypt from 'bcrypt'
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { AuthDto } from './dto/auth.dto'
import { PrismaService } from '@/prisma/prisma.service'
import {
  ERROR_MESSAGES,
  JWT_EXPIRES_TIME,
  JWT_SECRET
} from '@/utils/stringConstants/string.constant'
import { ConfigService } from '@nestjs/config'
import { User } from '@prisma/client'

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}
  async signin(data: AuthDto) {
    const { email, password } = data
    const user = await this.prisma.user.findUnique({ where: { email } })
    if (!user) {
      throw new NotFoundException(ERROR_MESSAGES.NOT_REGISTERED)
    }
    const matchPassword = await bcrypt.compare(password, user.password)
    if (!matchPassword) {
      throw new BadRequestException(ERROR_MESSAGES.PASSWORD_EMAIL_INVALID)
    }
    const { password: userPassword, ...sanitizedUser } = user
    const accessToken = await this.generateTokens(sanitizedUser)
    return { accessToken }
  }

  async generateTokens(user: Partial<User>): Promise<string> {
    return this.jwtService.sign(user, {
      secret: this.configService.get<string>(JWT_SECRET),
      expiresIn: JWT_EXPIRES_TIME
    })
  }

  validateToken(token: string) {
    return this.jwtService.verify(token, {
      secret: this.configService.get<string>(JWT_SECRET)
    })
  }
}
