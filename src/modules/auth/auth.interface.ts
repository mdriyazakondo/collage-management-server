export type TUser = {
  firstName: string;
  lastName?: string;
  email: string;
  studen_id?: string;
  images: string;
  password: string;
  gender: 'male' | 'female' | 'other';
  dateOfBirth: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  department: string;
  role: 'teacher' | 'student' | 'admin';
  designation?: string;
  academicYear?: '1st year' | '2nd year' | '3rd year' | '4th year' | 'masters';
};
