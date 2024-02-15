import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { ReviewService } from './review.service'
import { CreateReviewDto } from './dto/createReview.dto'
import { UpdateReviewDto } from './dto/updateReview.dto'

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  async create(@Body() createReviewDto: CreateReviewDto) {
    return await this.reviewService.create(createReviewDto)
  }

  @Get()
  async findAll() {
    return await this.reviewService.findAll()
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.reviewService.findOne(id)
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
    return await this.reviewService.update(id, updateReviewDto)
  }

  @Delete(':id')
  async deleteById(@Param('id') id: string) {
    return await this.reviewService.remove(id)
  }
}
