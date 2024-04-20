import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import {
  DeleteResponse,
  EmailPayload,
  IDPayload,
  UpdateResponse,
  UsernamePayload,
} from './interface/Messages';
import { UserModel } from 'src/users/interface/Messages';
import { UsersSchema } from './schema/users.schema';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create')
  async create(value: Partial<UsersSchema>): Promise<IDPayload> {
    return this.usersService.create(value);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('email')
  async findByEmail(data: EmailPayload): Promise<UserModel> {
    const user = await this.usersService.findByEmail(data);
    return user.toObject();
  }

  @Get('username')
  async findOneByUsername(data: UsernamePayload): Promise<Partial<UserModel>> {
    const user = await this.usersService.findByUsername(data);
    return user.toObject();
  }

  @Patch(':id')
  async update(
    data: Partial<UsersSchema> & IDPayload,
  ): Promise<UpdateResponse> {
    const response = await this.usersService.update(data);
    return {
      status: response.matchedCount > 0 ? 1 : 0,
    };
  }

  @Delete(':id')
  async remove(data: IDPayload): Promise<DeleteResponse> {
    const response = await this.usersService.remove(data);
    return {
      status: response.deletedCount > 0 ? 1 : 0,
    };
  }
}
