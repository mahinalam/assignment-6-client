'use server';

import axiosInstance from '@/src/lib/AxiosInstance';

export const createPost = async (formData: FormData): Promise<any> => {
  try {
    const { data } = await axiosInstance.post('/gardening-posts', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// delete post
export const deletePost = async (id: string): Promise<any> => {
  try {
    const { data } = await axiosInstance.delete(`/gardening-posts/${id}`);

    return data;
  } catch (error: any) {
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
  post: string;
}): Promise<any> => {
  try {
    const { data } = await axiosInstance.post('/wishlist', savedPostData);

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// services/blog.service.ts
export const getAllGardeningPosts = async (params?: { [key: string]: any }) => {
  const queryString = new URLSearchParams(params).toString();
  const url = `/gardening-posts${queryString ? `?${queryString}` : ''}`;

  try {
    const { data } = await axiosInstance.get(url);
    return data;
  } catch (error: any) {
    throw new Error(error.message || 'Failed to fetch posts');
  }
};

// single post
export const getSingleGardeningPost = async (id: string) => {
  try {
    const { data } = await axiosInstance.get(`/gardening-posts/${id}`);
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getUserSavedPostCollection = async (params?: {
  [key: string]: any;
}) => {
  const searchParams = new URLSearchParams(params).toString();
  try {
    const { data } = await axiosInstance.get(`/wishlist?${searchParams}`);

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
      '/gardening-posts/',
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
  try {
    const { data } = await axiosInstance.patch(
      '/gardening-posts',
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
    const { data } = await axiosInstance.post('/share', payload);

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// get share posts
export const getAllSharePosts = async () => {
  try {
    const { data } = await axiosInstance.get('/share');
    return data;
  } catch (error: any) {
    throw new Error(error.message || 'Failed to fetch share posts');
  }
};

export const getTopGardeners = async () => {
  try {
    const { data } = await axiosInstance.get('/gardening-posts/top-gardeners');

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
