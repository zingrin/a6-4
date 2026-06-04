
import { Category } from ".";
import { Review } from "./review.type";
import { Availability, TutorSubject, User } from "./user.type";


export interface TutorForModal {
  id: string;
  userId: string;
  user: User;
  categoryId: string;
  category: Category;
  bio: string;
  hourlyRate: number;
  avgRating: string;
  totalReviews: number;
  isFeatured: boolean;
  subjects: TutorSubject[];
  availability: Availability[];
  reviews: Review[];
  createdAt: string;
}