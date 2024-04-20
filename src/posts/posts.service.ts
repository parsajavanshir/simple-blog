import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePostDTO } from './dto/create-post.dto';
import { IDPayload, Post } from './interfaces/posts.interface';
import { PostModel, PostSchema, postDef } from './schema/post.schema';
import { UsersSchema } from 'src/users/schema/users.schema';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(postDef.name) private readonly postModel: PostModel,
  ) {}

  async createPost(data: Partial<PostSchema>): Promise<IDPayload> {
    const createdPost = await this.postModel.create(data);
    const response = await createdPost.save();
    return {
      _id: response._id.toString(),
    };
  }

  async getPosts(): Promise<Post[]> {
    const posts = await this.postModel.find({}, {}).exec();
    return posts;
  }

  async getPost(postID: IDPayload): Promise<Partial<Post>> {
    const post = await this.postModel.findById(postID).exec();
    return post;
  }

  async editPost(
    postID: IDPayload,
    data:Partial<UsersSchema>,
  ): Promise<Post> {
    const editedPost = await this.postModel.findByIdAndUpdate(
      postID,
      data,
      { new: true },
    );
    return editedPost;
  }

  async deletePost(postID: IDPayload): Promise<any> {
    const deletedPost = await this.postModel.findByIdAndDelete(postID);
    return deletedPost;
  }
}
