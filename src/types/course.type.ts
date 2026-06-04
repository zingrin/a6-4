import { User } from "./user.type";
import { Category } from "./index";

export interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  thumbnailUrl?: string | null;
  level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  duration?: string | null;
  categoryId?: string | null;
  instituteId: string;
  mentorIds?: string[] | null;
  isPublished?: boolean;
  status?: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  createdAt: string;
  updatedAt: string;
  mentors?: {
    id: string;
    user: {
        name: string;
        image: string | null;
    };
    expertise?: string | null;
  }[];
  category?: Category | null;
  institute?: {
    id?: string;
    name: string;
    logoUrl?: string | null;
    description?: string | null;
  };
  _count?: {
    enrollments: number;
  };
  relatedCourses?: Course[];
}

export interface Enrollment {
  id: string;
  studentId: string;
  courseId: string;
  enrolledAt: string;
  course: Course;
  student: User;
}
