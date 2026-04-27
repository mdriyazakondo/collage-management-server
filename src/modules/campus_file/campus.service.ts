import { StatusCodes } from 'http-status-codes';
import AppError from '../../app/error/AppError';
import { TCampus } from './campus.interface';
import { CampusModel } from './campus.model';

const create_campus = async (payload: TCampus) => {
  const campus_data = await CampusModel.create(payload);
  if (!campus_data) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Campus falid');
  }
  return campus_data;
};

const get_all_campus = async () => {
  const campus_data = await CampusModel.find();
  if (!campus_data) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      'Campus Data is database not found',
    );
  }
  return campus_data;
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
