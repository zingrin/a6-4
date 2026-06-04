import { env } from "@/env";
import { Category, Subject } from "@/types";
import { cookies } from "next/headers";


const API_URL = env.API_URL;

export const categoryService = {
    getAllCategories : async () => {
        try {
    

            const res = await fetch(`${API_URL}/api/categories`, {
                cache : "no-store",
                next : {
                    tags : ["categoriesData"]
                }
            });
            const data = await res.json();

            return {data, error : null}

        } catch (error : any) {
            return {data : null, error : {message : error?.message || "Something went wrong"}}
        }
    },
    createCategory : async (categoryData : Partial<Category>) => {
        try {
          const cookieStore = await cookies();
    
          const res = await fetch(`${API_URL}/api/categories/create`, {
            method : "POST",
            headers: {
              Cookie: cookieStore.toString(),
              "Content-Type": "application/json",
            },
            body : JSON.stringify(categoryData)
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
    createSubject : async (subjectData : Partial<Subject>) => {
        try {
          const cookieStore = await cookies();
    
          const res = await fetch(`${API_URL}/api/categories/subject/create`, {
            method : "POST",
            headers: {
              Cookie: cookieStore.toString(),
              "Content-Type": "application/json",
            },
            body : JSON.stringify(subjectData)
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
    updateCategory : async (categoryData : Partial<Category>, categoryId : string) => {
        try {
          const cookieStore = await cookies();
    
          const res = await fetch(`${API_URL}/api/categories/update/${categoryId}`, {
            method : "PUT",
            headers: {
              Cookie: cookieStore.toString(),
              "Content-Type": "application/json",
            },
            body : JSON.stringify(categoryData)
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
    updateSubject : async (subjectData : Partial<Subject>, subjectId : string) => {
        try {
          const cookieStore = await cookies();
    
          const res = await fetch(`${API_URL}/api/categories/update/subject/${subjectId}`, {
            method : "PUT",
            headers: {
              Cookie: cookieStore.toString(),
              "Content-Type": "application/json",
            },
            body : JSON.stringify(subjectData)
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
    deleteCategory : async (categoryId : string) => {
        try {
          const cookieStore = await cookies();
    
          const res = await fetch(`${API_URL}/api/categories/delete/${categoryId}`, {
            method : "DELETE",
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
        } catch (error: any) {
          return {
            data: null,
            error: { message: error?.message || "Something went wrong" },
          };
        }
      },
    deleteSubject : async (categoryId : string) => {
        try {
          const cookieStore = await cookies();
    
          const res = await fetch(`${API_URL}/api/categories/delete/subject/${categoryId}`, {
            method : "DELETE",
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
        } catch (error: any) {
          return {
            data: null,
            error: { message: error?.message || "Something went wrong" },
          };
        }
      },
};