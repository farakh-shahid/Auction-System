import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  UseInterceptors,
  UploadedFiles
} from '@nestjs/common'
import { ProductsService } from './products.service'
import { CreateProductDto } from './dto/createProduct.dto'
import { UpdateProductDto } from './dto/updateProduct.dto'
import { Role } from '@/common/decorators/role.decorator'
import { UserRole } from '@prisma/client'
import { RolesGuard } from '@/common/guards/role.guard'
import { FilesInterceptor } from '@nestjs/platform-express'
import currentUser from '@/common/decorators/currentUser.decorator'

@Controller('products')
@Role(UserRole.ADMIN, UserRole.SELLER)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('files'))
  async create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
    @currentUser('id') userId: string
  ) {
    return await this.productsService.create(createProductDto, files, userId)
  }

  @Get()
  async findAll() {
    return await this.productsService.findAll()
  }

  @Get(':id')
  async findOneById(@Param('id') id: string) {
    return await this.productsService.findOneById(id)
  }

  @Put(':id')
  async updateById(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return await this.productsService.updateById(id, updateProductDto)
  }

  @Delete(':id')
  async deleteById(@Param('id') id: string) {
    return await this.productsService.deleteById(id)
  }
}
