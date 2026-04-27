import express from 'express';
import validateRequest from '../../app/middleware/validateRequest';
import { user_validation } from './auth.validation';
import { user_controller } from './auth.controller';
import { userController } from '../users/user.controller';

const authRouter = express.Router();

authRouter.post(
  '/sign_up',
  validateRequest(user_validation.create_user_validation),
  user_controller.user_register,
);
authRouter.post(
  '/sign_in',
  validateRequest(user_validation.loginValidationSchema),
  user_controller.user_login,
);

authRouter.post('/logout', user_controller.logout_user);
authRouter.get('/all_user', userController.getAllUser);
authRouter.get('/role_user', userController.teacherByRole);
authRouter.get('/:userId', userController.getUserById);
authRouter.put('/:userId', userController.updateUserBy);
authRouter.patch('/:userId', userController.roleUpdate);
authRouter.delete('/:userId', userController.userDelete);

export const authRouters = authRouter;
