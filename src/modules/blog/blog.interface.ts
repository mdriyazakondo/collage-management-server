import { ObjectId } from 'mongoose';

export interface TBlog {
  author?: ObjectId;
  title: string;
  description: string;
  blog_type: string;
  image?: string[];
}

export type TGetBlogsQuery = {
  search?: string;
  blog_type?: string;
  sort?: string;
  page?: string;
  limit?: string;
};
