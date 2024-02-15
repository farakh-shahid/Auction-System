import { AuctionStatus } from '@prisma/client'
import { IsBoolean, IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateAuctionDto {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsDateString()
  startTime: Date

  @IsDateString()
  @IsNotEmpty()
  endTime: Date

  @IsEnum(AuctionStatus)
  status: AuctionStatus

  @IsBoolean()
  isApproved: boolean

  @IsString()
  @IsOptional()
  creatorId: string
}
