import { env } from "@/env";
import { ServiceOptions, TutorFilterParams, TutorProfileDashboard } from "@/types";
import { cookies } from "next/headers";

const API_URL = env.API_URL;


export const tutorService = {
  getAllTutors: async (params: TutorFilterParams, options?: ServiceOptions) => {
    try {
      const url = new URL(`${API_URL}/api/tutors`);

      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            url.searchParams.append(key, value);
          }
        });
      }

      const config: RequestInit = {};

      if (options?.cache) {
        config.cache = options.cache;
      }

      if (options?.revalidate) {
        config.next = { revalidate: options.revalidate };
      }

      config.next = { ...config.next, tags: ["tutorsList"] };

      const res = await fetch(url.toString(), config);

      const data = await res.json();

      return { data, error: null };
    } catch (error: any) {
      return {
        data: null,
        error: { message: error?.message || "Something went wrong" },
      };
    }
  },
  getTutorById: async (tutorId: string) => {
    try {
      const res = await fetch(`${API_URL}/api/tutors/${tutorId}`);

      const data = await res.json();

      return { data, error: null };
    } catch (error: any) {
      return {
        data: null,
        error: { message: error?.message || "Something went wrong" },
      };
    }
  },
  updateTutorData: async function (
    updatedData: Partial<TutorProfileDashboard>,
    subjectIds: string[],
  ) {
    try {
      const cookieStore = await cookies();

      const tutorRes = await fetch(`${API_URL}/api/tutors/update`, {
        method: "PUT",
        headers: {
          Cookie: cookieStore.toString(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      const tutorData = await tutorRes.json();

      if (!tutorData.success) {
        return { data: tutorData, error: tutorData.message };
      }

      const subjectRes = await fetch(`${API_URL}/api/tutors/subjects`, {
        method: "PUT",
        headers: {
          Cookie: cookieStore.toString(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ subjectIds }),
      });

      const subjectData = await subjectRes.json();

      if (!subjectData.success) {
        return { data: subjectData, error: subjectData.message };
      }

      return { data: tutorData, error: null };
    } catch (error) {
      console.log(error);
      return { data: null, error: { message: "Something went wrong" } };
    }
  },
  getTutorOverview: async function () {
    try {

      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/api/tutors/overview`, {
        headers: {
          Cookie: cookieStore.toString(),
          "Content-Type": "application/json",
        }
      });

      const data = await res.json();

      if (!data.success) {
        return { data, error: data.message };
      }

      return { data, error: null };
    } catch (error) {
      console.log(error);
      return { data: null, error: { message: "Something went wrong" } };
    }
  },
  updateFeaturedTutor: async function (isFeatured: boolean, tutorId: string) {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/api/tutors/feature/${tutorId}`, {
        method: "PUT",
        headers: {
          Cookie: cookieStore.toString(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isFeatured }),
      });
      
     const data = await res.json();

      return { data, error: null };
    } catch (error) {
      console.log(error);
      return { data: null, error: { message: "Something went wrong" } };
    }
  }
};
