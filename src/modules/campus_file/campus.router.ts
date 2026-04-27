import express from 'express';
import { campusController } from './campus.controller';

const campusRouter = express.Router();

campusRouter.get('/', campusController.create_campus_data);
campusRouter.get('/', campusController.campusById);
campusRouter.post('/', campusController.updateCamps);
campusRouter.put('/', campusController.deleteCampus);
export default campusRouter;
