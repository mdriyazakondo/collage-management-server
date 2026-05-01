import catchAsync from '../../app/utils/catchAsync';
import sendRespone from '../../app/utils/sendResponse';
import { blogService } from './blog.service';
import httpStatus from 'http-status';

const create_blog = catchAsync(async (req, res) => {
  const result = await blogService.blog_create(req.body);
  sendRespone(res, {
    success: true,
    message: 'Blog is created successfully',
    data: result,
    statusCode: httpStatus.OK,
  });
});

const getAllBlog = catchAsync(async (req, res) => {
  const result = await blogService.get_all_blog(req.query);

  sendRespone(res, {
    success: true,
    message: 'All blog fetched successfully',
    data: result,
    statusCode: httpStatus.OK,
  });
});

const getBlogById = catchAsync(async (req, res) => {
  const { blogId } = req.params;
  const result = await blogService.get_blog_by_id(blogId);
  if (!result) {
    return sendRespone(res, {
      success: false,
      message: 'Blog not found in database',
      data: result,
      statusCode: httpStatus.NOT_FOUND,
    });
  }
  sendRespone(res, {
    success: true,
    message: 'Blog fetched successfully',
    data: result,
    statusCode: httpStatus.OK,
  });
});

const delteBlog = catchAsync(async (req, res) => {
  const { blogId } = req.params;
  const result = await blogService.delete_by_id(blogId);
  if (!result) {
    return sendRespone(res, {
      success: false,
      message: 'Blog not found in database',
      data: result,
      statusCode: httpStatus.NOT_FOUND,
    });
  }
  sendRespone(res, {
    success: true,
    message: 'Blog deleted successfully',
    data: result,
    statusCode: httpStatus.OK,
  });
});

const updateBlog = catchAsync(async (req, res) => {
  const { blogId } = req.params;
  const updateBlogData = req.body;
  const result = await blogService.update_blog_by_id(blogId, updateBlogData);
  if (!result) {
    return sendRespone(res, {
      success: false,
      message: 'Blog not found in database',
      data: result,
      statusCode: httpStatus.NOT_FOUND,
    });
  }
  sendRespone(res, {
    success: true,
    message: 'Blog updated successfully',
    data: result,
    statusCode: httpStatus.OK,
  });
});

export const blogController = {
  create_blog,
  getAllBlog,
  getBlogById,
  delteBlog,
  updateBlog,
};
