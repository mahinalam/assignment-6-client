"use server";

import axiosInstance from "@/src/lib/AxiosInstance";

export const getAllCategories = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/category`, {
      cache: "no-store",
    });

    const data = res.json();

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
export const getSingleGardeningPost = async (id: string) => {
  try {
    const { data } = await axiosInstance.get(`/gardening-posts/${id}`);

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
