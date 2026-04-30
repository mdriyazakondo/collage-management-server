import { number } from 'zod';
import { TUser } from '../auth/auth.interface';
import { UserModel } from '../auth/auth.model';
import { TGetUsersQuery } from './user.interface';

const get_users = async (query: TGetUsersQuery) => {
  const search = query.search;
  const role = query.role;
  const isActive = query.isActive;
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;

  const skip = (page - 1) * limit;

  const pipeline: any[] = [];

  const matchStage: any = {};

  if (search) {
    matchStage.$or = [
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
      { phone: { $regex: search, $options: 'i' } },
    ];
  }

  if (role) {
    matchStage.role = role;
  }

  if (isActive !== undefined) {
    matchStage.isActive = isActive;
  }

  if (Object.keys(matchStage).length > 0) {
    pipeline.push({ $match: matchStage });
  }

  pipeline.push({ $sort: { createdAt: -1 } });

  pipeline.push({
    $facet: {
      data: [{ $skip: skip }, { $limit: limit }],
      totalData: [{ $count: 'total' }],
    },
  });

  const result = await UserModel.aggregate(pipeline);

  const data = result[0]?.data || [];
  return data;
};

const teacherService = async (role: string) => {
  const result = await UserModel.find({ role: role });
  return result;
};

const userById = async (id: string) => {
  const result = await UserModel.findById(id);
  return result;
};

const roleUpdate = async (id: string, payload: { role: string }) => {
  const result = await UserModel.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const userProfileUpdate = async (id: string, payload: TUser) => {
  const result = await UserModel.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

const userDelete = async (id: string) => {
  const result = await UserModel.findByIdAndDelete(id);
  return result;
};

export const userSErvice = {
  get_users,
  userById,
  userProfileUpdate,
  userDelete,
  roleUpdate,
  teacherService,
};
