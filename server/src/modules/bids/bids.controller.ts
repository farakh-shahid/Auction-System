import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { BidsService } from './bids.service'
import { CreateBidDto } from './dto/createBid.dto'
import { UpdateBidDto } from './dto/updateBid.dto'
import { Role } from '@/common/decorators/role.decorator'
import { UserRole } from '@prisma/client'
import User from '@/common/decorators/currentUser.decorator'

@Controller('bids')
@Role(UserRole.ADMIN, UserRole.BUYER)
export class BidsController {
  constructor(private readonly bidsService: BidsService) {}

  @Post()
  @Role(UserRole.ADMIN, UserRole.SELLER)
  async create(@Body() createBidDto: CreateBidDto, @User('id') userId: string) {
    return await this.bidsService.create(createBidDto, userId)
  }

  @Get()
  async findAll(@User() user: User) {
    return await this.bidsService.findAll(user)
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.bidsService.findOneById(id)
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateBidDto: UpdateBidDto) {
    return await this.bidsService.updateById(id, updateBidDto)
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.bidsService.deleteById(id)
  }
}
