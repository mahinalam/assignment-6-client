"use server";

import axiosInstance from "@/src/lib/AxiosInstance";

export const createBlog = async (formData: FormData): Promise<any> => {
  try {
    const { data } = await axiosInstance.post("/blogs", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return data;
  } catch (error: any) {
    console.log(error.message);
    throw new Error(error.message);
  }
};

export const deleteBlog = async (id: string): Promise<any> => {
  try {
    const { data } = await axiosInstance.delete(`/blogs/${id}`);
    return data;
  } catch (error: any) {
    console.log(error.message);
    throw new Error(error.message);
  }
};

export const getAllBlogs = async (offset?: number, limit?: number) => {
  try {
    const { data } = await axiosInstance(`/blogs`);

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getSingleBlog = async (blogId: string) => {
  try {
    const { data } = await axiosInstance(`/blogs/${blogId}`);

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getUserBlogs = async () => {
  try {
    const { data } = await axiosInstance.get(`/blogs/user-blogs`);

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

// update post
export const updateBlog = async (
  updatedPostdata: Record<string, unknown>
): Promise<any> => {
  try {
    const { data } = await axiosInstance.put(`/blogs`, updatedPostdata);

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
