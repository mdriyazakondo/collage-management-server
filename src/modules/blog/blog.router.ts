import express from 'express';
import { blogController } from './blog.controller';

const blogRouter = express.Router();

blogRouter.post('/', blogController.create_blog);
blogRouter.get('/', blogController.getAllBlog);
blogRouter.get('/:blogId', blogController.getBlogById);
blogRouter.put('/:blogId', blogController.updateBlog);
blogRouter.delete('/:blogId', blogController.delteBlog);

export default blogRouter;
