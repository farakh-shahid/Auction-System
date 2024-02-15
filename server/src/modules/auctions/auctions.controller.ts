import { Controller, Get, Post, Body, Param, Delete, Put, Patch } from '@nestjs/common'
import { AuctionsService } from './auctions.service'
import { CreateAuctionDto } from './dto/createAuction.dto'
import { UpdateAuctionDto } from './dto/updateAuction.dto'
import { Role } from '@/common/decorators/role.decorator'
import { AuctionStatus, User, UserRole } from '@prisma/client'
import currentUser from '@/common/decorators/currentUser.decorator'

@Controller('auction')
@Role(UserRole.ADMIN, UserRole.SELLER)
export class AuctionsController {
  constructor(private readonly auctionsService: AuctionsService) {}

  @Post()
  async create(@Body() createAuctionDto: CreateAuctionDto, @currentUser('id') userId: string) {
    return await this.auctionsService.create(createAuctionDto, userId)
  }

  @Get()
  async findAll(@currentUser() user: User) {
    return await this.auctionsService.findAll(user)
  }

  @Get(':id')
  async findOneById(@Param('id') id: string) {
    return await this.auctionsService.findOneById(id)
  }

  @Put(':id')
  async updateById(@Param('id') id: string, @Body() updateAuctionDto: UpdateAuctionDto) {
    return await this.auctionsService.updateById(id, updateAuctionDto)
  }

  @Delete(':id')
  async deleteById(@Param('id') id: string) {
    return await this.auctionsService.deleteById(id)
  }

  @Patch('/:id/update-status')
  async updateStatus(@Param('id') id: string, @Body() data: { status: AuctionStatus }) {
    return await this.auctionsService.updateStatus(id, data)
  }
}
