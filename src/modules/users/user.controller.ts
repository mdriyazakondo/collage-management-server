import catchAsync from '../../app/utils/catchAsync';
import sendRespone from '../../app/utils/sendResponse';
import { userSErvice } from './user.service';
import httpStatus from 'http-status';

const getAllUser = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await userSErvice.get_users(query);
  sendRespone(res, {
    success: true,
    message: 'Users get success',
    statusCode: httpStatus.OK,
    data: result,
  });
});

const teacherByRole = catchAsync(async (req, res) => {
  const { role } = req.query;

  const result = await userSErvice.teacherService(role as string);

  sendRespone(res, {
    success: true,
    message: 'Users fetched by role successfully',
    statusCode: httpStatus.OK,
    data: result,
  });
});

const getUserById = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const result = await userSErvice.userById(userId);
  sendRespone(res, {
    success: true,
    message: 'Single user successfully fetched',
    statusCode: httpStatus.OK,
    data: result,
  });
});

const updateUserBy = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const user = await userSErvice.userProfileUpdate(userId, req.body);
  sendRespone(res, {
    success: true,
    message: 'User profile update successfully',
    statusCode: httpStatus.OK,
    data: user,
  });
});

const roleUpdate = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const role = req.body;
  const userData = await userSErvice.roleUpdate(userId, role);
  sendRespone(res, {
    success: true,
    message: 'User role updated successfully',
    statusCode: httpStatus.OK,
    data: userData,
  });
});

const userDelete = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const userData = await userSErvice.userDelete(userId);
  sendRespone(res, {
    success: true,
    message: 'User data deleted successfully',
    statusCode: httpStatus.OK,
    data: userData,
  });
});

export const userController = {
  getAllUser,
  getUserById,
  updateUserBy,
  userDelete,
  roleUpdate,
  teacherByRole,
};
