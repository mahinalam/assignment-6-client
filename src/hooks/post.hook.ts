import {
  useMutation,
  useQueries,
  useQuery,
  UseQueryOptions,
} from '@tanstack/react-query';

import {
  createPost,
  createSavedPost,
  createShare,
  deletePost,
  deleteSavedPost,
  getAllGardeningPosts,
  getAllSharePosts,
  getSingleGardeningPost,
  getTopGardeners,
  getUserSavedPostCollection,
  updateLikeStatus,
  updatePost,
} from '../services/PostService';
import { IPost, IUser } from '../types';

export const useCreatePost = () => {
  return useMutation<any, Error, FormData>({
    mutationKey: ['POST'],
    mutationFn: async (postData) => await createPost(postData),
  });
};
export const useDeletePost = () => {
  return useMutation<any, Error, any>({
    mutationKey: ['POST'],
    mutationFn: async (id: string) => await deletePost(id),
  });
};

export const useCreateSavedPost = (userId: string) => {
  return useMutation<any, Error, any>({
    mutationKey: ['WISHLIST', userId],
    mutationFn: async (data: { post: string }) => await createSavedPost(data),
  });
};

// delete saved post
export const useDeleteSavedPost = () => {
  return useMutation<any, Error, any>({
    mutationKey: ['WISHLIST'],
    mutationFn: async (id: string) => await deleteSavedPost(id),
  });
};

export const useUpdatePost = () => {
  return useMutation<any, Error, any>({
    mutationKey: ['POST'],
    mutationFn: async (data: Partial<IPost>) => await updatePost(data),
  });
};

// share post
export const useCreateSharePost = () => {
  return useMutation<any, Error, any>({
    mutationKey: ['POST'],
    mutationFn: async (data: Partial<IPost>) => await createShare(data),
  });
};

export const useUpdateLikeStatus = () => {
  return useMutation<any, Error, any>({
    mutationKey: ['POST'],
    mutationFn: async (data: Record<string, unknown>) =>
      await updateLikeStatus(data),
  });
};

export const useGetAllPosts = (params: { [key: string]: any }) => {
  const cleanedParams = Object.fromEntries(
    Object.entries(params).filter(([_, value]) => value)
  );

  return useQuery({
    queryKey: ['POST', cleanedParams],
    queryFn: () => getAllGardeningPosts(cleanedParams),
    refetchOnWindowFocus: false,
  });
};
export const useGetSinglePost = (postId: string) => {
  return useQuery({
    queryKey: ['POST', postId],
    queryFn: () => getSingleGardeningPost(postId),
  });
};

export const useGetUserSavedPosts = (params: { [key: string]: any }) => {
  const cleanedParams = Object.fromEntries(
    Object.entries(params).filter(([_, value]) => value)
  );
  return useQuery({
    queryKey: ['WISHLIST', params?.user, cleanedParams],
    queryFn: async () => {
      return await getUserSavedPostCollection(cleanedParams);
    },
    refetchOnWindowFocus: false,
  });
};
// get all share posts
export const useGetAllSharePosts = () => {
  return useQuery({
    queryKey: ['SHARE_POST'],
    queryFn: async () => {
      return await getAllSharePosts();
    },
  });
};

export const useGetTopGardeners = () => {
  return useQuery({
    queryKey: ['POST', 'USER'],
    queryFn: async () => {
      return await getTopGardeners();
    },
  });
};
