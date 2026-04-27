import QueryBuilder from '../../app/bluider/queryBuilder';
import { TUser } from '../auth/auth.interface';
import { UserModel } from '../auth/auth.model';

const get_users = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(UserModel, query)
    .search(['title', 'description'])
    .filter()
    .sort()
    .paginate()
    .fields()
    .populate({
      path: 'Course',
    })
    .populate([
      {
        path: 'ModuleDetails',
      },
    ]);

  const result = await courseQuery.exec();
  return result;
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
