import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/createUser.dto'
import { UpdateUserDto } from './dto/updateUser.dto'
// import { EventEmitter2 } from '@nestjs/event-emitter'

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    // private eventEmitter: EventEmitter2
  ) {}

  @Post('/sign-up')
  async create(@Body() createUserDto: CreateUserDto) {
    // const res = this.eventEmitter.emit('user.verify-email', {
    //   name: 'Auction System',
    //   email: createUserDto.email,
    //   otp: '1234'
    // })

    return this.usersService.create(createUserDto)
  }

  @Get()
  async findAll() {
    return await this.usersService.findAll()
  }

  @Get(':id')
  async findOneById(@Param('id') id: string) {
    return await this.usersService.findOneById(id)
  }

  @Put(':id')
  async updateById(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.updateById(id, updateUserDto)
  }

  @Delete(':id')
  async deleteById(@Param('id') id: string) {
    return await this.usersService.deleteById(id)
  }
}
