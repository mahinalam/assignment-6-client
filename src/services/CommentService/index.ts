"use server";

import axiosInstance from "@/src/lib/AxiosInstance";

export const createComment = async (
  commentInfo: Record<string, unknown>
): Promise<any> => {
  try {
    const { data } = await axiosInstance.post("/comments", commentInfo);

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getAllComments = async (params?: {
  post?: string;
  user?: string;
}) => {
  try {
    // Construct query string if params are provided
    const queryString = new URLSearchParams(params).toString();
    const url = queryString ? `/comments?${queryString}` : "/comments";

    // Make the request with the constructed URL
    const { data } = await axiosInstance.get(url);
    return data;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

export const getUserSpecificComments = async (id: string) => {
  try {
    const { data } = await axiosInstance.get(`/gardening-posts/${id}`);

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

// export const getUserGardeningPost = async (id: string) => {
//   try {
//     const { data } = await axiosInstance.get(
//       `/gardening-posts/get-user-posts/${id}`
//     );

//     return data;
//   } catch (error: any) {
//     throw new Error(error);
//   }
// };

// // update post
// export const updatePost = async (
//   updatedPostdata: Record<string, unknown>
// ): Promise<any> => {
//   try {
//     const { data } = await axiosInstance.put(
//       `/gardening-posts/${updatedPostdata.postId}`,
//       updatedPostdata.data
//     );

//     return data;
//   } catch (error: any) {
//     console.log(error.message);
//     throw new Error(error.message);
//   }
// };
