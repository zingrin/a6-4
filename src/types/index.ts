

export type * from "./routes.type"
export type * from "./user.type"
export * from "./availability.type"
export * from "./booking.type"
export * from "./tutor.type"
export * from "./review.type"
export * from "./course.type"
export * from "./institute.type"


export interface Mentor {
  id: string;
  user: {
      name: string;
      image: string | null;
  };
}


export interface Subject {
  id: string;
  name: string;
  categoryId: string;
  createdAt: string; 
}

export interface Category {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  subjects: Subject[];
}

export enum UserRoles {
  ADMIN = "ADMIN",
  STUDENT = "STUDENT",
  TUTOR = "TUTOR",
  INSTITUTE = "INSTITUTE",
  MENTOR = "MENTOR",
  MODERATOR = "MODERATOR"
}

export enum UserStatus {
    ACTIVE = "ACTIVE",
    BANNED = "BANNED"
}


export interface TutorOverviewData {
  profile: {
    bio: string | null;
    hourlyRate: number | null;
    avgRating: number; // Decimal e.g. 4.5
    totalReviews: number;
    isFeatured: boolean;
    category: { id: string; name: string } | null;
    subjects: { id: string; name: string }[];
  };
  stats: {
    totalBookings: number;
    completedBookings: number;
    cancelledBookings: number;
    upcomingCount: number;
    totalEarnings: number;
  };
  upcomingBookings: {
    id: string;
    price: number;
    status: string;
    createdAt: string;
    completedAt: string | null;
    student: { id: string; name: string; image: string | null };
    availability: { day: string; startTime: string; endTime: string } | null;
  }[];
  recentReviews: {
    id: string;
    rating: number;
    review: string;
    createdAt: string;
    student: { id: string; name: string; image: string | null };
  }[];
  availability: {
    total: number;
    activeSlots: number;
    slots: {
      id: string;
      day: string;
      startTime: string;
      endTime: string;
      status: string;
    }[];
  };
}

