import { Router } from 'express';
import { recipeRoutes } from '../../modules/recipe/recipe.route';
import { authRouters } from '../../modules/auth/auth.router';
import event_router from '../../modules/events/event.router';
import blogRouter from '../../modules/blog/blog.router';
import campusRouter from '../../modules/campus_file/campus.router';

const router = Router();
const moduleRoutes = [
  {
    path: '/recipe',
    route: recipeRoutes,
  },
  {
    path: '/user',
    route: authRouters,
  },
  {
    path: '/events',
    route: event_router,
  },
  {
    path: '/blog',
    route: blogRouter,
  },
  {
    path: '/campus',
    route: campusRouter,
  },
];
moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
