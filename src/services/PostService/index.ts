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

export const deletePost = async (id: string): Promise<any> => {
  try {
    const { data } = await axiosInstance.delete(`/gardening-posts/${id}`);

    return data;
  } catch (error: any) {
    console.log(error.message);
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

export const getAllGardeningPosts = async (offset?: number, limit?: number) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/gardening-posts`,
      { cache: "no-store" }
    );
    const data = await res.json();
    // console.log({ data });

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getUserSavedPostCollection = async (id: string) => {
  try {
    const { data } = await axiosInstance.get(`/saved-post?user=${id}}`);

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getSingleGardeningPost = async (id: string) => {
  try {
    const { data } = await axiosInstance.get(`/gardening-posts/${id}`);
    console.log({ singlepost: data });
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
