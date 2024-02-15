import * as bcrypt from 'bcrypt'
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { Prisma, User } from '@prisma/client'
import { CreateUserDto } from './dto/createUser.dto'
import { UpdateUserDto } from './dto/updateUser.dto'
import { PrismaService } from '@/Prisma/prisma.service'
import {
  HTTP_METHOD,
  ERROR_MESSAGES,
  DESCENDING_ORDER,
  saltOrRounds
} from '@/utils/stringConstants/string.constant'

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email, password } = createUserDto
    await this.ensureUniqueEmail(email, HTTP_METHOD.POST)
    const hashPassword = await this.hashPassword(password)
    return await this.prisma.user.create({
      data: {
        ...createUserDto,
        password: hashPassword
      }
    })
  }

  async findAll(): Promise<User[]> {
    return await this.prisma.user.findMany({
      orderBy: {
        createdAt: DESCENDING_ORDER
      }
    })
  }

  async findOneById(id: string): Promise<User> {
    return await this.findUniqueUser({ where: { id } })
  }

  async updateById(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    await this.findUniqueUser({ where: { id } })
    if (updateUserDto.password) {
      updateUserDto.password = await this.hashPassword(updateUserDto.password)
    }
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: updateUserDto
    })

    return updatedUser
  }

  async deleteById(id: string): Promise<User> {
    await this.findUniqueUser({ where: { id } })
    return await this.prisma.user.delete({ where: { id } })
  }

  async findUniqueUser(
    where: { where: Prisma.UserWhereUniqueInput },
    method?: string
  ): Promise<User | undefined> {
    const user = await this.prisma.user.findUnique(where)
    if (!user && method !== HTTP_METHOD.POST) throw new NotFoundException(ERROR_MESSAGES.NOT_FOUND)
    return user
  }

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, saltOrRounds)
  }

  async ensureUniqueEmail(email: string, method?: string): Promise<void> {
    const existingUser = await this.findUniqueUser({ where: { email } }, method)
    if (existingUser) {
      throw new ConflictException(ERROR_MESSAGES.EMAIL_TAKEN)
    }
  }
}
