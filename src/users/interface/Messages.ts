import { UsersSchema } from '../schema/users.schema';

export interface FindAllResponse {
  data: Partial<UsersSchema>[];
}

export interface EmailPayload {
  email: string;
}

export interface UsernamePayload {
  username: string;
}

export interface IDPayload {
  _id: string;
}

export interface DeleteResponse {
  status: number;
}

export interface UpdateResponse {
  status: number;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  password: string;
  email: string;
}

export type UserModel = UsersSchema & { _id: string };
