import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

export class CreateBidDto {
  @IsNumber()
  amount: number

  @IsString()
  @IsOptional()
  buyerId: string

  @IsString()
  @IsNotEmpty()
  productId: string
}
