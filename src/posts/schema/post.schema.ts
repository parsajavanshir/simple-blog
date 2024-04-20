import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';
import { UserModel } from 'src/users/interface/Messages';
import { usersDef } from 'src/users/schema/users.schema';

@Schema()
export class PostSchema {
  @Prop({
    ref: usersDef.name,
    type: MongooseSchema.Types.ObjectId,
    required: true
  })
  author: UserModel;

  @Prop({
    type: String,
    required: true
  })
  title: string;

  @Prop({
    type: String,
    required: true
  })
  body: string;

  @Prop({
    type: Date,
    default: Date.now,
  })
  timstamp: string;
}

export type PostModel = Model<Document & PostSchema>;
export const postDef: ModelDefinition = {
  name: 'posts',
  schema: SchemaFactory.createForClass(PostSchema),
};
