import { Request, Response } from 'express';
import catchAsync from '../../app/utils/catchAsync';
import { user_service } from './auth.service';
import sendRespone from '../../app/utils/sendResponse';
import config from '../../app/utils/config';

const user_register = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const create_user = await user_service.create_user(data);
  sendRespone(res, {
    success: true,
    message: 'User Created Succesfully',
    statusCode: 201,
    data: create_user,
  });
});

const user_login = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const login_user = await user_service.user_login(data);
  const { refreshToken, accessToken } = login_user;
  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'none',
  });

  sendRespone(res, {
    success: true,
    message: 'User Created Succesfully',
    statusCode: 201,
    data: { login_user, accessToken },
  });
});

const logout_user = catchAsync(async (req: Request, res: Response) => {
  res.clearCookie('refreshToken', {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'none',
  });

  sendRespone(res, {
    success: true,
    message: 'User logged out successfully',
    statusCode: 200,
    data: {},
  });
});

export const user_controller = {
  user_register,
  user_login,
  logout_user,
};
