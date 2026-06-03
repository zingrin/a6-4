import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

export const instituteService = {
  getOverview: async function () {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/api/institutes/overview`, {
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

  listMentors: async function (params: any) {
    try {
      const cookieStore = await cookies();
      const url = new URL(`${API_URL}/api/institutes/mentors`);
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

  inviteMentor: async function (email: string, name: string) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/api/institutes/mentors/invite`, {
        method: "POST",
        headers: {
          Cookie: cookieStore.toString(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, name }),
      });
      const data = await res.json();
      return { data, error: null };
    } catch (error) {
      console.log(error);
      return { data: null, error: { message: "Something went wrong" } };
    }
  },

  listStudents: async function (params: any) {
    try {
      const cookieStore = await cookies();
      const url = new URL(`${API_URL}/api/institutes/students`);
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

  listReviews: async function (params: any) {
    try {
      const cookieStore = await cookies();
      const url = new URL(`${API_URL}/api/institutes/reviews`);
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

  listPayments: async function (params: any) {
    try {
      const cookieStore = await cookies();
      const url = new URL(`${API_URL}/api/institutes/payments`);
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

  updateInstituteProfile: async function (formData: FormData) {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/api/institutes/update`, {
        method: "PUT",
        headers: {
          Cookie: cookieStore.toString(),
        },
        body: formData,
      });
      const data = await res.json();

      return { data, error: null };
    } catch (error) {
      console.log(error);
      return { data: null, error: { message: "Something went wrong" } };
    }
  },
};
