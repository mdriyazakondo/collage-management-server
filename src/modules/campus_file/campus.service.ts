import { StatusCodes } from 'http-status-codes';
import AppError from '../../app/error/AppError';
import { TCampus, TGetCampusQuery } from './campus.interface';
import { CampusModel } from './campus.model';

const create_campus = async (payload: TCampus) => {
  const campus_data = await CampusModel.create(payload);
  if (!campus_data) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Campus falid');
  }
  return campus_data;
};

const get_all_campus = async (query: TGetCampusQuery) => {
  const { search, sort, page = '1', limit = '6' } = query;

  const filter: any = {};

  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
      { location: { $regex: search, $options: 'i' } },
    ];
  }

  let sortCondition: any = { createdAt: -1 };

  if (sort === 'date-asc') {
    sortCondition = { date: 1 };
  }

  if (sort === 'date-desc') {
    sortCondition = { date: -1 };
  }

  if (sort === 'title') {
    sortCondition = { title: 1 };
  }

  const skip = (Number(page) - 1) * Number(limit);

  const campus = await CampusModel.find(filter)
    .sort(sortCondition)
    .skip(skip)
    .limit(Number(limit));

  const total = await CampusModel.countDocuments(filter);

  return {
    meta: {
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / Number(limit)),
    },
    data: campus,
  };
};

const get_by_id_campus = async (id: string) => {
  const campus_data = await CampusModel.findById(id);
  if (!campus_data) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'campus data not found');
  }
  return campus_data;
};

const update_campus = async (id: string, payload: TCampus) => {
  const campus_data = await CampusModel.findByIdAndUpdate(id, payload, {
    new: true,
  });
  if (!campus_data) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Update campus data not found');
  }
  return campus_data;
};

const delete_campus = async (id: string) => {
  const campus_data = await CampusModel.findByIdAndDelete(id);
  if (!campus_data) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Campus Deleted falid');
  }
};

export const campusService = {
  create_campus,
  get_all_campus,
  get_by_id_campus,
  update_campus,
  delete_campus,
};
