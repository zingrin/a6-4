import { User } from "./user.type";
import { Course } from "./course.type";

export interface InstituteProfile {
  id: string;
  userId: string;
  name: string;
  description?: string | null;
  logo?: string | null;
  createdAt: string;
  user: User;
}

export interface MentorProfile {
  id: string;
  userId: string;
  instituteId: string;
  bio?: string | null;
  specialization?: string | null;
  createdAt: string;
  user: {
      id: string;
      name: string;
      email: string;
      image: string | null;
  };
}

export interface InstituteOverview {
    stats: {
        totalCourses: number;
        totalMentors: number;
        totalEnrollments: number;
        totalRevenue: number;
    };
    enrollmentsByCourse: {
        name: string;
        enrollments: number;
        level: string;
    }[];
    coursesByLevel: {
        name: string;
        value: number;
    }[];
    coursesByStatus: {
        name: string;
        value: number;
    }[];
    enrollmentsTrend: {
        month: string;
        enrollments: number;
    }[];
    recentCourses: {
        id: string;
        title: string;
        level: string;
        price: number;
        isPublished: boolean;
        createdAt: string;
        category: { name: string } | null;
        _count: { enrollments: number };
    }[];
}
