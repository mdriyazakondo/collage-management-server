import { StatusCodes } from 'http-status-codes';
import AppError from '../../app/error/AppError';
import { TEvents, TGetEventsQuery } from './event.interface';
import { eventModel } from './event.model';

const eventCreate = async (payload: TEvents) => {
  const event_data = payload;
  const result = await eventModel.create(event_data);
  if (!result) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Event falid');
  }
  return result;
};

export const get_all_events = async (query: TGetEventsQuery) => {
  const { search, status, sort, page = '1', limit = '6' } = query;

  const filter: any = {};

  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
      { location: { $regex: search, $options: 'i' } },
    ];
  }

  // 🏷️ Status filter
  if (status) {
    filter.status = status;
  }

  // 🔃 Sort
  let sortCondition: any = { createdAt: -1 }; // default latest

  if (sort === 'date-asc') {
    sortCondition = { date: 1 };
  }

  if (sort === 'date-desc') {
    sortCondition = { date: -1 };
  }

  if (sort === 'title') {
    sortCondition = { title: 1 };
  }

  // 📄 Pagination
  const skip = (Number(page) - 1) * Number(limit);

  const events = await eventModel
    .find(filter)
    .sort(sortCondition)
    .skip(skip)
    .limit(Number(limit));

  const total = await eventModel.countDocuments(filter);

  return {
    meta: {
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / Number(limit)),
    },
    data: events,
  };
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
