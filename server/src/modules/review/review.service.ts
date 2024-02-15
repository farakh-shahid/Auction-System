import { Injectable } from '@nestjs/common'
import { CreateReviewDto } from './dto/createReview.dto'
import { UpdateReviewDto } from './dto/updateReview.dto'
import { PrismaService } from '@/prisma/prisma.service'

@Injectable()
export class ReviewService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createReviewDto: CreateReviewDto) {
    return await this.prisma.review.create({
      data: createReviewDto
    })
  }

  async findAll() {
    return await this.prisma.review.findMany()
  }

  async findOne(id: string) {
    return await this.prisma.review.findUnique({ where: { id } })
  }

  async update(id: string, updateReviewDto: UpdateReviewDto) {
    return await this.prisma.review.update({ where: { id }, data: updateReviewDto })
  }

  async remove(id: string) {
    return await this.prisma.review.delete({ where: { id } })
  }
}
