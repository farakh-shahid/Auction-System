import { ProductStatus } from '@prisma/client'
import { IsString, IsOptional, IsArray, IsNumber, IsEnum, IsNotEmpty } from 'class-validator'

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsOptional()
  @IsString()
  description?: string

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  images: string[]

  @IsNumber()
  @IsOptional()
  minimumBid: number

  @IsEnum(ProductStatus)
  status: ProductStatus

  @IsString()
  @IsOptional()
  sellerId: string

  @IsOptional()
  @IsString()
  auctionId?: string
}
