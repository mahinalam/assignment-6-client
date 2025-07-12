"use server";

import axiosInstance from "@/src/lib/AxiosInstance";

// follow user
export const followUser = async (
  userInfo: Record<string, unknown>
): Promise<any> => {
  try {
    const { data } = await axiosInstance.post("/follow/follow-user", userInfo);

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// unfollow user
export const unFollowUser = async (
  userInfo: Record<string, unknown>
): Promise<any> => {
  try {
    const { data } = await axiosInstance.post(
      "/follow/unfollow-user",
      userInfo
    );

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// get followers
export const getFollowers = async () => {
  try {
    const { data } = await axiosInstance.get(`/follow/follow-user`);

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

// get following users
export const getFollowingUsers = async () => {
  try {
    const { data } = await axiosInstance.get(`/follow/following-user`);

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
