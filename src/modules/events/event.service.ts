import { StatusCodes } from 'http-status-codes';
import AppError from '../../app/error/AppError';
import { TEvents } from './event.interface';
import { eventModel } from './event.model';

const eventCreate = async (payload: TEvents) => {
  const event_data = payload;
  const result = await eventModel.create(event_data);
  if (!result) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Event falid');
  }
  return result;
};

const get_all_events = async () => {
  const result = await eventModel.find();
  return result;
};

const getEventById = async (_id: string) => {
  const result = await eventModel.findOne({ _id });
  return result;
};

const deleteEventById = async (_id: string) => {
  const result = await eventModel.deleteOne({ _id });
  return result;
};

const updateEventById = async (_id: string, payload: TEvents) => {
  const result = await eventModel.findOneAndUpdate({ _id }, payload, {
    new: true,
  });
  return result;
};

export const event_service = {
  eventCreate,
  get_all_events,
  getEventById,
  deleteEventById,
  updateEventById,
};
