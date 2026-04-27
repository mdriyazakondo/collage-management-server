import catchAsync from '../../app/utils/catchAsync';
import sendRespone from '../../app/utils/sendResponse';
import { campusService } from './campus.service';
import httpStatus from 'http-status';

const create_campus_data = catchAsync(async (req, res) => {
  const campusData = await campusService.create_campus(req.body);
  sendRespone(res, {
    success: true,
    message: 'Campuss Created Succesfully',
    data: campusData,
    statusCode: httpStatus.OK,
  });
});

const campusAllData = catchAsync(async (req, res) => {
  const campusData = await campusService.get_all_campus();
  sendRespone(res, {
    success: true,
    message: 'Campuss fatched Succesfully',
    data: campusData,
    statusCode: httpStatus.OK,
  });
});

const campusById = catchAsync(async (req, res) => {
  const { campusId } = req.params;
  const campus_data = await campusService.get_by_id_campus(campusId);
  sendRespone(res, {
    success: true,
    message: 'Campuss fatched Succesfully',
    data: campus_data,
    statusCode: httpStatus.OK,
  });
});

const updateCamps = catchAsync(async (req, res) => {
  const { campusId } = req.params;
  const campus_data = await campusService.get_by_id_campus(campusId);
  sendRespone(res, {
    success: true,
    message: 'Campuss fatched Succesfully',
    data: campus_data,
    statusCode: httpStatus.OK,
  });
});

const deleteCampus = catchAsync(async (req, res) => {
  const { campusId } = req.params;
  const campus_data = await campusService.delete_campus(campusId);
  sendRespone(res, {
    success: true,
    message: 'Campus deleted Succesfully',
    data: campus_data,
    statusCode: httpStatus.OK,
  });
});

export const campusController = {
  create_campus_data,
  campusAllData,
  campusById,
  updateCamps,
  deleteCampus,
};
