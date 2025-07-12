import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  createPost,
  createSavedPost,
  createShare,
  deletePost,
  deleteSavedPost,
  getAllGardeningPosts,
  getSingleGardeningPost,
  getUserGardeningPost,
  getUserSavedPostCollection,
  updateLikeStatus,
  updatePost,
} from "../services/PostService";
import { followUser, unFollowUser } from "../services/AuthService";
import { IPost } from "../types";
// import {getSingle}

export const useCreatePost = () => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["POST"],
    mutationFn: async (postData) => await createPost(postData),
  });
};
export const useDeletePost = () => {
  return useMutation<any, Error, any>({
    mutationKey: ["POST"],
    mutationFn: async (id: string) => await deletePost(id),
  });
};

export const useCreateSavedPost = () => {
  return useMutation<any, Error, any>({
    mutationKey: ["WISHLIST"],
    mutationFn: async (data: { user: string; post: string }) =>
      await createSavedPost(data),

    onError: (error) => {
      console.log(error);
    },
  });
};

// delete saved post
export const useDeleteSavedPost = () => {
  return useMutation<any, Error, any>({
    mutationKey: ["WISHLIST"],
    mutationFn: async (id: string) => await deleteSavedPost(id),
  });
};

export const useFollowUser = () => {
  return useMutation<any, Error, any>({
    mutationKey: ["USER"],
    mutationFn: async (userIds) => await followUser(userIds),
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

// unfollow user
export const useUnFollowUser = () => {
  return useMutation<any, Error, any>({
    mutationKey: ["USER"],
    mutationFn: async (userIds) => await unFollowUser(userIds),
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useUpdatePost = () => {
  return useMutation<any, Error, any>({
    mutationKey: ["POST"],
    mutationFn: async (data: Partial<IPost>) => await updatePost(data),
  });
};

// share post
export const useCreateSharePost = () => {
  return useMutation<any, Error, any>({
    mutationKey: ["POST"],
    mutationFn: async (data: Partial<IPost>) => await createShare(data),
  });
};

export const useUpdateLikeStatus = () => {
  return useMutation<any, Error, any>({
    mutationKey: ["POST"],
    mutationFn: async (data: Record<string, unknown>) =>
      await updateLikeStatus(data),
    onError: (error) => {
      // toast.error(error.message);
    },
  });
};

export const useGetAllPosts = (offset?: number, limit?: number) => {
  return useQuery({
    queryKey: ["POST"],
    queryFn: async () => await getAllGardeningPosts(offset, limit),
    // enabled: Number(offset) > 10,
  });
};

export const useGetSinglePost = (id: string) => {
  return useQuery({
    queryKey: ["POST", id],
    queryFn: async () => await getSingleGardeningPost(id),
    enabled: !!id,
  });
};

export const useGetUserSavedPosts = (userId: string) => {
  return useQuery({
    queryKey: ["WISHLIST", userId],
    queryFn: async () => {
      return await getUserSavedPostCollection(userId);
    },
    enabled: !!userId,
  });
};

export const useGetUserPost = (id: string) => {
  return useQuery({
    queryKey: ["POST"],
    queryFn: async () => await getUserGardeningPost(id),
    enabled: !!id,
  });
};
