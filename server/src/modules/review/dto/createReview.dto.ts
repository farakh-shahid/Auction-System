import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

export class CreateReviewDto {
  @IsNumber()
  rating: number

  @IsString()
  @IsOptional()
  comment: string

  @IsString()
  @IsNotEmpty()
  buyerId: string

  @IsString()
  @IsNotEmpty()
  sellerId: string
}
