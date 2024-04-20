import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';

@Schema()
export class UsersSchema {
  @Prop({
    type: String,
    unique: true,
  })
  username: string;

  @Prop({
    type: String,
  })
  password: string;

  @Prop({
    type: String,
  })
  email: string;
}


export type UsersModel = Model<Document & UsersSchema>;
export const usersDef: ModelDefinition = {
  name: 'users',
  schema: SchemaFactory.createForClass(UsersSchema),
};
