import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { CreateAuctionDto } from './dto/createAuction.dto'
import { UpdateAuctionDto } from './dto/updateAuction.dto'
import { PrismaService } from '@/prisma/prisma.service'
import { AuctionStatus, Prisma, User, UserRole } from '@prisma/client'
import {
  ERROR_MESSAGES,
  HTTP_METHOD,
  MESSAGES,
  DESCENDING_ORDER,
  SUCCESS_MESSAGES
} from '@/utils/stringConstants/string.constant'

@Injectable()
export class AuctionsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createAuctionDto: CreateAuctionDto, userId: string) {
    await this.ensureUniqueAuction(createAuctionDto.name, HTTP_METHOD.POST)
    createAuctionDto.creatorId = userId
    const auction = await this.prisma.auction.create({
      data: createAuctionDto
    })

    return { auction, message: SUCCESS_MESSAGES.CREATEMESSAGE(auction.name) }
  }

  async findAll(user: User) {
    const where =
      user.role === UserRole.ADMIN
        ? {}
        : user.role === UserRole.BUYER
          ? { status: AuctionStatus.APPROVED }
          : { creatorId: user.id }

    return await this.prisma.auction.findMany({
      where,
      orderBy: { createdAt: DESCENDING_ORDER },
      include: {
        creator: {
          select: {
            firstName: true,
            email: true
          }
        },
        products: true
      }
    })
  }

  // async findOneById(id: string) {
  //   return await this.prisma.auction.findUnique({
  //     where: { id },
  //     include: {
  //       creator: {
  //         select: {
  //           firstName: true,
  //           email: true
  //         }
  //       },
  //       products: {
  //         include: {
  //           bids: true
  //         }
  //       }
  //     }
  //   })
  // }
  async findOneById(id: string) {
    const auction = await this.prisma.auction.findUnique({
      where: { id },
      include: {
        creator: {
          select: {
            firstName: true,
            email: true
          }
        },
        products: {
          include: {
            bids: {
              select: {
                id: true,
                maxBid: true
              }
            }
          }
        }
      }
    })

    const productsWithBidsCount = auction?.products.map(product => {
      const maxBid = Math.max(...product.bids.map(bid => bid.maxBid))
      return {
        ...product,
        bidsCount: product.bids.length,
        maxBid
      }
    })

    const modifiedAuction = auction
      ? {
          ...auction,
          products: productsWithBidsCount
        }
      : null

    return modifiedAuction
  }

  async updateById(id: string, updateAuctionDto: UpdateAuctionDto) {
    await this.findUniqueAuction({ where: { id } })
    const auction = await this.prisma.auction.update({ where: { id }, data: updateAuctionDto })
    return { auction, message: SUCCESS_MESSAGES.UPDATEMESSAGE(MESSAGES.AUCTION) }
  }

  async deleteById(id: string) {
    const auction = await this.findUniqueAuction({ where: { id } })
    return { auction, message: SUCCESS_MESSAGES.DELETEMESSAGE(MESSAGES.AUCTION) }
  }

  async updateStatus(id: string, data: { status: AuctionStatus }) {
    await this.findUniqueAuction({ where: { id } })

    const auction = await this.prisma.auction.update({
      where: { id },
      data: {
        status: data.status
      }
    })
    return { auction, message: SUCCESS_MESSAGES.AUCTION_STATUS_UPDATED }
  }

  async findUniqueAuction(where: { where: Prisma.AuctionWhereUniqueInput }, method?: string) {
    const auction = await this.prisma.auction.findUnique(where)
    if (!auction && method !== HTTP_METHOD.POST)
      throw new NotFoundException(ERROR_MESSAGES.NOT_FOUND)
    return auction
  }

  async ensureUniqueAuction(name: string, method?: string): Promise<void> {
    const existingAuction = await this.findUniqueAuction({ where: { name } }, method)
    if (existingAuction) {
      throw new ConflictException(ERROR_MESSAGES.AUCTION_NAME_ALREADY_TAKEN)
    }
  }
}
