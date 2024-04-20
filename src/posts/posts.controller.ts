import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { PostSchema } from 'src/posts/schema/post.schema';
import { UpdatePostDto } from './dto/update-post.dto';
import { IDPayload } from './interfaces/posts.interface';
import { PostsService } from './posts.service';
import { Query } from 'mongoose';
import { UsersSchema } from 'src/users/schema/users.schema';

@Controller('blog')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post('post')
  async create(data: Partial<PostSchema>): Promise<IDPayload> {
    return this.postsService.createPost(data);
  }

  @Get('posts')
  async getPosts() {
    return await this.postsService.getPosts();
  }

  @Get('post:/postID')
  async getPost(@Param('postID') postID) {
    const post = await this.postsService.getPost(postID);
    if (!post) throw new NotFoundException('Post does not exist!');
  }

  @Put('edit')
  async editPost(data: Partial<UsersSchema>, postID: IDPayload) {
    const editedPost = await this.postsService.editPost(postID, data);
    if (!editedPost) {
      throw new NotFoundException('Post does not exist!');
    }
    return editedPost;
  }

  @Delete('delete')
  async deletePost(postID: IDPayload) {
    const deletedPost = await this.postsService.deletePost(postID);
    if (!deletedPost) throw new NotFoundException('Post does not exist!');
    return deletedPost;
  }
}
