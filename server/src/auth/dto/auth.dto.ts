import { IsString, IsNotEmpty, IsEmail } from 'class-validator'

export class AuthDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsString()
  @IsNotEmpty()
  password: string
}
