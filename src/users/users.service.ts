import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  EmailPayload,
  IDPayload,
  RegisterRequest,
  UsernamePayload
} from './interface/Messages';
import { UsersModel, UsersSchema, usersDef } from './schema/users.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(usersDef.name) private readonly userModel: UsersModel,
  ) {}

  async create(value: Partial<UsersSchema>): Promise<IDPayload> {
    const newUser = new this.userModel(value);
    const response = await newUser.save();
    return {
      _id: response._id.toString(),
    };
  }

  async findAll() {
    return await this.userModel.find({}, {}).exec();
  }
 
  async findByUsername(data: UsernamePayload) {
    const person = await this.userModel
      .findOne({
        username: data.username,
      })
      .exec();
    return person;
  }

  async findByEmail(data: EmailPayload) {
    const person = await this.userModel
      .findOne({
        email: data.email,
      })
      .exec();
    return person;
  }

  async update(data: Partial<UsersSchema> & IDPayload) {
    return await this.userModel
      .updateOne(
        { _id: data._id },
        {
          $set: data,
        },
      )
      .exec();
  }

  async remove(data: IDPayload) {
    return await this.userModel
      .deleteOne(
        { _id: data._id },
        {
          message: 'has been deleted!',
        },
      )
      .exec();
  }

  async register(data: RegisterRequest) {
    return 'this is a register logic';
  }
}
