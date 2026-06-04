import { env } from "@/env";
import { ServiceOptions } from "@/types";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

export const courseService = {
  getPublicCourses: async (params: any, options?: ServiceOptions) => {
    try {
      const url = new URL(`${API_URL}/api/courses`);
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            url.searchParams.append(key, value as string);
          }
        });
      }

      const config: RequestInit = {};
      if (options?.cache) config.cache = options.cache;
      if (options?.revalidate) config.next = { revalidate: options.revalidate };
      config.next = { ...config.next, tags: ["coursesList"] };

      const res = await fetch(url.toString(), config);
      const data = await res.json();
      return { data, error: null };
    } catch (error: any) {
      return { data: null, error: { message: error?.message || "Something went wrong" } };
    }
  },

  getCourseDetails: async (courseId: string) => {
    try {
      const res = await fetch(`${API_URL}/api/courses/${courseId}`);
      const data = await res.json();
      return { data, error: null };
    } catch (error: any) {
      return { data: null, error: { message: error?.message || "Something went wrong" } };
    }
  },

  createCourse: async (courseData: FormData) => {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/api/courses/create`, {
        method: "POST",
        headers: {
          // Do NOT set Content-Type — let the browser/Node set the multipart boundary automatically
          Cookie: cookieStore.toString(),
        },
        body: courseData,
      });
      const data = await res.json();
      return { data, error: null };
    } catch (error: any) {
      return { data: null, error: { message: error?.message || "Something went wrong" } };
    }
  },

  getInstituteCourses: async (params: any) => {
    try {
      const cookieStore = await cookies();
      const url = new URL(`${API_URL}/api/courses/institute/list`);
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            url.searchParams.append(key, value as string);
          }
        });
      }

      const res = await fetch(url.toString(), {
        headers: { Cookie: cookieStore.toString() },
      });
      const data = await res.json();
      return { data, error: null };
    } catch (error: any) {
      return { data: null, error: { message: error?.message || "Something went wrong" } };
    }
  },

  updateCourse: async (courseId: string, courseData: FormData) => {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/api/courses/update/${courseId}`, {
        method: "PUT",
        headers: {
          // Do NOT set Content-Type — let the browser/Node set the multipart boundary automatically
          Cookie: cookieStore.toString(),
        },
        body: courseData,
      });
      const data = await res.json();
      return { data, error: null };
    } catch (error: any) {
      return { data: null, error: { message: error?.message || "Something went wrong" } };
    }
  },

  deleteCourse: async (courseId: string) => {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/api/courses/delete/${courseId}`, {
        method: "DELETE",
        headers: {
          Cookie: cookieStore.toString(),
        },
      });
      const data = await res.json();
      return { data, error: null };
    } catch (error: any) {
      return { data: null, error: { message: error?.message || "Something went wrong" } };
    }
  },

  getEnrolledCourses: async (params?: any) => {
    try {
      const cookieStore = await cookies();
      const url = new URL(`${API_URL}/api/courses/enrolled/list`);
      
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            url.searchParams.append(key, value as string);
          }
        });
      }

      const res = await fetch(url.toString(), {
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });

      const data = await res.json();
      return { data, error: null };
    } catch (error: any) {
      return { data: null, error: { message: error?.message || "Something went wrong" } };
    }
  },
};
