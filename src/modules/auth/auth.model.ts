import { Schema, model } from 'mongoose';
import { TUser } from './auth.interface';

const userSchema = new Schema<TUser>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String },
    email: { type: String, required: true, unique: true },
    images: { type: String, required: true },
    studen_id: { type: String },
    password: { type: String, required: true },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
      required: true,
    },
    dateOfBirth: { type: String, required: true },
    contactNo: { type: String, required: true },
    emergencyContactNo: { type: String, required: true },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    department: { type: String, required: true },
    role: {
      type: String,
      enum: ['teacher', 'student', 'admin'],
      required: true,
    },
    designation: { type: String },
    academicYear: {
      type: String,
      enum: ['1st year', '2nd year', '3rd year', '4th year', 'masters'],
    },
  },
  {
    timestamps: true,
  },
);

export const UserModel = model<TUser>('User', userSchema);
