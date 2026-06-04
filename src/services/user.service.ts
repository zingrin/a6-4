export const dynamic = "force-dynamic";

import { env } from "@/env";
import {
  ListUserPaginationProps,
  ServiceOptions,
  User,
  UserStatus,
} from "@/types";
import { cookies } from "next/headers";

const AUTH_URL = env.AUTH_URL;
const API_URL = env.API_URL;

export const userService = {
  getSession: async function () {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${AUTH_URL}/get-session`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store"
      });

      const session = await res.json();

      if (session === null) {
        return { data: null, error: { message: "Session in missing" } };
      }

      return { data: session, error: null };
    } catch (error) {
      console.log(error);
      return { data: null, error: { message: "Something went wrong" } };
    }
  },
  getProfile: async function () {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/api/user/me`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });
      const data = await res.json();

      return { data, error: null };
    } catch (error) {
      console.log(error);
      return { data: null, error: { message: "Something went wrong" } };
    }
  },
  updateProfile: async function (updatedData: FormData) {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/api/user/update`, {
        method: "PUT",
        headers: {
          Cookie: cookieStore.toString(),
        },
        body: updatedData,
      });
      const data = await res.json();

      return { data, error: null };
    } catch (error) {
      console.log(error);
      return { data: null, error: { message: "Something went wrong" } };
    }
  },
  getStudentStats: async function () {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/api/user/student/stats`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });
      const data = await res.json();

      return { data, error: null };
    } catch (error) {
      console.log(error);
      return { data: null, error: { message: "Something went wrong" } };
    }
  },
  listUsers: async (
    params: ListUserPaginationProps,
    options?: ServiceOptions,
  ) => {
    try {
      const url = new URL(`${API_URL}/api/user/list`);

      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            url.searchParams.append(key, value);
          }
        });
      }

      const cookieStore = await cookies();

      const config: RequestInit = {
        headers: {
          Cookie: cookieStore.toString(),
        },
      };

      if (options?.cache) {
        config.cache = options.cache;
      }

      if (options?.revalidate) {
        config.next = { revalidate: options.revalidate };
      }

      config.next = { ...config.next, tags: ["usersList"] };

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
  updateUserStatus: async function (status: UserStatus, userId: string) {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/api/user/ban/${userId}`, {
        method: "PUT",
        headers: {
          Cookie: cookieStore.toString(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();

      return { data, error: null };
    } catch (error) {
      console.log(error);
      return { data: null, error: { message: "Something went wrong" } };
    }
  },

  getAdminAnalytics: async function () {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/api/user/admin/analytics`, {
        headers: {
          Cookie: cookieStore.toString(),
          "Content-Type": "application/json",
        }
      });
      const data = await res.json();

      return { data, error: null };
    } catch (error) {
      console.log(error);
      return { data: null, error: { message: "Something went wrong" } };
    }
  },
  
  inviteModerator: async function (email: string, name: string) {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/api/user/moderator/invite`, {
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
};
