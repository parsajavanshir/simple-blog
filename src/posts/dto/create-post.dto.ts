import { PostSchema } from "../schema/post.schema";

export class CreatePostDTO {
    readonly title: string;
    readonly body: string;
    readonly author: string;
    readonly timstamp: Partial<PostSchema>
}
