import { z } from 'zod';

const create_user_validation = z.object({
  body: z.object({
    firstName: z.string().min(1, 'First Name is required'),
    lastName: z.string().optional(),
    email: z.string().email(),
    images: z.string(),
    password: z.string().min(8, 'Password min 8 character'),
    gender: z.enum(['male', 'female', 'other']),
    dateOfBirth: z.string(),
    contactNo: z.string(),
    emergencyContactNo: z.string(),
    bloodGroup: z
      .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
      .optional(),
    presentAddress: z.string(),
    permanentAddress: z.string(),
    department: z.string(),
    role: z.enum(['teacher', 'student', 'admin']),
    designation: z.string().optional(),
    academicYear: z
      .enum(['1st year', '2nd year', '3rd year', '4th year', 'masters'])
      .optional(),
  }),
});

const loginValidationSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: 'please valid  email ',
    }),
    password: z.string({ required_error: 'Password is required' }),
  }),
});

export const user_validation = {
  create_user_validation,
  loginValidationSchema,
};
