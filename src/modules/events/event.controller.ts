import { Request, Response } from 'express';
import catchAsync from '../../app/utils/catchAsync';
import { event_service } from './event.service';
import sendRespone from '../../app/utils/sendResponse';
import httpStatus from 'http-status';

const event_create_data = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const create_event = await event_service.eventCreate(data);
  sendRespone(res, {
    success: true,
    message: 'User Created Succesfully',
    statusCode: 201,
    data: create_event,
  });
});

const getAllEvnets = catchAsync(async (req: Request, res: Response) => {
  const result = await event_service.get_all_events(req.query);
  sendRespone(res, {
    success: true,
    message: 'All Recipes fatched successfully',
    data: result.data,
    statusCode: httpStatus.OK,
  });
});

const getEventByIds = catchAsync(async (req: Request, res: Response) => {
  const { eventId } = req.params;
  const result = await event_service.getEventById(eventId);

  if (!result)
    return sendRespone(res, {
      success: false,
      message: 'Event not found in database',
      data: result,
      statusCode: httpStatus.NOT_FOUND,
    });
  sendRespone(res, {
    success: true,
    message: 'Event fetched successfully',
    data: result,
    statusCode: httpStatus.OK,
  });
});

const deleteEventByid = catchAsync(async (req: Request, res: Response) => {
  const { eventId } = req.params;
  const result = await event_service.deleteEventById(eventId);

  if (!result)
    return sendRespone(res, {
      success: false,
      message: 'Event not found in database',
      data: result,
      statusCode: httpStatus.NOT_FOUND,
    });
  sendRespone(res, {
    success: true,
    message: 'Event Updated successfully',
    data: result,
    statusCode: httpStatus.OK,
  });
});

const updateEvent = catchAsync(async (req: Request, res: Response) => {
  const { eventId } = req.params;
  const updatedEvents = req.body;
  const result = await event_service.updateEventById(eventId, updatedEvents);

  sendRespone(res, {
    success: true,
    message: 'Recipe Updated successfully',
    data: result,
    statusCode: httpStatus.OK,
  });
});

export const event_data = {
  event_create_data,
  getAllEvnets,
  getEventByIds,
  deleteEventByid,
  updateEvent,
};
