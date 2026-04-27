import { ObjectId } from 'mongoose';

export interface TBlog {
  author: ObjectId;
  title: string;
  description: string;
  blog_type: string;
  image?: string[];
}
