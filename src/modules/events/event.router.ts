import express from 'express';
import { event_data } from './event.controller';

const event_router = express.Router();

event_router.post('/', event_data.event_create_data);
event_router.get('/', event_data.getAllEvnets);
event_router.get('/:eventId', event_data.getEventByIds);
event_router.put('/:eventId', event_data.updateEvent);
event_router.delete('/:eventId', event_data.deleteEventByid);


export default event_router;
