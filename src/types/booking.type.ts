import { Subject } from ".";
import { Availability, TutorProfile, TutorProfileDashboard, User } from "./user.type";

export interface Booking {
  availabilityId: string | null;
  completedAt: string | null;
  createdAt: string;
  id: string;
  price: number;
  status: BookingStatus
  student: User;
  availability : Availability;
  studentId: string;
  tutorId: string;
  tutor ?: TutorProfile
};

export interface AdminBooking {
  availabilityId: string | null;
  completedAt: string | null;
  createdAt: string;
  id: string;
  price: number;
  status: BookingStatus
  student: User;
  availability : Availability;
  studentId: string;
  tutorId: string;
  tutor ?: TutorProfile
};


export interface BookingDetail {
  id: string;
  studentId: string;
  tutorId: string;
  availabilityId: string | null;
  subjectId: string | null;
  status: string;
  price: number;
  createdAt: string;
  completedAt: string | null;
  student : User,
  tutor : TutorProfile,
  availability : Availability | null,
  review : {
    id: string;
    bookingId: string;
    studentId: string;
    tutorId: string;
    rating: string;
    review: string;
    createdAt: string;
  } | null;
  subject ?: Subject
}

export enum BookingStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED"
}

export interface CreateBookingPayload {
  tutorId : string; 
  availabilityId : string;
  subjectId : string;
}