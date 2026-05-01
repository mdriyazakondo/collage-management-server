import { TBlog, TGetBlogsQuery } from './blog.interface';
import { BlogModel } from './blog.model';

const blog_create = async (payload: TBlog) => {
  const result = await BlogModel.create(payload);
  return result;
};

const get_all_blog = async (query: TGetBlogsQuery) => {
  const { search, blog_type, sort, page = '1', limit = '6' } = query;

  const filter: any = {};

  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
    ];
  }

  if (blog_type) {
    filter.blog_type = blog_type;
  }

  let sortCondition: any = { createdAt: -1 };

  if (sort === 'title') {
    sortCondition = { title: 1 };
  }

  const skip = (Number(page) - 1) * Number(limit);

  const blogs = await BlogModel.find(filter)
    .sort(sortCondition)
    .skip(skip)
    .limit(Number(limit));

  const total = await BlogModel.countDocuments(filter);

  return {
    meta: {
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / Number(limit)),
    },
    data: blogs,
  };
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
