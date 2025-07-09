import { useMutation, useQuery } from "@tanstack/react-query";

import { createPost } from "../services/PostService";
import { IBlog } from "../types";
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getSingleBlog,
  getUserBlogs,
  updateBlog,
} from "../services/BlogService";

export const useCreateBlog = () => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["BLOG"],
    mutationFn: async (blogData) => await createBlog(blogData),
  });
};
export const useDeleteBlog = () => {
  return useMutation<any, Error, any>({
    mutationKey: ["BLOG"],
    mutationFn: async (id: string) => await deleteBlog(id),
  });
};

export const useUpdateBlog = () => {
  return useMutation<any, Error, any>({
    mutationKey: ["BLOG"],
    mutationFn: async (data: Partial<IBlog>) => await updateBlog(data),
  });
};

export const useGetUserBlogs = () => {
  return useQuery({
    queryKey: ["BLOG"],
    queryFn: async () => await getUserBlogs(),
  });
};

export const useGetAllBlogs = () => {
  return useQuery({
    queryKey: ["BLOG"],
    queryFn: async () => await getAllBlogs(),
  });
};

export const useGetSingleBlog = (blogId: string) => {
  return useQuery({
    queryKey: ["BLOG"],
    queryFn: async () => await getSingleBlog(blogId),
  });
};
