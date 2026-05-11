import { env } from "@/env";
import { LeaveReviewPayload } from "@/types";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

export const reviewService = {
  getAllReviews : async () => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/api/reviews`, {
        method : "GET",
        headers: {
          Cookie: cookieStore.toString(),
        },
      });

      const data = await res.json();

      if (!data.success) {
        return { data, error: data.message };
      }

      return { data, error: null };
    } catch (error: any) {
      return {
        data: null,
        error: { message: error?.message || "Something went wrong" },
      };
    }
  },
  createReview : async (reviewData : LeaveReviewPayload) => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/api/reviews/create`, {
        method : "POST",
        headers: {
          Cookie: cookieStore.toString(),
          "Content-Type": "application/json",
        },
        body : JSON.stringify(reviewData)
      });

      const data = await res.json();

      if (!data.success) {
        return { data, error: data.message };
      }

      return { data, error: null };
    } catch (error: any) {
      return {
        data: null,
        error: { message: error?.message || "Something went wrong" },
      };
    }
  },
};
