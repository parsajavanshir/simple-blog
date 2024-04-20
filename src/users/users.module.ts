import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { usersDef} from './schema/users.schema'

@Module({
  imports: [MongooseModule.forFeature([usersDef])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
