import { TBlog } from './blog.interface';
import { BlogModel } from './blog.model';

const blog_create = async (payload: TBlog) => {
  const result = await BlogModel.create(payload);
  return result;
};

const get_all_blog = async () => {
  const result = await BlogModel.find();
  return result;
};

const get_blog_by_id = async (_id: string) => {
  const result = await BlogModel.findById(_id);
  return result;
};

const delete_by_id = async (id: string) => {
  const result = await BlogModel.findByIdAndDelete(id);
  return result;
};

const update_blog_by_id = async (id: string, payload: TBlog) => {
  const result = await BlogModel.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

export const blogService = {
  blog_create,
  get_all_blog,
  get_blog_by_id,
  delete_by_id,
  update_blog_by_id,
};
