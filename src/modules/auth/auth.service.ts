import { StatusCodes } from 'http-status-codes';
import AppError from '../../app/error/AppError';
import { TUser } from './auth.interface';
import { UserModel } from './auth.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../../app/utils/config';

const create_user = async (payload: TUser) => {
  const is_exist = await UserModel.findOne({ eamil: payload.email });
  if (is_exist) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      'This user is already exist. PLease Login',
    );
  }

  const hashed_password = await bcrypt.hash(payload.password as string, 12);
  const user_data = {
    ...payload,
    password: hashed_password,
  };

  const result = await UserModel.create(user_data);
  if (!result) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to create User.');
  }

  return result;
};

const user_login = async (payload: { email: string; password: string }) => {
  const { email, password } = payload;

  const user = await UserModel.findOne({ email }).select('+password');

  if (!user) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      'User not found. Please register first',
    );
  }

  const is_password_match = await bcrypt.compare(
    password,
    user.password as string,
  );

  if (!is_password_match) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'Invalid email or password');
  }

  const jwtPayload = {
    email: user?.email,
    role: user?.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.JWT_ACCESS_SECRET as string, {
    expiresIn: '10m',
  });

  const refreshToken = jwt.sign(
    jwtPayload,
    config.JWT_REFRESH_SECRET as string,
    {
      expiresIn: '30d',
    },
  );

  const { password: _, ...user_without_password } = user.toObject();

  return { accessToken, refreshToken, user_without_password };
};

const logoutUser = async () => {
  return null;
};

export const user_service = {
  create_user,
  user_login,
  logoutUser,
};
