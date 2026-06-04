import { Category, Subject, UserRoles, UserStatus } from "."

export interface User {
  id: string
  name: string
  email: string
  emailVerified?: boolean
  image?: string | null
  phone?: string | null
  createdAt?: Date | string
  updatedAt?: Date | string
  role: UserRoles
  status?: UserStatus
  tutor?: TutorProfile
}

export interface UserProfileFormProps {
    name: string;
    email: string;
    image: string;
    phone: string;
    role: string;
    status: string;
}


export interface ServiceOptions {
  cache?: RequestCache;
  revalidate?: number;
}

export interface ListUserPaginationProps {
    limit?: number;
    page?: number;
    total?: number;
    totalPages?: number;
    role?: string;
}


export interface TutorFilterParams {
  search?: string | null;
  hourlyRate?: number | null;
  categoryId?: string | null;
  isFeatured?: boolean | null;
  avgRating?: number | null;
  totalReviews?: number | null;
  subjectId?: string | null;
  page?: string;
  limit?: string;
  sortBy?: string;
}



export interface Availability {
  id: string;
  tutorId: string;
  day: "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY";
  startTime: string;
  endTime: string;
  status: "AVAILABLE" | "BOOKED";
}

export interface TutorProfile {
  id: string;
  userId: string;
  bio: string | null;
  hourlyRate: number;
  categoryId: string | null;
  isFeatured: boolean;
  avgRating: string;
  totalReviews: number;
  createdAt: string;
  user : User;
  availability : Availability[];
  category ?: Category;
  subjects ?: TutorSubject[];
  relatedTutors ?: TutorProfile[];
  _count: {
    reviews: number;
  };
}

export interface TutorSubject {
  subjectId : string;
  tutorId : string;
  subject : Subject;
}

export interface TutorProfileDashboard {
  id: string;
  userId: string;
  bio: string | null;
  hourlyRate: number;
  categoryId: string | null;
  isFeatured: boolean;
  avgRating: string;
  totalReviews: number;
  createdAt: string;
  category ?: Category;
  subjects : TutorSubject[];
}