import { Schema, model } from 'mongoose';
import { TCampus } from './campus.interface';

const campusSchema = new Schema<TCampus>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },

    photos: {
      type: [String],
      required: [true, 'At least one photo is required'],
    },

    videos: {
      type: [String],
      default: [],
    },

    date: {
      type: String,
      required: [true, 'Photo date is required'],
      trim: true,
    },

    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

export const CampusModel = model<TCampus>('Campus', campusSchema);
