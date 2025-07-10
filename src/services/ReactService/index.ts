"use server";

import axiosInstance from "@/src/lib/AxiosInstance";

export const createReact = async (payload: {
  post: string;
  type: string;
}): Promise<any> => {
  try {
    const { data } = await axiosInstance.post("/react", payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("paload from service", payload);
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getPostReacts = async (postId: string) => {
  try {
    const { data } = await axiosInstance.get(`/react/${postId}`);

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
