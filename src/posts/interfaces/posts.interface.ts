import { UsersSchema } from 'src/users/schema/users.schema';
import { PostModel, PostSchema } from '../schema/post.schema';
import { Document } from 'mongoose';

export interface IDPayload {
  readonly _id: string;
}

export interface FindAllPosts {
  readonly posts: Partial<PostSchema>[];
  readonly total: number;
}

export interface Post extends Document {
  readonly title: string;
  readonly body: string;
  readonly author: Partial<UsersSchema>;
  readonly timstamp: string;
}



