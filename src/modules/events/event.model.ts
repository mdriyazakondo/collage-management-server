import { model, Schema } from 'mongoose';
import { TEvents } from './event.interface';

const event_shcema = new Schema<TEvents>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  eventType: { type: String, required: true },
  location: { type: String, required: true },
  image: { type: String },
  status: {
    type: String,
    required: true,
    enum: ['upcoming', 'ongoing', 'completed', 'cancelled'],
  },
  startTime: { type: String, required: true },
  endTime: { type: String },
  organizer: { type: String, required: true },
  date: { type: String, required: true },
});

export const eventModel = model<TEvents>('Events', event_shcema);
