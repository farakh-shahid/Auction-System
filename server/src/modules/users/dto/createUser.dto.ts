import { UserRole } from '@prisma/client'
import { IsString, IsEmail, IsNotEmpty, IsStrongPassword, IsEnum } from 'class-validator'

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsNotEmpty()
  @IsStrongPassword()
  password: string

  @IsString()
  @IsNotEmpty()
  firstName: string

  @IsString()
  @IsNotEmpty()
  lastName: string

  @IsNotEmpty()
  @IsEnum(UserRole)
  role: UserRole
}
