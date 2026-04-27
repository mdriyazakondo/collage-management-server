import { model, Schema } from 'mongoose';
import { TBlog } from './blog.interface';

const blogSchema = new Schema<TBlog>(
  {
    author: {
      type: Schema.Types.ObjectId, // Mongoose ID type
      ref: 'User', // Dhore niche apnar User model ache, na thakle eta change korte paren
      required: [true, 'Author is required'],
    },

    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    blog_type: {
      type: String,
      required: [true, 'Blog type is required'],
    },
    image: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true, // Er fole createdAt ar updatedAt automatically generate hobe
  },
);

export const BlogModel = model<TBlog>('Blog', blogSchema);
