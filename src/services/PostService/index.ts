"use server";

import axiosInstance from "@/src/lib/AxiosInstance";
import axios from "axios";

export const createPost = async (formData: FormData): Promise<any> => {
  try {
    const { data } = await axiosInstance.post("/gardening-posts", formData, {
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

// delete post
export const deletePost = async (id: string): Promise<any> => {
  try {
    const { data } = await axiosInstance.delete(`/gardening-posts/${id}`);

    return data;
  } catch (error: any) {
    console.log(error.message);
    throw new Error(error.message);
  }
};

// delete saved post
export const deleteSavedPost = async (id: string): Promise<any> => {
  try {
    const { data } = await axiosInstance.delete(`/wishlist/${id}`);

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const createSavedPost = async (savedPostData: {
  user: string;
  post: string;
}): Promise<any> => {
  try {
    const { data } = await axiosInstance.post("/saved-post", savedPostData);

    return data;
  } catch (error: any) {
    console.log(error.message);
    throw new Error(error.message);
  }
};

// all posts
export const getAllGardeningPosts = async (offset?: number, limit?: number) => {
  try {
    const { data } = await axiosInstance.get(`/gardening-posts`);
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

// single post
export const getSingleGardeningPost = async (id: string) => {
  console.log("params id", id);
  try {
    const { data } = await axiosInstance.get(`/gardening-posts/${id}`);
    console.log("data", data);
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getUserSavedPostCollection = async (id: string) => {
  console.log("from hook", id);
  try {
    const { data } = await axiosInstance.get(`/wishlist?user=${id}`);

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getUserGardeningPost = async (id: string) => {
  try {
    const { data } = await axiosInstance.get(`/gardening-posts?user=${id}`);

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

// update post
export const updatePost = async (
  updatedPostdata: Record<string, unknown>
): Promise<any> => {
  try {
    const { data } = await axiosInstance.put(
      `/gardening-posts/`,
      updatedPostdata
    );

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const updateLikeStatus = async (
  likeStatusData: Record<string, unknown>
): Promise<any> => {
  console.log("likeStatusData", likeStatusData);
  try {
    const { data } = await axiosInstance.patch(
      `/gardening-posts`,
      likeStatusData
    );

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
// create share
export const createShare = async (
  payload: Record<string, unknown>
): Promise<any> => {
  try {
    console.log("payload from server", payload);
    const { data } = await axiosInstance.post(`/share`, payload);

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
