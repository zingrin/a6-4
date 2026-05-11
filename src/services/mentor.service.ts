import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

export const mentorService = {
  getAssignedCourses: async function (params: any) {
    try {
      const cookieStore = await cookies();
      const url = new URL(`${API_URL}/api/courses/assigned`);
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
    } catch (error) {
      console.log(error);
      return { data: null, error: { message: "Something went wrong" } };
    }
  },

  getCourseRoster: async function (courseId: string, params: any) {
    try {
      const cookieStore = await cookies();
      const url = new URL(`${API_URL}/api/courses/roster/${courseId}`);
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
    } catch (error) {
      console.log(error);
      return { data: null, error: { message: "Something went wrong" } };
    }
  },

  getOverview: async function () {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/api/mentors/overview`, {
        headers: {
          Cookie: cookieStore.toString(),
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      return { data, error: null };
    } catch (error) {
      console.log(error);
      return { data: null, error: { message: "Something went wrong" } };
    }
  },

  listAssignedCourses: async function (params: any) {
    try {
      const cookieStore = await cookies();
      const url = new URL(`${API_URL}/api/mentors/courses`);
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
    } catch (error) {
      console.log(error);
      return { data: null, error: { message: "Something went wrong" } };
    }
  },

  getStudents: async function (params: any) {
    try {
      const cookieStore = await cookies();
      const url = new URL(`${API_URL}/api/mentors/students`);
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
    } catch (error) {
      console.log(error);
      return { data: null, error: { message: "Something went wrong" } };
    }
  },

  getMyProfile: async function () {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/api/mentors/profile`, {
        headers: { Cookie: cookieStore.toString() },
      });
      const data = await res.json();
      return { data, error: null };
    } catch (error) {
      console.log(error);
      return { data: null, error: { message: "Something went wrong" } };
    }
  },

  updateProfile: async function (payload: any) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/api/mentors/update`, {
        method: "PUT",
        headers: {
          Cookie: cookieStore.toString(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      return { data, error: null };
    } catch (error) {
      console.log(error);
      return { data: null, error: { message: "Something went wrong" } };
    }
  },
};
