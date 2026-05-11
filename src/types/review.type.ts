import { TutorProfile, User } from "./user.type";

export interface FullReview {
  id: string;
  bookingId: string;
  createdAt: string;
  rating: string;
  review: string;
  studentId: string;
  tutorId: string;
  student: User;
  tutor: TutorProfile;
};

export interface Review {
  id: string;
  tutorId: string;
  reviewerId: string;
  rating: number;
  review: string;
  createdAt: string;
}


export interface LeaveReviewPayload {
  bookingId : string; 
  rating : string;
  review : string;
}