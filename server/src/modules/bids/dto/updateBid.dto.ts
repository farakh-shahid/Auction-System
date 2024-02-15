import { PartialType } from '@nestjs/mapped-types'
import { CreateBidDto } from './createBid.dto'

export class UpdateBidDto extends PartialType(CreateBidDto) {}
