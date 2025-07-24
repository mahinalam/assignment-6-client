'use server';

import axiosInstance from '@/src/lib/AxiosInstance';

// follow user
export const followUser = async (
  userInfo: Record<string, unknown>
): Promise<any> => {
  try {
    const { data } = await axiosInstance.post('/follow/follow-user', userInfo);

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
      '/follow/unfollow-user',
      userInfo
    );
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// remove follower
export const removeFollower = async (
  userInfo: Record<string, unknown>
): Promise<any> => {
  try {
    const { data } = await axiosInstance.post(
      '/follow/remove-follower',
      userInfo
    );

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// get followers
export const getFollowersAndFollwingUser = async (userId: string) => {
  try {
    const { data } = await axiosInstance.get(`/follow/followers/${userId}`);
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
