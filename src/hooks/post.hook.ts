import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  createPost,
  createSavedPost,
  deletePost,
  getAllGardeningPosts,
  getUserGardeningPost,
  getUserSavedPostCollection,
  updateLikeStatus,
  updatePost,
} from "../services/PostService";
import { followUser, unFollowUser } from "../services/AuthService";
import { getSingleGardeningPost } from "../services/CategoryService";
// import {getSingle}

export const useCreatePost = () => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["POST"],
    mutationFn: async (postData) => await createPost(postData),
    onSuccess: () => {
      toast.success("Post created successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
export const useDeletePost = () => {
  return useMutation<any, Error, any>({
    mutationKey: ["POST"],
    mutationFn: async (id: string) => await deletePost(id),
    onSuccess: () => {
      toast.success("Post deleted successfully");
    },
    onError: (error) => {
      // toast.error(error.message);
    },
  });
};

export const useCreateSavedPost = () => {
  return useMutation<any, Error, any>({
    mutationKey: ["SAVED_POST"],
    mutationFn: async (data: { user: string; post: string }) =>
      await createSavedPost(data),

    onError: (error) => {
      console.log(error);
    },
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
    mutationFn: async (data) => await updatePost(data),
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useUpdateLikeStatus = () => {
  return useMutation<any, Error, any>({
    mutationKey: ["POST"],
    mutationFn: async (data: Record<string, unknown>) =>
      await updateLikeStatus(data),
    onError: (error) => {
      console.log(error);
      // toast.error(error.message);
    },
  });
};

export const useGetAllPosts = () => {
  return useQuery({
    queryKey: ["POST"],
    queryFn: async () => await getAllGardeningPosts(),
  });
};

export const useGetSinglePost = (id: string) => {
  return useQuery({
    queryKey: ["POST"],
    queryFn: async () => await getSingleGardeningPost(id),
    enabled: !!id,
  });
};

export const useGetUserSavedPosts = (id: string) => {
  console.log("from hook", !!id);

  return useQuery({
    queryKey: ["SAVED_POST"],
    queryFn: async () => {
      console.log("from fn", id);

      return await getUserSavedPostCollection(id);
    },
    enabled: !!id,
  });
};

export const useGetUserPost = (id: string) => {
  console.log("from hook", id);

  return useQuery({
    queryKey: ["POST", id],
    queryFn: async () => await getUserGardeningPost(id),
    enabled: !!id,
  });
};
