import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '@/prisma/prisma.service'
import { Prisma, Product } from '@prisma/client'
import {
  ERROR_MESSAGES,
  MESSAGES,
  DESCENDING_ORDER,
  SUCCESS_MESSAGES
} from '@/utils/stringConstants/string.constant'
import { CreateProductDto } from './dto/createProduct.dto'
import { UpdateProductDto } from './dto/updateProduct.dto'
import { CloudinaryService } from '@/cloudinary/cloudinary.service'

@Injectable()
export class ProductsService {
  constructor(
    private readonly prisma: PrismaService,
    private cloudinary: CloudinaryService
  ) {}
  async create(
    createProductDto: CreateProductDto,
    files: Array<Express.Multer.File>,
    userId: string
  ) {
    if (files) {
      const uploadedImages = await this.cloudinary.uploadImagesToCloudinary(files)
      const imageUrls = uploadedImages.flatMap((uploadResponse: string[]) => uploadResponse)
      createProductDto.images = imageUrls
    }
    createProductDto.sellerId = userId

    const product = await this.prisma.product.create({
      data: createProductDto
    })
    return { product, message: SUCCESS_MESSAGES.CREATEMESSAGE(product.name) }
  }

  async findAll(): Promise<Product[]> {
    return await this.prisma.product.findMany({
      orderBy: {
        createdAt: DESCENDING_ORDER
      }
    })
  }

  async findOneById(id: string): Promise<Product> {
    return await this.findUniqueProduct({ where: { id } })
  }

  async updateById(id: string, updateProductDto: UpdateProductDto) {
    await this.findUniqueProduct({ where: { id } })
    const product = await this.prisma.product.update({
      where: { id },
      data: updateProductDto
    })
    return { product, message: SUCCESS_MESSAGES.UPDATEMESSAGE(MESSAGES.PRODUCT) }
  }

  async deleteById(id: string) {
    const product = await this.findUniqueProduct({ where: { id } })
    return { product, message: SUCCESS_MESSAGES.DELETEMESSAGE(MESSAGES.PRODUCT) }
  }

  async findUniqueProduct(where: {
    where: Prisma.ProductWhereUniqueInput
  }): Promise<Product | undefined> {
    const product = await this.prisma.product.findUnique(where)
    if (!product) throw new NotFoundException(ERROR_MESSAGES.NOT_FOUND)
    return product
  }
}
