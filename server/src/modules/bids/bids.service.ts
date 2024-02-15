import { BadRequestException, Injectable, NotFoundException, Logger } from '@nestjs/common'
import { PrismaService } from '@/prisma/prisma.service'
import { DESCENDING_ORDER, ERROR_MESSAGES } from '@/utils/stringConstants/string.constant'
import { CreateBidDto } from './dto/createBid.dto'
import { AuctionStatus, BidStatus, ProductStatus, User, UserRole } from '@prisma/client'
import { UpdateBidDto } from './dto/updateBid.dto'

@Injectable()
export class BidsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createBidDto: CreateBidDto, userId: string) {
    const { productId, amount } = createBidDto
    const product = await this.getProduct(productId)

    if (!product) {
      throw new NotFoundException(ERROR_MESSAGES.PRODUCT_DOES_NOT_EXIST)
    }

    if (product?.auction?.endTime && new Date() > product.auction.endTime) {
      await this.closeAuction(productId)
      throw new BadRequestException(ERROR_MESSAGES.AUCTION_HAS_ENDED)
    }

    if (amount <= product.minimumBid) {
      throw new BadRequestException(ERROR_MESSAGES.BIDDING_AMOUNT_MUST_BE_GREATER)
    }

    const existingBid = await this.findExistingBid(productId)

    const newMaxBid = existingBid ? Math.max(existingBid.maxBid || 0, amount) : amount

    if (amount <= existingBid?.maxBid) {
      throw new BadRequestException(ERROR_MESSAGES.BID_MUST_BE_HIGHER)
    }

    const createdBid = await this.prisma.bid.create({
      data: {
        ...createBidDto,
        maxBid: newMaxBid,
        buyerId: userId,
        bidStatus: BidStatus.OPEN
      },
      include: {
        product: { select: { name: true, winnerEmail: true } }
      }
    })

    return { createdBid }
  }
  private async getProduct(productId: string) {
    return this.prisma.product.findUnique({
      where: {
        id: productId,
        status: ProductStatus.LIVE,
        auction: { status: AuctionStatus.APPROVED }
      },
      include: { auction: true }
    })
  }

  private async getWinningBid(productId: string) {
    return this.prisma.bid.findFirst({
      where: { productId },
      orderBy: { maxBid: DESCENDING_ORDER },
      include: { buyer: true }
    })
  }
  private async updateProductAndBids(productId: string, winnerEmail: string, id: string) {
    await this.prisma.$transaction(async prisma => {
      const updateProductPromise = prisma.product.update({
        where: { id: productId },
        data: { status: ProductStatus.SOLD, winnerEmail, buyerId: id }
      })

      const updateBidsPromise = prisma.bid.updateMany({
        where: { productId },
        data: { bidStatus: BidStatus.CLOSE }
      })

      await Promise.all([updateProductPromise, updateBidsPromise])
    })
  }

  async closeAuction(productId: string) {
    const winningBid = await this.getWinningBid(productId)

    if (winningBid) {
      await this.updateProductAndBids(productId, winningBid.buyer.email, winningBid.buyer.id)
    }
  }

  async findAll(user: User) {
    return await this.prisma.bid.findMany()
  }

  async findOneById(id: string) {
    return await this.prisma.bid.findUnique({ where: { id } })
  }

  async updateById(id: string, data: UpdateBidDto) {
    const { amount, productId } = data
    const existingBid = await this.findExistingBid(productId)
    if (amount <= existingBid?.maxBid) {
      throw new BadRequestException(ERROR_MESSAGES.BID_MUST_BE_HIGHER)
    }

    return await this.prisma.bid.update({
      where: {
        id
      },
      data: data
    })
  }

  async deleteById(id: string) {
    return await this.prisma.bid.delete({ where: { id } })
  }

  async findExistingBid(productId: string) {
    return await this.prisma.bid.findFirst({
      where: { productId },
      orderBy: { maxBid: DESCENDING_ORDER }
    })
  }
}
